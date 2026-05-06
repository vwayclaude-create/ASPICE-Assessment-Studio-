import acq from "./acq.js";
import spl from "./spl.js";
import sys from "./sys.js";
import swe from "./swe.js";
import hwe from "./hwe.js";
import val from "./val.js";
import man from "./man.js";
import reu from "./reu.js";
import sup from "./sup.js";

const ALL = [...acq, ...spl, ...sys, ...swe, ...hwe, ...val, ...man, ...reu, ...sup];

export const PROCESS_REGISTRY = Object.fromEntries(ALL.map((p) => [p.id, p]));

export function listProcessIds() {
  return Object.keys(PROCESS_REGISTRY);
}

export function listProcessesByCategory() {
  const out = {};
  for (const p of ALL) {
    (out[p.category] ??= []).push({ id: p.id, name: p.name });
  }
  return out;
}

export { acq, spl, sys, swe, hwe, val, man, reu, sup };
