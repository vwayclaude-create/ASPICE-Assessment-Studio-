import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJson(p) {
  return JSON.parse(readFileSync(resolve(__dirname, p), "utf8"));
}

export const ratingScale = readJson("ratingScale.json");

let _processes;
export function loadProcesses() {
  if (_processes) return _processes;
  const dir = resolve(__dirname, "processes");
  try {
    _processes = readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => readJson(`processes/${f}`));
  } catch {
    _processes = [];
  }
  return _processes;
}

export function loadProcess(id) {
  return loadProcesses().find((p) => p.id === id) ?? null;
}

let _pa;
export function loadProcessAttributes() {
  if (_pa) return _pa;
  try {
    _pa = readJson("processAttributes.json");
  } catch {
    _pa = {};
  }
  return _pa;
}

let _wp;
export function loadWorkProducts() {
  if (_wp) return _wp;
  try {
    _wp = readJson("workProducts.json");
  } catch {
    _wp = {};
  }
  return _wp;
}

let _graph;
export function loadProcessGraph() {
  if (_graph) return _graph;
  try {
    _graph = readJson("processGraph.json");
  } catch {
    _graph = { edges: [] };
  }
  return _graph;
}
