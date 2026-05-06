import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "./validation";
import { emailExists } from "./userStore";
import { PasswordChecklist } from "./PasswordChecklist";
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

// 6자리 인증 코드 발급
function generateCode() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1000000).padStart(6, "0");
}

export function SignupPage({ onPendingVerification, onSwitchToLogin, onSwitchToLanding }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirm: "" });
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validatePasswordConfirm(password, confirm),
    };
    if (!next.email && emailExists(email)) {
      next.email = "이미 가입된 이메일입니다.";
    }
    setErrors(next);
    if (next.name || next.email || next.password || next.confirm) return;

    setSubmitting(true);
    setServerError("");
    try {
      const code = generateCode();
      onPendingVerification({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        code,
        issuedAt: Date.now(),
      });
    } catch (err) {
      setServerError(err.message || "가입을 시작하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={authPageStyle}>
      <div style={{ ...authCardStyle, maxWidth: 500 }}>
        <div style={authEyebrowStyle}>Create account</div>
        <h1 style={authTitleStyle}>Assessment Studio 가입</h1>
        <p style={authSubtitleStyle}>이메일 인증 후 모든 기능을 이용하실 수 있습니다.</p>

        {serverError && <div style={{ ...errorBannerStyle, marginTop: 26 }}>{serverError}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: serverError ? 0 : 32 }} noValidate>
          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="signup-name">사용자 이름</label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={errors.name ? inputErrorStyle : inputStyle}
              placeholder="홍길동"
            />
            {errors.name && <div style={fieldErrorStyle}>{errors.name}</div>}
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="signup-email">이메일 (로그인 ID)</label>
            <input
              id="signup-email"
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
            <label style={labelStyle} htmlFor="signup-password">패스워드</label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={errors.password ? inputErrorStyle : inputStyle}
              placeholder="8자 이상, 영문·숫자·특수문자 포함"
            />
            <PasswordChecklist password={password} />
            {errors.password && <div style={fieldErrorStyle}>{errors.password}</div>}
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle} htmlFor="signup-confirm">패스워드 확인</label>
            <input
              id="signup-confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={errors.confirm ? inputErrorStyle : inputStyle}
              placeholder="패스워드를 다시 입력하세요"
            />
            {errors.confirm && <div style={fieldErrorStyle}>{errors.confirm}</div>}
          </div>

          <button type="submit" style={primaryButtonStyle} disabled={submitting}>
            {submitting ? "처리 중…" : (<>이메일 인증 받기 <ArrowRight size={13} /></>)}
          </button>
        </form>

        <div style={footerNoteStyle}>
          이미 계정이 있으신가요?{" "}
          <button type="button" onClick={onSwitchToLogin} style={linkButtonStyle}>로그인</button>
        </div>
        <div style={{ ...footerNoteStyle, marginTop: 10 }}>
          <button type="button" onClick={onSwitchToLanding} style={linkButtonStyle}>← 랜딩 페이지로</button>
        </div>
      </div>
    </div>
  );
}
