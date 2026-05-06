import { T } from "../theme";

export const GlobalStyles = () => (
  <style>{`
    @keyframes spin { to { transform: rotate(360deg); } }
    .anim-spin { animation: spin 1s linear infinite; }
    details summary::-webkit-details-marker { display: none; }
    button:focus-visible { outline: 2px solid ${T.accent}; outline-offset: 2px; }
    ::selection { background: ${T.accent}; color: ${T.onAccent}; }
    body { background: ${T.bg}; color: ${T.textHi}; }
    @keyframes fadeIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
  `}</style>
);
