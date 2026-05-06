import { Clock, Trash2, FileText, Upload, Eye } from "lucide-react";
import { T, FONTS, SECTION_CONTAINER_STYLE } from "../theme";
import { SectionBadge } from "./SectionBadge";
import { countRatings, isCl1Pass } from "../data/ratingMeta";

const GRID_TEMPLATE = "180px 1fr 1.4fr 110px";
const HISTORY_COLOR = "#A78BFA";

const HistoryHeader = () => (
  <div style={{
    display: "grid",
    gridTemplateColumns: GRID_TEMPLATE,
    background: T.surface3,
    borderBottom: `1px solid ${T.borderM}`,
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.textMd,
    fontWeight: 700,
  }}>
    <div style={{ padding: "12px 16px", borderRight: `1px solid ${T.borderL}` }}>분석일자</div>
    <div style={{ padding: "12px 16px", borderRight: `1px solid ${T.borderL}` }}>Import 파일</div>
    <div style={{ padding: "12px 16px", borderRight: `1px solid ${T.borderL}` }}>평가 · 분석 보고서</div>
    <div style={{ padding: "12px 16px", textAlign: "center" }}>Action</div>
  </div>
);

const HistoryRow = ({ entry, isActive, isLast, onView, onDelete }) => {
  const counts = countRatings(entry.results.ratings);
  const fCount = counts.F || 0;
  const lCount = (counts.L || 0) + (counts["L+"] || 0) + (counts["L-"] || 0);
  const pCount = (counts.P || 0) + (counts["P+"] || 0) + (counts["P-"] || 0);
  const nCount = counts.N || 0;
  const pass = isCl1Pass(entry.results.ratings);
  const total = entry.results.ratings.length;
  const dateStr = new Date(entry.date).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: GRID_TEMPLATE,
      borderBottom: isLast ? "none" : `1px solid ${T.borderL}`,
      background: isActive ? T.accentSoft : "transparent",
      transition: "background 0.15s",
      alignItems: "center",
    }}>
      <div style={{
        padding: "14px 16px",
        borderRight: `1px solid ${T.borderL}`,
        fontFamily: FONTS.mono,
        fontSize: 11,
        color: isActive ? T.textHi : T.textMd,
        lineHeight: 1.5,
      }}>
        {dateStr}
        {entry.isSample && (
          <div style={{ fontSize: 9, color: T.warm, marginTop: 3, letterSpacing: "0.1em" }}>SAMPLE</div>
        )}
      </div>
      <div style={{ padding: "14px 16px", borderRight: `1px solid ${T.borderL}`, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          color: T.textHi,
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }} title={entry.fileName}>
          <Upload size={11} style={{ color: T.accent, marginRight: 6, verticalAlign: "middle" }}/>
          {entry.fileName || "—"}
        </div>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: T.textLo,
          marginTop: 4,
          letterSpacing: "0.05em",
        }}>
          {entry.fileSize ? `${(entry.fileSize/1024).toFixed(1)} KB` : ""}
        </div>
      </div>
      <div style={{ padding: "14px 16px", borderRight: `1px solid ${T.borderL}`, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            padding: "3px 8px",
            border: `1px solid ${pass ? T.ok : T.err}`,
            color: pass ? T.ok : T.err,
            background: pass ? "#052E1A" : "#2E0A0A",
            borderRadius: 3,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}>
            {pass ? "CONFORMANT" : "GAP"}
          </span>
          <span style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: HISTORY_COLOR,
            fontWeight: 700,
          }}>
            {entry.processId}
          </span>
          <span style={{
            fontSize: 12,
            color: T.textMd,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}>
            {entry.processName}
          </span>
        </div>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: T.textLo,
          marginTop: 6,
          letterSpacing: "0.05em",
          display: "flex",
          gap: 10,
        }}>
          <span>F:{fCount}</span>
          <span>L:{lCount}</span>
          <span style={{ color: pCount ? T.warm : T.textLo }}>P:{pCount}</span>
          <span style={{ color: nCount ? T.err : T.textLo }}>N:{nCount}</span>
          <span style={{ marginLeft: "auto", color: T.textDim }}>총 {total} BP</span>
        </div>
      </div>
      <div style={{
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "stretch",
      }}>
        <button
          onClick={onView}
          style={{
            background: isActive ? T.accent : "transparent",
            color: isActive ? T.onAccent : T.accent,
            border: `1px solid ${T.accent}`,
            padding: "6px 10px",
            fontFamily: FONTS.mono,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          <Eye size={11}/> {isActive ? "닫기" : "보기"}
        </button>
        <button
          onClick={onDelete}
          style={{
            background: "transparent",
            color: T.textLo,
            border: `1px solid ${T.borderM}`,
            padding: "5px 10px",
            fontFamily: FONTS.mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 3,
          }}
        >
          <Trash2 size={9}/> Del
        </button>
      </div>
    </div>
  );
};

export const HistoryCard = ({
  history,
  selectedHistoryId,
  onToggleView,
  onDeleteEntry,
  onClearAll,
}) => (
  <section style={SECTION_CONTAINER_STYLE}>
    <SectionBadge color={HISTORY_COLOR}>§ 04 · HISTORY</SectionBadge>

    <div style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 18,
      marginTop: 6,
      flexWrap: "wrap",
      gap: 12,
    }}>
      <div>
        <h3 style={{
          fontFamily: FONTS.sans,
          fontSize: 22,
          fontWeight: 700,
          margin: "0 0 4px 0",
          letterSpacing: "-0.02em",
          color: T.textHi,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <Clock size={18} style={{ color: HISTORY_COLOR }}/>
          분석 이력 관리
        </h3>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          color: T.textLo,
          letterSpacing: "0.1em",
        }}>
          {history.length} ENTRIES · 브라우저에 자동 저장됨
        </div>
      </div>
      {history.length > 0 && (
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
          <Trash2 size={11}/> Clear All
        </button>
      )}
    </div>

    {history.length === 0 ? (
      <div style={{
        padding: "36px 20px",
        textAlign: "center",
        border: `1px dashed ${T.borderM}`,
        borderRadius: 4,
        color: T.textLo,
        fontSize: 13,
        background: T.surface2,
      }}>
        <FileText size={26} style={{ color: T.textDim, marginBottom: 10 }}/>
        <div>아직 저장된 분석 이력이 없습니다.</div>
        <div style={{
          fontSize: 11,
          marginTop: 6,
          color: T.textDim,
          fontFamily: FONTS.mono,
          letterSpacing: "0.05em",
        }}>
          PDF를 업로드하고 분석을 실행하면 이곳에 자동으로 기록됩니다.
        </div>
      </div>
    ) : (
      <div style={{
        border: `1px solid ${T.borderL}`,
        borderRadius: 4,
        overflow: "hidden",
        background: T.surface2,
      }}>
        <HistoryHeader />
        {history.map((h, idx) => (
          <HistoryRow
            key={h.id}
            entry={h}
            isActive={selectedHistoryId === h.id}
            isLast={idx === history.length - 1}
            onView={() => onToggleView(h.id)}
            onDelete={() => onDeleteEntry(h.id)}
          />
        ))}
      </div>
    )}
  </section>
);
