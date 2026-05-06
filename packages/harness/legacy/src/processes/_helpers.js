// Helpers for defining ASPICE process plugins compactly.
// Each plugin returned by `defineProcess` has the shape consumed by the harness
// and engines: { id, name, category, purpose, basePractices[], outputWorkProducts[] }.

export function defineProcess({
  id,
  name,
  category,
  purpose,
  basePractices,
  outputWorkProducts,
}) {
  return {
    id,
    name,
    category,
    purpose,
    basePractices: basePractices.map((bp, i) => ({
      id: bp.id ?? `BP${i + 1}`,
      title: bp.title,
      keywords: bp.keywords ?? [],
    })),
    outputWorkProducts: outputWorkProducts.map(normalizeWp),
  };
}

function normalizeWp(wp) {
  if (typeof wp === "string") return { id: wp, aliases: [], keywords: [] };
  return {
    id: wp.id,
    aliases: wp.aliases ?? [],
    keywords: wp.keywords ?? [],
  };
}
