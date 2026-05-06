import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { normalizeEvidence } from "./evidence";

export const exportReportAsText = ({ proc, results, fileName, date }) => {
  const lines = [];
  lines.push("ASPICE 4.0 CL1 진단 리포트");
  lines.push("================================");
  lines.push(`프로세스: ${proc.id} ${proc.name}`);
  lines.push(`문서: ${fileName}`);
  lines.push(`일시: ${date.toLocaleString("ko-KR")}`);
  lines.push("");
  lines.push(`[Summary] ${results.summary || ""}`);
  lines.push(`[Strengths] ${results.strengths || ""}`);
  lines.push(`[Gaps] ${results.gaps || ""}`);
  lines.push("");
  lines.push("BP별 평가");
  lines.push("--------------------------------");
  results.ratings.forEach((r) => {
    const bpDef = proc.bps.find((b) => b.id === r.bp);
    lines.push(`${r.bp} [${r.rating}] ${bpDef?.title || ""}`);
    lines.push(`  근거: ${r.rationale}`);
    const evidenceItems = normalizeEvidence(r.evidence);
    if (evidenceItems.length === 0) {
      lines.push(`  증거: (제시된 증거 없음)`);
    } else {
      lines.push(`  증거:`);
      evidenceItems.forEach((ev, i) => {
        const loc = ev.location ? `[${ev.location}] ` : "";
        lines.push(`    ${i + 1}. ${loc}${ev.quote || "(내용 없음)"}`);
      });
    }
    lines.push("");
  });
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ASPICE_${proc.id}_report.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

// PDF 내보내기용 인쇄 스타일: 화면의 다크 테마를 종이용 라이트 레이아웃으로 덮어쓴다.
const PRINT_STYLE = `
  #pdf-export-root { background:#FFFFFF !important; color:#3F3F46 !important; border:1.5px solid #0A0A0C !important; border-radius:4px !important; padding:20px 24px 22px !important; font-family:'Inter',system-ui,sans-serif !important; }
  #pdf-export-root, #pdf-export-root * { color:#3F3F46 !important; letter-spacing:-0.005em !important; }
  #pdf-export-root > div:first-child { background:#FFFFFF !important; color:#0A0A0C !important; border:1.5px solid #0A0A0C !important; font-size:9px !important; padding:3px 10px !important; top:-9px !important; }
  #pdf-export-root > div:first-child * { color:#0A0A0C !important; }
  #pdf-export-root h3 { color:#0A0A0C !important; font-size:22px !important; margin:0 0 6px 0 !important; font-weight:700 !important; }
  #pdf-export-root h3 > span { font-size:12px !important; color:#52525C !important; }
  #pdf-export-root p { font-size:10.5px !important; line-height:1.45 !important; margin:0 !important; }
  #pdf-export-root div[style*="repeat(3, 1fr)"] { gap:8px !important; margin-bottom:14px !important; }
  #pdf-export-root div[style*="repeat(3, 1fr)"] > div { background:#FFFFFF !important; border-radius:4px !important; padding:10px 14px !important; border-width:1px 1px 1px 4px !important; border-style:solid !important; }
  #pdf-export-root div[style*="repeat(3, 1fr)"] > div > div:nth-child(1) { font-size:9px !important; font-weight:700 !important; opacity:1 !important; }
  #pdf-export-root div[style*="repeat(3, 1fr)"] > div > div:nth-child(2) { font-size:32px !important; line-height:1 !important; margin-top:6px !important; font-weight:800 !important; color:#111827 !important; }
  #pdf-export-root div[style*="repeat(3, 1fr)"] > div > div:nth-child(3) { font-size:9px !important; color:#6B7280 !important; opacity:1 !important; margin-top:3px !important; }
  #pdf-export-root div[style*="1fr 1fr"] { gap:10px !important; margin-bottom:14px !important; }
  #pdf-export-root div[style*="1fr 1fr"] > div { background:#FAFAFA !important; border:1px solid #D4D4D8 !important; border-left:2.5px solid #0A0A0C !important; border-radius:0 3px 3px 0 !important; padding:10px 12px !important; }
  #pdf-export-root div[style*="1fr 1fr"] > div > div:nth-child(1) { font-size:9px !important; color:#0A0A0C !important; font-weight:700 !important; margin-bottom:3px !important; }
  #pdf-export-root div[style*="1fr 1fr"] > div > div:nth-child(2) { font-size:11px !important; color:#3F3F46 !important; line-height:1.45 !important; }
  #pdf-export-root div[style*="60px 1fr"] { background:#FFFFFF !important; border:1px solid #0A0A0C !important; border-radius:3px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(1) { background:#FFFFFF !important; color:#0A0A0C !important; border-right:1px solid #0A0A0C !important; padding:6px 0 !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(1) > div:nth-child(1) { font-size:20px !important; font-weight:800 !important; color:#0A0A0C !important; line-height:1 !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(1) > div:nth-child(2) { font-size:7px !important; color:#52525C !important; opacity:1 !important; margin-top:2px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) { padding:8px 12px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(2) { font-size:10px !important; color:#3F3F46 !important; line-height:1.4 !important; margin-bottom:5px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(3) { font-size:7.5px !important; color:#52525C !important; letter-spacing:0.12em !important; font-weight:700 !important; margin-bottom:3px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(4) { gap:3px !important; max-height:none !important; overflow:visible !important; padding-right:0 !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(4) > div { background:#FAFAFA !important; border:1px solid #D4D4D8 !important; border-left:2px solid #0A0A0C !important; padding:5px 8px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(4) > div > div:first-child { background:#0A0A0C !important; color:#FFFFFF !important; border:none !important; padding:1px 6px !important; font-size:8px !important; font-weight:700 !important; letter-spacing:0.06em !important; margin-bottom:3px !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(4) > div > div:first-child * { color:#FFFFFF !important; }
  #pdf-export-root div[style*="60px 1fr"] > div:nth-child(2) > div:nth-child(4) > div > div:last-child { font-size:9.5px !important; color:#3F3F46 !important; line-height:1.4 !important; }
  #pdf-export-root > div[style*="flex-direction: column"]:last-child { gap:5px !important; }
`;

const attachPrintStyle = (clonedDoc) => {
  const sections = clonedDoc.querySelectorAll("section");
  let target = null;
  sections.forEach((el) => { if (el.textContent && el.textContent.includes("NPLF VERDICT")) target = el; });
  if (!target) return;
  target.id = "pdf-export-root";
  const s = clonedDoc.createElement("style");
  s.textContent = PRINT_STYLE;
  clonedDoc.head.appendChild(s);
};

const formatHeaderDate = (d) => {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${y}. ${m}. ${day}. ${hh}:${mi}`;
};

const renderHeader = (pdf, proc, pageWidth, headerH, headerPad, cont) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  pdf.setFillColor(255, 255, 255); pdf.rect(0, 0, pageWidth, pageHeight, "F");
  pdf.setFillColor(248, 248, 250); pdf.rect(0, 0, pageWidth, headerH, "F");
  pdf.setDrawColor(180, 180, 188); pdf.setLineWidth(0.3);
  pdf.line(0, headerH, pageWidth, headerH);
  pdf.setTextColor(10, 10, 12); pdf.setFontSize(10);
  pdf.text(`ASPICE 4.0 · ${proc.id} ${proc.name}${cont ? " (cont.)" : ""}`, headerPad, 10);
  pdf.setFontSize(7.5); pdf.setTextColor(100, 100, 110);
  pdf.text(formatHeaderDate(new Date()), pageWidth - headerPad, 10, { align: "right" });
};

const sliceCanvasToPdf = (pdf, canvas, imgX, yTop, sliceMm, srcY, srcH, scaledImgW) => {
  const tmp = document.createElement("canvas");
  tmp.width = canvas.width;
  tmp.height = srcH;
  const ctx = tmp.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, tmp.width, tmp.height);
  ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
  pdf.addImage(tmp.toDataURL("image/png"), "PNG", imgX, yTop, scaledImgW, sliceMm);
};

export const exportReportAsPdf = async ({ proc, node }) => {
  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#FFFFFF",
    useCORS: true,
    logging: false,
    windowWidth: node.scrollWidth,
    onclone: attachPrintStyle,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginY = 8;
  const sideMargin = 5;
  const headerPad = 8;
  const headerH = 16;
  const scaledImgW = pageWidth - sideMargin * 2;
  const imgH = (canvas.height * scaledImgW) / canvas.width;
  const imgX = sideMargin;

  renderHeader(pdf, proc, pageWidth, headerH, headerPad, false);
  const positionY = headerH + 4;
  const pxPerMm = canvas.width / scaledImgW;

  if (imgH + positionY + marginY <= pageHeight) {
    pdf.addImage(imgData, "PNG", imgX, positionY, scaledImgW, imgH);
  } else {
    const firstMm = pageHeight - positionY - marginY;
    const otherMm = pageHeight - headerH - 4 - marginY;
    const fp = Math.min(canvas.height, Math.floor(firstMm * pxPerMm));
    sliceCanvasToPdf(pdf, canvas, imgX, positionY, fp / pxPerMm, 0, fp, scaledImgW);
    let sy = fp;
    let rem = canvas.height - fp;
    while (rem > 0) {
      pdf.addPage();
      renderHeader(pdf, proc, pageWidth, headerH, headerPad, true);
      const sp = Math.min(rem, Math.floor(otherMm * pxPerMm));
      sliceCanvasToPdf(pdf, canvas, imgX, positionY, sp / pxPerMm, sy, sp, scaledImgW);
      sy += sp;
      rem -= sp;
    }
  }

  const pc = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pc; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7);
    pdf.setTextColor(120, 120, 130);
    pdf.text(`Automotive SPICE® VDA QMC · ASPICE Workbench  ·  ${i}/${pc}`, pageWidth / 2, pageHeight - 4, { align: "center" });
  }
  pdf.save(`ASPICE_${proc.id}_report_${Date.now()}.pdf`);
};
