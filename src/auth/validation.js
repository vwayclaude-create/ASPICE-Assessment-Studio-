// Email & password validators used by signup, login, and profile screens.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email) return "이메일을 입력하세요.";
  if (!EMAIL_RE.test(email)) return "유효한 이메일 형식이 아닙니다.";
  return "";
}

export function validateName(name) {
  if (!name || !name.trim()) return "사용자 이름을 입력하세요.";
  if (name.trim().length < 2) return "사용자 이름은 2자 이상이어야 합니다.";
  if (name.trim().length > 40) return "사용자 이름은 40자 이하여야 합니다.";
  return "";
}

// 8자 이상 + 영문 + 숫자 + 특수문자 포함
const PASSWORD_LETTER = /[A-Za-z]/;
const PASSWORD_DIGIT = /\d/;
const PASSWORD_SPECIAL = /[^A-Za-z0-9\s]/;

export function passwordChecklist(password) {
  return {
    length: !!password && password.length >= 8,
    letter: PASSWORD_LETTER.test(password || ""),
    digit: PASSWORD_DIGIT.test(password || ""),
    special: PASSWORD_SPECIAL.test(password || ""),
  };
}

export function validatePassword(password) {
  if (!password) return "패스워드를 입력하세요.";
  const c = passwordChecklist(password);
  if (!c.length) return "패스워드는 8자 이상이어야 합니다.";
  if (!c.letter) return "패스워드에 영문자가 포함되어야 합니다.";
  if (!c.digit) return "패스워드에 숫자가 포함되어야 합니다.";
  if (!c.special) return "패스워드에 특수문자가 포함되어야 합니다.";
  return "";
}

export function validatePasswordConfirm(password, confirm) {
  if (!confirm) return "패스워드 확인을 입력하세요.";
  if (password !== confirm) return "패스워드가 일치하지 않습니다.";
  return "";
}
