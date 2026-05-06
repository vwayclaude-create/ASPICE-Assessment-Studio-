// 모델 응답·구버전 히스토리·샘플 데이터를 한 가지 형태로 정규화한다.
// 신규 형식: [{quote, location}, ...]
// 구 형식: "단일 문자열" — quote에 그대로 넣고 location은 비움.

export function normalizeEvidence(raw) {
  if (raw == null) return [];

  if (Array.isArray(raw)) {
    return raw
      .map((item) => normalizeOne(item))
      .filter((item) => item.quote || item.location);
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    return [{ quote: trimmed, location: "" }];
  }

  if (typeof raw === "object") {
    const one = normalizeOne(raw);
    return one.quote || one.location ? [one] : [];
  }

  return [];
}

function normalizeOne(item) {
  if (typeof item === "string") {
    return { quote: item.trim(), location: "" };
  }
  if (item && typeof item === "object") {
    const quote = pickStr(item, ["quote", "text", "excerpt", "evidence"]);
    const location = pickStr(item, ["location", "section", "page", "ref", "where"]);
    return { quote, location };
  }
  return { quote: "", location: "" };
}

function pickStr(obj, keys) {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}
