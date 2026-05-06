export const SUPPORTED_FORMATS = {
  pdf:  { mediaType: "application/pdf",   label: "PDF",  mode: "pdf"  },
  docx: { mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "DOCX", mode: "docx" },
  doc:  { mediaType: "application/msword", label: "DOC", mode: "docx" },
  xlsx: { mediaType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", label: "XLSX", mode: "xlsx" },
  md:   { mediaType: "text/markdown",     label: "MD",   mode: "text" },
};

export const ACCEPT_ATTR = ".pdf,.doc,.docx,.xlsx,.md";

export const MAX_FILE_SIZE = 30 * 1024 * 1024;

export const getFormatByName = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  return SUPPORTED_FORMATS[ext] || null;
};
