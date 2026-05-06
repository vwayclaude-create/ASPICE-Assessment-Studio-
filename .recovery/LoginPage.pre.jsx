import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { T, FONTS } from "../theme";
import { useAuth } from "./useAuth";
import { validateEmail } from "./validation";
import {
  clearRememberedEmail,
  loadRememberedEmail,
  saveRememberedEmail,
} from "./userStore";
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
  errorBannerStyle,
  footerNoteStyle,
  linkButtonStyle,
} from "./authStyles";

export function LoginPage({ onSwitchToSignup, onSwitchToLanding }) {
  const { login } = useAuth();
  const [initialEmail] = useState(() => loadRememberedEmail());
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(!!initialEmail);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {
      email: validateEmail(email),
      password: password ? "" : "패스워드를 입력하세요.",
    };
    setErrors(next);
    if (next.email || next.password) return;

    setSubmitting(true);
    setServerError("");
    try {
      await login({ email, password, rememberMe: keepLoggedIn });
      if (rememberEmail) saveRememberedEmail(email);
      else clearRememberedEmail();
    } catch (err) {
      setServerError(err.message || "로그인에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={authPageStyle}>
      <div style={authCardStyle}>
        <div style={authEyebrowStyle}>Sign in</div>
        <h1 style={authTitleStyle}>다시 오신 것을 환영합니다</h1>
        <p style={authSubtitleStyle}>가입하신 이메일과 패스워드로 로그인하세요.</p>

        {serverError && <div style={{ ...errorBannerStyle, marginTop: 26 }}>{serverError}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: serverError ? 0 : 32 }} noValidate>
          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="login-email">이메일</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={errors.email ? inputErrorStyle : inputStyle}
              placeholder="name@company.com"
            />
            {errors.email && <div style={fieldErrorStyle}>{errors.email}</div>}
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="login-password">패스워드</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={errors.password ? inputErrorStyle : inputStyle}
              placeholder="••••••••"
            />
            {errors.password && <div style={fieldErrorStyle}>{errors.password}</div>}
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 22,
            marginTop: 4,
          }}>
            <CheckboxRow
              id="login-remember-email"
              checked={rememberEmail}
              onChange={setRememberEmail}
              label="이메일 기억하기"
              hint="다음 방문 시 이메일이 자동으로 입력됩니다"
            />
            <CheckboxRow
              id="login-keep"
              checked={keepLoggedIn}
              onChange={setKeepLoggedIn}
              label="24시간 로그인 유지"
              hint="체크하지 않으면 브라우저를 닫을 때 로그아웃됩니다"
            />
          </div>

          <button type="submit" style={primaryButtonStyle} disabled={submitting}>
            {submitting ? "로그인 중…" : (<>로그인 <ArrowRight size={13} /></>)}
          </button>
        </form>

        <div style={footerNoteStyle}>
          계정이 없으신가요?{" "}
          <button type="button" onClick={onSwitchToSignup} style={linkButtonStyle}>회원가입</button>
        </div>
        <div style={{ ...footerNoteStyle, marginTop: 10 }}>
          <button type="button" onClick={onSwitchToLanding} style={linkButtonStyle}>← 랜딩 페이지로</button>
        </div>
      </div>
    </div>
  );
}

function CheckboxRow({ id, checked, onChange, label, hint }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          marginTop: 3,
          width: 14,
          height: 14,
          accentColor: T.accent,
          cursor: "pointer",
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.35 }}>
        <span style={{ fontSize: 13, color: T.textHi, fontWeight: 500 }}>{label}</span>
        <span style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          color: T.textLo,
          letterSpacing: "0.04em",
          marginTop: 2,
        }}>{hint}</span>
      </span>
    </label>
  );
}
