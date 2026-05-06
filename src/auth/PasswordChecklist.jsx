import { Check, X } from "lucide-react";
import { T, FONTS } from "../theme";
import { passwordChecklist } from "./validation";

const ITEMS = [
  { key: "length", label: "8자 이상" },
  { key: "letter", label: "영문자 포함" },
  { key: "digit", label: "숫자 포함" },
  { key: "special", label: "특수문자 포함" },
];

export function PasswordChecklist({ password }) {
  const c = passwordChecklist(password);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6px 16px",
      marginTop: 8,
    }}>
      {ITEMS.map(({ key, label }) => {
        const ok = c[key];
        return (
          <div key={key} style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: FONTS.mono,
            fontSize: 10,
            letterSpacing: "0.04em",
            color: ok ? T.ok : T.textLo,
          }}>
            {ok ? <Check size={11} /> : <X size={11} />}
            {label}
          </div>
        );
      })}
    </div>
  );
}
