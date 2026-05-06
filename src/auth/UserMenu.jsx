import { useEffect, useRef, useState } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { T, FONTS } from "../theme";
import { useAuth } from "./useAuth";

export function UserMenu({ onOpenProfile }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user) return null;

  const initials = (user.name || user.email)
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: T.surface2,
          border: `1px solid ${T.borderL}`,
          borderRadius: 6,
          padding: "8px 12px 8px 8px",
          cursor: "pointer",
          color: T.textHi,
          fontFamily: FONTS.sans,
        }}
      >
        <span style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: T.accentSoft,
          color: T.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}>{initials || "?"}</span>
        <span style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: 1.15 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.textHi }}>{user.name}</span>
          <span style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: T.textLo,
            letterSpacing: "0.04em",
          }}>{user.email}</span>
        </span>
        <ChevronDown size={14} color={T.textLo} />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 6px)",
          minWidth: 220,
          background: T.surface,
          border: `1px solid ${T.borderM}`,
          borderRadius: 6,
          boxShadow: T.shadowLg,
          padding: 6,
          zIndex: 200,
        }}>
          <MenuButton
            Icon={User}
            label="개인정보 수정"
            onClick={() => { setOpen(false); onOpenProfile(); }}
          />
          <MenuButton
            Icon={LogOut}
            label="로그아웃"
            danger
            onClick={() => { setOpen(false); logout(); }}
          />
        </div>
      )}
    </div>
  );
}

function MenuButton(props) {
  const { Icon, label, danger, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        background: "transparent",
        border: "none",
        color: danger ? T.err : T.textHi,
        padding: "10px 12px",
        cursor: "pointer",
        fontFamily: FONTS.sans,
        fontSize: 13,
        fontWeight: 500,
        borderRadius: 4,
        textAlign: "left",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = T.surface2; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
