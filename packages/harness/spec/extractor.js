#!/usr/bin/env node
/**
 * spec/extractor.js — Parses Automotive-SPICE-PAM-v40.md + ASPICE
 * Guideline_20240312.md and emits canonical JSON files under spec/canonical/:
 *
 *   spec/canonical/processes/<ID>.json   one per PAM process
 *   spec/canonical/processAttributes.json  PA 1.1 .. PA 3.2 + GPs
 *   spec/canonical/workProducts.json       WP catalog (00-xx..19-xx)
 *   spec/canonical/guidelineRules.json     per-process references into Guideline
 *
 * The PAM has a very regular structure but contains PDF extraction noise
 * (page watermarks, vertical-text inversions, duplicated markdown tables).
 * We parse the narrative stream (not the markdown tables) because the
 * narrative appears before the tables and carries the authoritative text.
 *
 * Usage:  node spec/extractor.js
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PAM_PATH = resolve(ROOT, "Automotive-SPICE-PAM-v40.md");
const GUIDELINE_PATH = resolve(ROOT, "ASPICE Guideline_20240312.md");
const SEED_PATH = resolve(__dirname, "processGraph.seed.json");
const OUT_DIR = resolve(__dirname, "canonical");
const PROCESSES_DIR = resolve(OUT_DIR, "processes");

const PROCESS_PREFIXES = ["ACQ", "SPL", "SYS", "SWE", "MLE", "VAL", "HWE", "SUP", "MAN", "PIM", "REU"];
const PROCESS_ID_RE = new RegExp(`(?:${PROCESS_PREFIXES.join("|")})\\.\\d+`);

const NOISE_LINE_RE =
  /^(?:© VDA Quality Management Center\b.*|PPUUBBLLIICC\s*|<!-- Page \d+ -->|---)\s*$/;

// ---------------------------------------------------------------------------
// PAM chapter 4 — per-process descriptions
// ---------------------------------------------------------------------------

function extractProcesses(pam) {
  const lines = pam.split(/\r?\n/);
  const sectionHeadRe = new RegExp(
    `^\\d+\\.\\d+\\.\\d+\\.\\s+(${PROCESS_ID_RE.source})\\s+(.+)$`
  );

  // TOC entries use dot-leader + page number ("... NN") — exclude them.
  const isTocHeading = (line) => /\.{5,}\s*\d+\s*$/.test(line);

  /** sections: [{procId, name, pamSection, startLine, endLine}] */
  const sections = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(sectionHeadRe);
    if (!m) continue;
    if (isTocHeading(lines[i])) continue;
    const pamSection = (lines[i].match(/^(\d+\.\d+\.\d+)/) || [])[1];
    sections.push({
      procId: m[1],
      name: m[2].trim(),
      pamSection,
      startLine: i,
      endLine: lines.length,
    });
    if (sections.length > 1) sections[sections.length - 2].endLine = i;
  }

  // Stop at start of chapter 5 (capability dimension). The TOC also has a line
  // matching this pattern but trails with a page number — skip those.
  const chapter5 = lines.findIndex(
    (l) => /^5\.\s+Process capability levels/.test(l) && !isTocHeading(l)
  );
  if (chapter5 > 0 && sections.length) {
    for (const s of sections) if (s.endLine > chapter5) s.endLine = chapter5;
  }

  const results = [];
  for (const s of sections) {
    const body = lines.slice(s.startLine, s.endLine).join("\n");
    const proc = parseProcessBody(s, body);
    if (proc) results.push(proc);
  }

  // Deduplicate — the same process can appear multiple times if the TOC
  // heading pattern accidentally matches. Keep the one with richest body.
  const byId = new Map();
  for (const p of results) {
    const existing = byId.get(p.id);
    if (!existing || scoreRichness(p) > scoreRichness(existing)) byId.set(p.id, p);
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

function scoreRichness(p) {
  return (
    (p.purpose ? 1 : 0) * 2 +
    p.outcomes.length +
    p.basePractices.length * 3 +
    p.outputWorkProducts.length * 2
  );
}

function parseProcessBody(section, body) {
  // Drop PDF-extraction noise AND markdown-table rows (which duplicate the
  // narrative verbatim and would otherwise produce phantom BPs/outcomes/WPs).
  const clean = body
    .split("\n")
    .filter((l) => !NOISE_LINE_RE.test(l))
    .filter((l) => !/^\s*\|/.test(l))
    .join("\n");

  const purpose = take(clean, /Process purpose\s*\n/, /\n\s*Process outcomes\s*\n/);
  const outcomesBlock =
    take(clean, /Process outcomes\s*\n/, /\n\s*Base Practices\s*\n/) || "";
  const bpsBlock =
    take(clean, /Base Practices\s*\n/, /\n\s*Output (?:Information Items?|Work Products?)\s*\n/) ||
    take(clean, /Base Practices\s*\n/, /\n\s*\d+\.\d+\.\d+\./) ||
    "";
  const wpsBlock =
    take(clean, /Output (?:Information Items?|Work Products?)\s*\n/, /\n\s*(?:Base Practices|\d+\.\d+\.\d+\.)/) ||
    take(clean, /Output (?:Information Items?|Work Products?)\s*\n/, /\n{3,}/) ||
    "";

  const outcomes = parseOutcomes(outcomesBlock);
  const basePractices = parseBPs(bpsBlock, section.procId);
  const outputWorkProducts = parseOutputWps(wpsBlock);

  // Detect the traceability BP (almost always called out explicitly)
  const traceBPs = basePractices
    .filter((bp) => /traceab|consistency/i.test(bp.title + " " + bp.description))
    .map((bp) => bp.id);

  return {
    id: section.procId,
    name: section.name,
    category: section.procId.split(".")[0],
    pamSection: section.pamSection,
    purpose: cleanParagraph(purpose),
    outcomes,
    basePractices,
    outputWorkProducts,
    inputWorkProducts: [],
    traceBPs,
  };
}

function parseOutcomes(block) {
  if (!block) return [];
  const seen = new Set();
  const out = [];
  const re = /^\s*(\d+)\)\s+([^\n]+(?:\n(?!\s*\d+\))[^\n]+)*)/gm;
  for (const m of block.matchAll(re)) {
    const id = Number(m[1]);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ id, text: cleanParagraph(m[2]) });
  }
  return out;
}

function parseBPs(block, procId) {
  if (!block) return [];
  const results = [];
  const escapedProc = procId.replace(/\./g, "\\.");
  const anchorRe = new RegExp(`^${escapedProc}\\.BP\\d+:`, "gm");
  const anchors = [];
  for (const m of block.matchAll(anchorRe)) anchors.push({ start: m.index, label: m[0] });
  anchors.push({ start: block.length, label: null });

  for (let i = 0; i < anchors.length - 1; i++) {
    const chunk = block.slice(anchors[i].start, anchors[i + 1].start).trim();
    const head = chunk.match(new RegExp(`^${escapedProc}\\.(BP\\d+):\\s*([^\\n]+)`));
    if (!head) continue;
    const id = head[1];
    const firstLine = head[2].trim();
    const rest = chunk.slice(head[0].length).trim();
    const titleMatch = firstLine.match(/^([^.]+)\.\s*(.*)$/);
    const title = titleMatch ? titleMatch[1].trim() : firstLine;
    const tail = titleMatch ? (titleMatch[2] + " " + rest).trim() : rest;
    const description = stripNotes(tail);
    results.push({
      id,
      title,
      description,
      pamCitation: `PAM §${procId} ${id}`,
    });
  }
  return results;
}

function stripNotes(text) {
  return text
    .split(/\n/)
    .filter((l) => !/^Note\s+\d+:/.test(l.trim()))
    .join("\n")
    .trim()
    .replace(/\s+/g, " ");
}

function parseOutputWps(block) {
  if (!block) return [];
  const wps = new Map();
  const wpRe = /^(\d{2}-\d{2})\s+([A-Za-z][^\n|]*?)(?:\s+[X\s]+)?\s*$/gm;
  for (const m of block.matchAll(wpRe)) {
    const id = m[1];
    const name = m[2].trim();
    if (name.length < 2 || name.length > 80) continue;
    if (!wps.has(id)) wps.set(id, { id, name });
  }
  return [...wps.values()];
}

function take(text, startRe, endRe) {
  const s = text.match(startRe);
  if (!s) return "";
  const rest = text.slice(s.index + s[0].length);
  const e = rest.match(endRe);
  return e ? rest.slice(0, e.index) : rest;
}

function cleanParagraph(s) {
  return (s || "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// PAM chapter 5 — Process Attributes & Generic Practices
// ---------------------------------------------------------------------------

function extractProcessAttributes(pam) {
  const lines = pam.split(/\r?\n/);
  const paHeadRe = /^(\d+)\.\d+\.\d+\.\s+(PA \d\.\d)\s+(.+)$/;
  const locations = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(paHeadRe);
    if (m) locations.push({ paId: m[2], name: m[3].trim(), startLine: i, endLine: lines.length });
    if (locations.length > 1) locations[locations.length - 2].endLine = i;
  }
  // Bound to chapter 6 (if any) — else end of file
  const chapter6 = lines.findIndex((l) => /^6\.\s+/.test(l));
  if (chapter6 > 0) for (const loc of locations) if (loc.endLine > chapter6) loc.endLine = chapter6;

  const out = {};
  for (const loc of locations) {
    const [, levelStr] = loc.paId.match(/PA (\d)\./) || [];
    const level = Number(levelStr);
    if (level > 3) continue; // only PA 1.1 ~ 3.2 needed per user scope
    const body = lines
      .slice(loc.startLine, loc.endLine)
      .filter((l) => !NOISE_LINE_RE.test(l))
      .filter((l) => !/^\s*\|/.test(l))
      .join("\n");
    const scope = cleanParagraph(
      take(body, /Process attribute scope\s*\n/, /\n\s*Process attribute achievements\s*\n/)
    );
    const achievementsBlock =
      take(body, /Process attribute achievements\s*\n/, /\n\s*Generic practices\s*\n/) || "";
    const gpsBlock =
      take(body, /Generic practices\s*\n/, /\n\s*\d+\.\d+(?:\.\d+)?\.\s/) || take(body, /Generic practices\s*\n/, /\n{4,}/) || "";

    out[loc.paId] = {
      id: loc.paId,
      level,
      name: loc.name,
      scope,
      achievements: parseAchievements(achievementsBlock),
      genericPractices: parseGPs(gpsBlock, loc.paId),
      pamSection: lines[loc.startLine].match(/^(\d+\.\d+\.\d+)/)?.[1],
    };
  }
  return out;
}

function parseAchievements(block) {
  if (!block) return [];
  const out = [];
  const re = /^\s*(\d+)\)\s+([^\n]+(?:\n(?!\s*\d+\))[^\n]+)*)/gm;
  for (const m of block.matchAll(re)) out.push({ id: Number(m[1]), text: cleanParagraph(m[2]) });
  return out;
}

function parseGPs(block, paId) {
  if (!block) return [];
  // Stop before the per-PA scoreboard table ("GP X.Y.Z Title X") which would
  // otherwise match our anchor regex and produce phantom GPs with empty bodies.
  const cutoff = block.search(/\nOutput Information Items\b/);
  if (cutoff > 0) block = block.slice(0, cutoff);

  const results = [];
  const anchorRe = /^(GP \d\.\d\.\d)(?::\s*|\s+)([^\n]+)/gm;
  const anchors = [];
  for (const m of block.matchAll(anchorRe)) {
    // Skip scoreboard rows like "GP 1.1.1 Achieve the process outcomes X"
    if (/\s+X\s*$/.test(m[2])) continue;
    anchors.push({ start: m.index, id: m[1], firstLine: m[2] });
  }
  anchors.push({ start: block.length });

  for (let i = 0; i < anchors.length - 1; i++) {
    const chunk = block.slice(anchors[i].start, anchors[i + 1].start).trim();
    const id = anchors[i].id;
    const firstLine = anchors[i].firstLine.trim();
    const titleMatch = firstLine.match(/^([^.]+)\.\s*(.*)$/);
    const title = titleMatch ? titleMatch[1].trim() : firstLine;
    const rest = chunk.replace(/^GP \d\.\d\.\d(?::\s*|\s+)[^\n]+\n?/, "").trim();
    const description = stripNotes((titleMatch?.[2] || "") + " " + rest);
    results.push({ id, title, description, pamCitation: `PAM §5 ${id}` });
  }
  return results;
}

// ---------------------------------------------------------------------------
// PAM Annex — Work Product catalog
// ---------------------------------------------------------------------------

function extractWorkProducts(pam) {
  const lines = pam.split(/\r?\n/);
  // Harvest WP IDs + names from the entire document (Annex B is authoritative
  // but ID/name pairs appear in process sections too, often with cleaner names).
  const wpHead = /^(\d{2}-\d{2})\s+([A-Za-z][^\n|]{1,80})$/gm;
  const candidates = new Map(); // id → list of {name, score}
  for (const m of pam.matchAll(wpHead)) {
    const id = m[1];
    let name = m[2].trim();
    // Strip trailing scoreboard markers like " X", " X X", etc.
    name = name.replace(/(?:\s+X)+\s*$/i, "").trim();
    if (name.length < 2) continue;
    const list = candidates.get(id) ?? [];
    list.push({ name, score: nameQualityScore(name) });
    candidates.set(id, list);
  }
  const catalog = {};
  for (const [id, list] of candidates) {
    list.sort((a, b) => b.score - a.score);
    catalog[id] = { id, name: list[0].name, aliases: [] };
  }
  return catalog;
}

function nameQualityScore(name) {
  // Prefer shorter, well-capitalized names; penalize all-lowercase fragments
  let score = 0;
  if (name.length < 40) score += 3;
  if (/^[A-Z]/.test(name)) score += 2;
  if (!/\s+[a-z]{1,3}\s+/.test(name)) score += 1;
  score -= Math.max(0, name.length - 40) * 0.1;
  return score;
}

// ---------------------------------------------------------------------------
// Guideline — coarse-grain extraction of per-process sections
// ---------------------------------------------------------------------------

function extractGuidelineRules(guideline) {
  const lines = guideline.split(/\r?\n/);
  const perProcess = {};
  const procHead = new RegExp(`^#+\\s*(${PROCESS_ID_RE.source})\\b.*$`);
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(procHead);
    if (m) {
      current = m[1];
      perProcess[current] ||= { processId: current, paragraphs: [], lineCount: 0 };
      perProcess[current].firstLine ||= i + 1;
      continue;
    }
    if (current) {
      perProcess[current].lineCount++;
      if (perProcess[current].paragraphs.length < 3 && lines[i].length > 40 && !NOISE_LINE_RE.test(lines[i])) {
        perProcess[current].paragraphs.push(lines[i].trim());
      }
    }
  }
  return perProcess;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function loadSeed() {
  try {
    const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));
    return seed.edges ?? [];
  } catch {
    return [];
  }
}

/** Attach inputWorkProducts to each process from seed edges where to===process.id. */
function mergeSeedInputs(processes, seedEdges, wpCatalog) {
  const inputsByProcess = new Map();
  for (const edge of seedEdges) {
    if (!edge?.to || !Array.isArray(edge.wps)) continue;
    const set = inputsByProcess.get(edge.to) ?? new Map();
    for (const wpId of edge.wps) {
      if (!set.has(wpId)) {
        const name = wpCatalog[wpId]?.name ?? "Unknown";
        set.set(wpId, { id: wpId, name, fromProcess: edge.from });
      }
    }
    inputsByProcess.set(edge.to, set);
  }
  for (const p of processes) {
    const inputs = inputsByProcess.get(p.id);
    p.inputWorkProducts = inputs
      ? [...inputs.values()].sort((a, b) => a.id.localeCompare(b.id))
      : [];
  }
  return processes;
}

function main() {
  const pam = readFileSync(PAM_PATH, "utf8");
  const guideline = (() => {
    try { return readFileSync(GUIDELINE_PATH, "utf8"); } catch { return ""; }
  })();

  console.log("Parsing PAM processes...");
  const processes = extractProcesses(pam);
  console.log(`  → ${processes.length} processes`);

  console.log("Parsing PAM process attributes...");
  const pas = extractProcessAttributes(pam);
  console.log(`  → ${Object.keys(pas).length} PAs`);

  console.log("Parsing PAM work product catalog...");
  const wps = extractWorkProducts(pam);
  console.log(`  → ${Object.keys(wps).length} work products`);

  console.log("Parsing Guideline per-process references...");
  const guidelineRules = extractGuidelineRules(guideline);
  console.log(`  → ${Object.keys(guidelineRules).length} process references`);

  console.log("Merging V-model seed edges into inputWorkProducts...");
  const seedEdges = loadSeed();
  mergeSeedInputs(processes, seedEdges, wps);
  const withInputs = processes.filter((p) => p.inputWorkProducts.length).length;
  console.log(`  → ${seedEdges.length} edges, ${withInputs}/${processes.length} processes receive inputs`);

  ensureDir(PROCESSES_DIR);
  for (const p of processes) {
    writeFileSync(resolve(PROCESSES_DIR, `${p.id}.json`), JSON.stringify(p, null, 2));
  }
  writeFileSync(resolve(OUT_DIR, "processAttributes.json"), JSON.stringify(pas, null, 2));
  writeFileSync(resolve(OUT_DIR, "workProducts.json"), JSON.stringify(wps, null, 2));
  writeFileSync(resolve(OUT_DIR, "guidelineRules.json"), JSON.stringify(guidelineRules, null, 2));
  writeFileSync(resolve(OUT_DIR, "processGraph.json"), JSON.stringify({ edges: seedEdges }, null, 2));

  const summary = {
    generatedAt: new Date().toISOString(),
    pamBytes: pam.length,
    guidelineBytes: guideline.length,
    processCount: processes.length,
    processesById: processes.map((p) => ({
      id: p.id,
      bps: p.basePractices.length,
      outcomes: p.outcomes.length,
      outputWPs: p.outputWorkProducts.length,
      inputWPs: p.inputWorkProducts.length,
      traceBPs: p.traceBPs,
    })),
    paCount: Object.keys(pas).length,
    pasById: Object.fromEntries(
      Object.entries(pas).map(([k, v]) => [k, { level: v.level, gps: v.genericPractices.length }])
    ),
    wpCount: Object.keys(wps).length,
  };
  writeFileSync(resolve(OUT_DIR, "_summary.json"), JSON.stringify(summary, null, 2));

  // Single-file bundle for browser (ESM JSON import, e.g. from Vite).
  const ratingScale = JSON.parse(readFileSync(resolve(OUT_DIR, "ratingScale.json"), "utf8"));
  const bundle = {
    version: "aspice-v4.0",
    generatedAt: summary.generatedAt,
    ratingScale,
    processes,
    processAttributes: pas,
    workProducts: wps,
    processGraph: { edges: seedEdges },
  };
  writeFileSync(resolve(OUT_DIR, "all.json"), JSON.stringify(bundle));

  console.log(`  → wrote all.json (${Math.round(JSON.stringify(bundle).length / 1024)} KB)`);
  console.log("Extraction complete.");
}

main();
