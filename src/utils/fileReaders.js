import mammoth from "mammoth";
import * as XLSX from "xlsx";
import JSZip from "jszip";

const readFile = (file, method, transform) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(transform ? transform(r.result) : r.result);
    r.onerror = reject;
    r[method](file, method === "readAsText" ? "utf-8" : undefined);
  });

export const toBase64 = (file) =>
  readFile(file, "readAsDataURL", (result) => result.split(",")[1]);

export const readArrayBuffer = (file) =>
  readFile(file, "readAsArrayBuffer");

export const readAsText = (file) =>
  readFile(file, "readAsText");

// DOCX text with U+000C (\f) form-feed inserted at page boundaries detected
// from <w:lastRenderedPageBreak/> and <w:br w:type="page"/> markers in
// word/document.xml. Server splits on \f to compute per-page offsets so
// evidence quotes can be tagged with their source page. Falls back to
// mammoth's plain raw-text extraction when XML parsing fails.
export const extractDocxText = async (file) => {
  const buf = await readArrayBuffer(file);
  try {
    const zip = await JSZip.loadAsync(buf);
    const xmlFile = zip.file("word/document.xml");
    if (xmlFile) {
      const xml = await xmlFile.async("string");
      const parsed = parseDocxXmlToText(xml);
      if (parsed) return parsed;
    }
  } catch {
    /* fall through to mammoth */
  }
  const result = await mammoth.extractRawText({ arrayBuffer: buf });
  return result.value;
};

function parseDocxXmlToText(xml) {
  const paraRe = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
  let out = "";
  let m;
  while ((m = paraRe.exec(xml)) !== null) {
    const para = m[1];
    if (/<w:lastRenderedPageBreak\b/.test(para) || /<w:br\b[^>]*w:type="page"/.test(para)) {
      out += "\f";
    }
    out += extractParagraphText(para) + "\n";
  }
  return out.trim() ? out : null;
}

function extractParagraphText(para) {
  let pText = "";
  const re = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
  let m;
  while ((m = re.exec(para)) !== null) {
    pText += decodeXmlEntities(m[1] || "");
  }
  return pText;
}

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export const extractXlsxText = async (file) => {
  const buf = await readArrayBuffer(file);
  const wb = XLSX.read(buf, { type: "array" });
  return wb.SheetNames
    .map((name) => `[Sheet: ${name}]\n${XLSX.utils.sheet_to_csv(wb.Sheets[name])}`)
    .join("\n\n");
};

// mode 값(formats.js의 SUPPORTED_FORMATS[ext].mode)에 맞춰 적절한 내용으로 변환
export const extractFileContent = async (file, mode) => {
  switch (mode) {
    case "pdf":  return { b64:  await toBase64(file),        text: null };
    case "docx": return { b64:  null, text: await extractDocxText(file) };
    case "xlsx": return { b64:  null, text: await extractXlsxText(file) };
    case "text":
    default:     return { b64:  null, text: await readAsText(file) };
  }
};
