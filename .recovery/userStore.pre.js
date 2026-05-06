// localStorage-backed user store. This is a frontend-only demo: there is no
// real server, no real email delivery, and no production-grade credential
// storage. Passwords are hashed with SHA-256 + per-user salt so they aren't
// kept as plaintext, but anyone with browser access can still inspect the
// stored data. Replace with a real backend before production use.

const USERS_KEY = "aspice.auth.users.v1";
const SESSION_KEY = "aspice.auth.session.v1";
const REMEMBERED_EMAIL_KEY = "aspice.auth.rememberedEmail.v1";

export const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24시간

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function randomHex(bytes) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}::${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createCredential(password) {
  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);
  return { salt, hash };
}

export async function verifyCredential(password, salt, hash) {
  const candidate = await hashPassword(password, salt);
  return candidate === hash;
}

export function findUserByEmail(email) {
  const norm = normalizeEmail(email);
  return readUsers().find((u) => u.email === norm) || null;
}

export function emailExists(email) {
  return !!findUserByEmail(email);
}

export async function createUser({ name, email, password }) {
  const users = readUsers();
  const norm = normalizeEmail(email);
  if (users.some((u) => u.email === norm)) {
    throw new Error("이미 가입된 이메일입니다.");
  }
  const { salt, hash } = await createCredential(password);
  const user = {
    id: `u_${Date.now()}_${randomHex(4)}`,
    name: name.trim(),
    email: norm,
    salt,
    hash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return publicUser(user);
}

export async function authenticate({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const ok = await verifyCredential(password, user.salt, user.hash);
  return ok ? publicUser(user) : null;
}

export async function updateProfile(userId, { name, email }) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) throw new Error("사용자를 찾을 수 없습니다.");

  const norm = normalizeEmail(email);
  if (users.some((u, i) => i !== idx && u.email === norm)) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }
  users[idx] = { ...users[idx], name: name.trim(), email: norm };
  writeUsers(users);
  return publicUser(users[idx]);
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) throw new Error("사용자를 찾을 수 없습니다.");
  const ok = await verifyCredential(currentPassword, users[idx].salt, users[idx].hash);
  if (!ok) throw new Error("현재 패스워드가 올바르지 않습니다.");
  const { salt, hash } = await createCredential(newPassword);
  users[idx] = { ...users[idx], salt, hash };
  writeUsers(users);
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

function readSessionFromStorage(storage) {
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.userId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function loadSession() {
  // localStorage = 24h 유지 옵션, sessionStorage = 브라우저 세션 한정.
  const persistent = readSessionFromStorage(localStorage);
  const ephemeral = readSessionFromStorage(sessionStorage);
  const session = persistent || ephemeral;
  if (!session) return null;

  if (session.expiresAt && Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }
  const user = readUsers().find((u) => u.id === session.userId);
  return user ? publicUser(user) : null;
}

export function saveSession(user, { rememberMe = false } = {}) {
  // 직전 세션은 항상 정리한 뒤 선택된 저장소에만 기록
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);

  const payload = rememberMe
    ? { userId: user.id, expiresAt: Date.now() + SESSION_TTL_MS }
    : { userId: user.id };
  const target = rememberMe ? localStorage : sessionStorage;
  target.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function loadRememberedEmail() {
  try {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY) || "";
  } catch {
    return "";
  }
}

export function saveRememberedEmail(email) {
  localStorage.setItem(REMEMBERED_EMAIL_KEY, normalizeEmail(email));
}

export function clearRememberedEmail() {
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
}
