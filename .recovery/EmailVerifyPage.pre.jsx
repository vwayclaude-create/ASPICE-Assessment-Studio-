import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { T, FONTS } from "../theme";
import { useAuth } from "./useAuth";
import {
  authPageStyle,
  authCardStyle,
  authEyebrowStyle,
  authTitleStyle,
  authSubtitleStyle,
  labelStyle,
  inputStyle,
  inputErrorStyle,
  fieldErrorStyle,
  fieldGroupStyle,
  primaryButtonStyle,
  ghostButtonStyle,
  errorBannerStyle,
  infoBannerStyle,
  footerNoteStyle,
  linkButtonStyle,
} from "./authStyles";

const CODE_TTL_MS = 10 * 60 * 1000; // 10분

function generateCode() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1000000).padStart(6, "0");
}

export function EmailVerifyPage({ pending, onUpdatePending, onCancel }) {
  const { register } = useAuth();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, pending.issuedAt + CODE_TTL_MS - now);
  const expired = remainingMs === 0;
  const remainingLabel = useMemo(() => {
    const s = Math.ceil(remainingMs / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [remainingMs]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");

    if (expired) {
      setError("인증 코드가 만료되었습니다. 코드를 재발송해주세요.");
      return;
    }
    if (!/^\d{6}$/.test(input)) {
      setError("6자리 숫자를 입력하세요.");
      return;
    }
    if (input !== pending.code) {
      setError("인증 코드가 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    try {
      await register({ name: pending.name, email: pending.email, password: pending.password });
    } catch (err) {
      setServerError(err.message || "회원가입에 실패했습니다.");
      setSubmitting(false);
    }
  };

  const handleResend = () => {
    onUpdatePending({
      ...pending,
      code: generateCode(),
      issuedAt: Date.now(),
    });
    setInput("");
    setError("");
  };

  return (
    <div style={authPageStyle}>
      <div style={authCardStyle}>
        <div style={authEyebrowStyle}>Verify email</div>
        <h1 style={authTitleStyle}>이메일을 인증해주세요</h1>
        <p style={authSubtitleStyle}>
          <span style={{ color: T.textHi, fontWeight: 600 }}>{pending.email}</span> 로 6자리
          인증 코드를 발송했습니다. 아래에 코드를 입력하면 가입이 완료됩니다.
        </p>

        <div style={{ ...infoBannerStyle, marginTop: 24 }}>
          <div style={{ marginBottom: 6 }}>⚠ 데모 환경 안내</div>
          <div style={{ color: T.textMd, fontFamily: FONTS.sans, letterSpacing: 0 }}>
            현재 빌드는 실제 메일 서버가 연결되어 있지 않아 인증 코드를 아래에 직접 표시합니다.
            운영 시에는 SMTP 또는 이메일 서비스 연동으로 교체하세요.
          </div>
        </div>

        <div style={{
          marginTop: 14,
          background: "#000",
          border: `2px solid ${T.accent}`,
          borderRadius: 6,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Mail size={20} color={T.accent} />
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.textLo,
              fontWeight: 600,
            }}>
              Verification Code
            </div>
          </div>
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            letterSpacing: "0.32em",
            color: "#FFD166",
            fontWeight: 800,
            textShadow: "0 0 12px rgba(255, 209, 102, 0.35)",
          }}>
            {pending.code || "ERROR"}
          </div>
        </div>

        {serverError && <div style={{ ...errorBannerStyle, marginTop: 18 }}>{serverError}</div>}

        <form onSubmit={handleVerify} style={{ marginTop: 22 }} noValidate>
          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="verify-code">
              인증 코드 ({expired ? "만료됨" : `남은 시간 ${remainingLabel}`})
            </label>
            <input
              id="verify-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
              style={{
                ...(error ? inputErrorStyle : inputStyle),
                fontFamily: FONTS.mono,
                letterSpacing: "0.5em",
                fontSize: 18,
                textAlign: "center",
              }}
              placeholder="——————"
            />
            {error && <div style={fieldErrorStyle}>{error}</div>}
          </div>

          <button type="submit" style={primaryButtonStyle} disabled={submitting}>
            {submitting ? "가입 중…" : (<>회원가입 완료 <ArrowRight size={13} /></>)}
          </button>
        </form>

        <div style={{ marginTop: 14 }}>
          <button type="button" onClick={handleResend} style={ghostButtonStyle}>
            코드 재발송
          </button>
        </div>

        <div style={{ ...footerNoteStyle, marginTop: 18 }}>
          이메일을 잘못 입력하셨나요?{" "}
          <button type="button" onClick={onCancel} style={linkButtonStyle}>다시 입력</button>
        </div>
      </div>
    </div>
  );
}
