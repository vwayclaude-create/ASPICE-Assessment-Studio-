import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { T, FONTS } from "../theme";
import { PROCESS_GROUPS } from "../data/processGroups";
import { ASPICE_DATA } from "../data/aspiceData";

export const ProcessSidebar = ({ selectedProcess, onSelect }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const initial = {};
    const groupOfSelected = PROCESS_GROUPS.find((g) => g.ids.includes(selectedProcess));
    for (const g of PROCESS_GROUPS) {
      initial[g.label] = groupOfSelected ? g.label !== groupOfSelected.label : false;
    }
    return initial;
  });
  const [allCollapsed, setAllCollapsed] = useState(false);

  const toggleGroup = (label) =>
    setCollapsed((c) => ({ ...c, [label]: !c[label] }));

  const toggleAll = () => {
    const next = !allCollapsed;
    const map = {};
    for (const g of PROCESS_GROUPS) map[g.label] = next;
    setCollapsed(map);
    setAllCollapsed(next);
  };

  return (
    <aside>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: `1px solid ${T.borderL}`,
      }}>
        <div style={{
          fontFamily: FONTS.sans,
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: T.accent,
          fontWeight: 700,
        }}>Target Process</div>
        <button
          type="button"
          onClick={toggleAll}
          style={{
            background: "transparent",
            border: `1px solid ${T.borderL}`,
            color: T.textMd,
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "3px 8px",
            borderRadius: 3,
            fontWeight: 600,
          }}
        >{allCollapsed ? "모두 펼침" : "모두 접기"}</button>
      </div>

      {PROCESS_GROUPS.map((group) => {
        const isCollapsed = !!collapsed[group.label];
        return (
          <div key={group.label} style={{ marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => toggleGroup(group.label)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: "6px 4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: T.textHi,
                fontFamily: FONTS.sans,
                fontSize: 18,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {isCollapsed
                ? <ChevronRight size={12} style={{ flexShrink: 0 }} />
                : <ChevronDown size={12} style={{ flexShrink: 0 }} />}
              <span style={{ flex: 1 }}>{group.label}</span>
              <span style={{ color: T.textLo, fontSize: 10, fontWeight: 500 }}>{group.ids.length}</span>
            </button>

            {!isCollapsed && (
              <div style={{ display: "flex", flexDirection: "column", gap: 1, paddingTop: 4 }}>
                {group.ids.map((id) => {
                  const active = id === selectedProcess;
                  return (
                    <button
                      key={id}
                      onClick={() => onSelect(id)}
                      style={{
                        textAlign: "left",
                        border: "none",
                        background: active ? T.accentSoft : "transparent",
                        color: active ? T.textHi : T.textMd,
                        padding: "6px 10px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: FONTS.sans,
                        fontSize: 12,
                        fontWeight: active ? 600 : 400,
                        transition: "all 0.12s",
                        borderLeft: active ? `3px solid ${group.color}` : "3px solid transparent",
                        borderRadius: 3,
                        lineHeight: 1.3,
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.background = T.surface2;
                          e.currentTarget.style.color = T.textHi;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = T.textMd;
                        }
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "baseline", gap: 8, flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontFamily: FONTS.mono,
                          fontSize: 14,
                          fontWeight: 700,
                          color: T.textHi,
                          flexShrink: 0,
                          minWidth: 38,
                        }}>{id}</span>
                        <span style={{
                          fontSize: 18,
                          fontWeight: active ? 600 : 500,
                          letterSpacing: "-0.005em",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>{ASPICE_DATA[id].name}</span>
                      </span>
                      {active && <ChevronRight size={12} style={{ color: group.color, flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};
