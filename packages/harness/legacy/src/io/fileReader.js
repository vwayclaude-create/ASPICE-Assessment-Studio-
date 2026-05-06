import { readFile } from "node:fs/promises";
import path from "node:path";
import { makeArtifact } from "../model/artifact.js";

/**
 * Load one or more files from disk and extract their text content.
 * Supported: .pdf, .doc, .docx, .xlsx, .xls, .md, .txt, .csv.
 * Unknown extensions fall through as UTF-8 text.
 */
export async function loadArtifactsFromPaths(paths) {
  const list = Array.isArray(paths) ? paths : [paths];
  const out = [];
  for (const p of list) out.push(await loadArtifactFromPath(p));
  return out;
}

export async function loadArtifactFromPath(filePath) {
  const buffer = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);
  const text = await extractText(buffer, ext);
  return makeArtifact({ path: filePath, name, text, buffer, meta: { ext } });
}

async function extractText(buffer, ext) {
  try {
    switch (ext) {
      case ".pdf": return await extractPdf(buffer);
      case ".docx": return await extractDocx(buffer);
      case ".doc": return await extractDocx(buffer); // best-effort via mammoth
      case ".xlsx":
      case ".xls":
      case ".csv": return await extractXlsx(buffer);
      case ".md":
      case ".txt":
      case ".json":
      case ".yaml":
      case ".yml":
      default: return buffer.toString("utf8");
    }
  } catch (err) {
    return `[extraction failed: ${err.message}]`;
  }
}

async function extractPdf(buffer) {
  const mod = await import("pdf-parse");
  const pdfParse = mod.default ?? mod;
  const data = await pdfParse(buffer);
  return data.text ?? "";
}

async function extractDocx(buffer) {
  const mod = await import("mammoth");
  const res = await mod.extractRawText({ buffer });
  return res.value ?? "";
}

async function extractXlsx(buffer) {
  const xlsx = await import("xlsx");
  const wb = xlsx.read(buffer, { type: "buffer" });
  const parts = [];
  for (const name of wb.SheetNames) {
    const sheet = wb.Sheets[name];
    parts.push(`# ${name}\n${xlsx.utils.sheet_to_csv(sheet)}`);
  }
  return parts.join("\n\n");
}
