import { useEffect } from "react";
import { FONT_CSS } from "../theme";

export const useFontInjector = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = FONT_CSS;
    document.head.appendChild(style);
    return () => { try { document.head.removeChild(style); } catch { /* empty */ } };
  }, []);
};
