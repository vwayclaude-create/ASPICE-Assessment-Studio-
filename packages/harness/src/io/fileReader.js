import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";

/**
 * Read supported evidence formats into a uniform Artifact.
 * Supported: .pdf .docx .xlsx .md .txt .csv
 *
 * @param {string} path
 * @returns {Promise<import("../model/evidence.js").Artifact>}
 */
export async function readArtifact(path) {
  const ext = extname(path).toLowerCase();
  const name = basename(path);
  let text = "";
  let mimeType = "application/octet-stream";

  if (ext === ".md" || ext === ".txt" || ext === ".csv") {
    text = await readFile(path, "utf8");
    mimeType = "text/plain";
  } else if (ext === ".pdf") {
    const pdfParse = (await import("pdf-parse")).default;
    const buf = await readFile(path);
    text = (await pdfParse(buf)).text;
    mimeType = "application/pdf";
  } else if (ext === ".docx") {
    const mammoth = (await import("mammoth")).default;
    const { value } = await mammoth.extractRawText({ path });
    text = value;
    mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (ext === ".xlsx") {
    const xlsx = (await import("xlsx")).default;
    const wb = xlsx.readFile(path);
    text = wb.SheetNames.map((n) => xlsx.utils.sheet_to_csv(wb.Sheets[n])).join("\n");
    mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }

  const stats = await readFile(path).then((b) => b.byteLength);
  return { name, path, mimeType, text, sizeBytes: stats };
}

export async function readArtifacts(paths) {
  return Promise.all(paths.map(readArtifact));
}
