// 분석 이력 / 프로젝트 이력 카드의 공통 외형을 담는다.
// 섹션 배지, 헤더 (제목 + entry count + clear-all 버튼), 헤더 표 행,
// 그리고 빈 상태 placeholder까지 — 각 페이지 별로 다른 부분은 renderRow 로 외부에서 주입.
import { Clock, Trash2, FileText } from "lucide-react";
import { T, FONTS, SECTION_CONTAINER_STYLE } from "../theme";
import { SectionBadge } from "./SectionBadge";

const HEADER_CELL_BASE = {
  padding: "12px 16px",
  fontFamily: FONTS.mono,
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: T.textMd,
  fontWeight: 700,
};

function HeaderRow({ gridTemplate, columns }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplate,
        background: T.surface3,
        borderBottom: `1px solid ${T.borderM}`,
      }}
    >
      {columns.map((label, idx) => {
        const isLast = idx === columns.length - 1;
        const isLastCentered = isLast && label.toLowerCase() === "action";
        return (
          <div
            key={idx}
            style={{
              ...HEADER_CELL_BASE,
              borderRight: isLast ? "none" : `1px solid ${T.borderL}`,
              textAlign: isLastCentered ? "center" : "left",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ primaryText, hintText }) {
  return (
    <div
      style={{
        padding: "36px 20px",
        textAlign: "center",
        border: `1px dashed ${T.borderM}`,
        borderRadius: 4,
        color: T.textLo,
        fontSize: 13,
        background: T.surface2,
      }}
    >
      <FileText size={26} style={{ color: T.textDim, marginBottom: 10 }} />
      <div>{primaryText}</div>
      {hintText && (
        <div
          style={{
            fontSize: 11,
            marginTop: 6,
            color: T.textDim,
            fontFamily: FONTS.mono,
            letterSpacing: "0.05em",
          }}
        >
          {hintText}
        </div>
      )}
    </div>
  );
}

/**
 * @param {{
 *   accentColor: string,
 *   sectionLabel: string,           // e.g. "§ 04 · HISTORY"
 *   title: string,                  // e.g. "분석 이력 관리"
 *   subtitle?: string,              // e.g. "5 ENTRIES · 브라우저에 자동 저장됨"
 *   gridTemplate: string,
 *   headerColumns: string[],
 *   entries: any[],
 *   renderRow: (entry: any, helpers: {gridTemplate: string, isLast: boolean, isActive: boolean}) => React.ReactNode,
 *   isActiveEntry?: (entry: any) => boolean,
 *   onClearAll?: () => void,
 *   emptyPrimary: string,
 *   emptyHint?: string,
 * }} props
 */
export function HistoryListShell({
  accentColor,
  sectionLabel,
  title,
  subtitle,
  gridTemplate,
  headerColumns,
  entries,
  renderRow,
  isActiveEntry,
  onClearAll,
  emptyPrimary,
  emptyHint,
}) {
  return (
    <section style={SECTION_CONTAINER_STYLE}>
      <SectionBadge color={accentColor}>{sectionLabel}</SectionBadge>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 18,
          marginTop: 6,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: FONTS.sans,
              fontSize: 22,
              fontWeight: 700,
              margin: "0 0 4px 0",
              letterSpacing: "-0.02em",
              color: T.textHi,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Clock size={18} style={{ color: accentColor }} />
            {title}
          </h3>
          {subtitle && (
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: T.textLo,
                letterSpacing: "0.1em",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {entries.length > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            style={{
              background: "transparent",
              color: T.textMd,
              border: `1px solid ${T.borderM}`,
              padding: "8px 16px",
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            <Trash2 size={11} /> Clear All
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <EmptyState primaryText={emptyPrimary} hintText={emptyHint} />
      ) : (
        <div
          style={{
            border: `1px solid ${T.borderL}`,
            borderRadius: 4,
            overflow: "hidden",
            background: T.surface2,
          }}
        >
          <HeaderRow gridTemplate={gridTemplate} columns={headerColumns} />
          {entries.map((entry, idx) =>
            renderRow(entry, {
              gridTemplate,
              isLast: idx === entries.length - 1,
              isActive: isActiveEntry?.(entry) ?? false,
            })
          )}
        </div>
      )}
    </section>
  );
}
