// An Artifact is a single piece of evidence submitted to the harness.
// The harness does not trust callers to pre-classify artifacts — detection
// happens inside the engine based on filename and extracted text.

export function makeArtifact({ path, name, mime, text, buffer, meta = {} }) {
  const displayName = name ?? (path ? path.split(/[\\/]/).pop() : "unnamed");
  return {
    path: path ?? null,
    name: displayName,
    mime: mime ?? null,
    text: text ?? null,
    buffer: buffer ?? null,
    meta,
  };
}

export function hasContent(artifact) {
  return Boolean((artifact.text && artifact.text.length > 0) || artifact.buffer);
}
