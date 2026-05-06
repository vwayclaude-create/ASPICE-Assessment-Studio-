import { useState } from "react";
import { X } from "lucide-react";
import { T, FONTS } from "../theme";
import { useAuth } from "./useAuth";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "./validation";
import { emailExists } from "./userStore";
import { PasswordChecklist } from "./PasswordChecklist";
import {
  labelStyle,
  inputStyle,
  inputErrorStyle,
  fieldErrorStyle,
  fieldGroupStyle,
  primaryButtonStyle,
  errorBannerStyle,
  infoBannerStyle,
} from "./authStyles";

const TABS = [
  { id: "profile", label: "프로필" },
  { id: "password", label: "패스워드" },
];

export function ProfileModal({ onClose }) {
  const { user, updateProfile, changePassword } = useAuth();
  const [tab, setTab] = useState("profile");
  if (!user) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.surface,
          border: `1px solid ${T.borderM}`,
          borderRadius: 8,
          padding: "32px 36px 30px",
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          animation: "fadeIn 0.18s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.accent,
              fontWeight: 600,
              marginBottom: 6,
            }}>
              Account settings
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.textHi }}>개인정보 수정</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: T.textLo,
              cursor: "pointer",
              padding: 6,
              borderRadius: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          marginBottom: 24,
          borderBottom: `1px solid ${T.borderL}`,
        }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: tab === t.id ? T.accent : T.textLo,
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: `2px solid ${tab === t.id ? T.accent : "transparent"}`,
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "profile" ? (
          <ProfileForm user={user} updateProfile={updateProfile} />
        ) : (
          <PasswordForm changePassword={changePassword} />
        )}
      </div>
    </div>
  );
}

function ProfileForm({ user, updateProfile }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {
      name: validateName(name),
      email: validateEmail(email),
    };
    if (!next.email && email.toLowerCase() !== user.email && emailExists(email)) {
      next.email = "이미 사용 중인 이메일입니다.";
    }
    setErrors(next);
    if (next.name || next.email) return;

    setSubmitting(true);
    setServerError("");
    setSuccess("");
    try {
      await updateProfile({ name, email });
      setSuccess("프로필이 업데이트되었습니다.");
    } catch (err) {
      setServerError(err.message || "프로필 업데이트에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && <div style={errorBannerStyle}>{serverError}</div>}
      {success && <div style={{ ...infoBannerStyle, color: T.ok, borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.08)" }}>{success}</div>}

      <div style={fieldGroupStyle}>
        <label style={labelStyle} htmlFor="profile-name">사용자 이름</label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={errors.name ? inputErrorStyle : inputStyle}
        />
        {errors.name && <div style={fieldErrorStyle}>{errors.name}</div>}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle} htmlFor="profile-email">이메일 (로그인 ID)</label>
        <input
          id="profile-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={errors.email ? inputErrorStyle : inputStyle}
        />
        {errors.email && <div style={fieldErrorStyle}>{errors.email}</div>}
      </div>

      <button type="submit" style={primaryButtonStyle} disabled={submitting}>
        {submitting ? "저장 중…" : "변경 저장"}
      </button>
    </form>
  );
}

function PasswordForm({ changePassword }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({ current: "", next: "", confirm: "" });
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = {
      current: current ? "" : "현재 패스워드를 입력하세요.",
      next: validatePassword(next),
      confirm: validatePasswordConfirm(next, confirm),
    };
    setErrors(fieldErrors);
    if (fieldErrors.current || fieldErrors.next || fieldErrors.confirm) return;

    setSubmitting(true);
    setServerError("");
    setSuccess("");
    try {
      await changePassword({ currentPassword: current, newPassword: next });
      setCurrent(""); setNext(""); setConfirm("");
      setSuccess("패스워드가 변경되었습니다.");
    } catch (err) {
      setServerError(err.message || "패스워드 변경에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && <div style={errorBannerStyle}>{serverError}</div>}
      {success && <div style={{ ...infoBannerStyle, color: T.ok, borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.08)" }}>{success}</div>}

      <div style={fieldGroupStyle}>
        <label style={labelStyle} htmlFor="profile-cur-pw">현재 패스워드</label>
        <input
          id="profile-cur-pw"
          type="password"
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          style={errors.current ? inputErrorStyle : inputStyle}
        />
        {errors.current && <div style={fieldErrorStyle}>{errors.current}</div>}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle} htmlFor="profile-new-pw">새 패스워드</label>
        <input
          id="profile-new-pw"
          type="password"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          style={errors.next ? inputErrorStyle : inputStyle}
          placeholder="8자 이상, 영문·숫자·특수문자 포함"
        />
        <PasswordChecklist password={next} />
        {errors.next && <div style={fieldErrorStyle}>{errors.next}</div>}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle} htmlFor="profile-new-pw2">새 패스워드 확인</label>
        <input
          id="profile-new-pw2"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={errors.confirm ? inputErrorStyle : inputStyle}
        />
        {errors.confirm && <div style={fieldErrorStyle}>{errors.confirm}</div>}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" style={primaryButtonStyle} disabled={submitting}>
          {submitting ? "변경 중…" : "패스워드 변경"}
        </button>
      </div>
    </form>
  );
}
