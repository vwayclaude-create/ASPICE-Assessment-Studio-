// PDF 내보내기에서 두 곳(exportReport.js per-process / exportProjectReport.js
// project landscape)이 공유하는 캔버스 캡처 + 페이지 슬라이싱 헬퍼.
// 캔버스 → PDF 페이지 슬라이스 로직이 두 모듈에 동일하게 박혀 있던 것을 통합한다.
import html2canvas from "html2canvas";

/**
 * html2canvas 호출 wrapper. scale=2, white bg, CORS on, logging off 같은
 * 공통 옵션을 디폴트로 넣고 호출자가 windowWidth / onclone 같은 추가 옵션을
 * 그대로 넘길 수 있도록 한다.
 */
export async function captureToPngCanvas(node, opts = {}) {
  const { scale = 2, backgroundColor = "#FFFFFF", ...rest } = opts;
  return html2canvas(node, {
    scale,
    backgroundColor,
    useCORS: true,
    logging: false,
    ...rest,
  });
}

/**
 * 큰 캔버스의 특정 행 구간 [srcY, srcY + srcH) 를 잘라 임시 캔버스로 옮겨 그린 뒤,
 * 그 임시 캔버스를 jsPDF 의 현재 페이지 (dstX, dstY) 위치에 (dstW × dstH)mm 로 그린다.
 * 흰 배경을 채워 투명 픽셀이 검게 나오는 것을 방지한다.
 */
export function sliceCanvasToPdfPage(pdf, canvas, { srcY, srcH, dstX, dstY, dstW, dstH }) {
  const tmp = document.createElement("canvas");
  tmp.width = canvas.width;
  tmp.height = srcH;
  const ctx = tmp.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, tmp.width, tmp.height);
  ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
  pdf.addImage(tmp.toDataURL("image/png"), "PNG", dstX, dstY, dstW, dstH);
}
