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
  // crypto.subtle is only available in secure contexts (HTTPS or localhost).
  // Fall back to a pure-JS SHA-256 when accessing via a plain-HTTP LAN origin.
  if (globalThis.crypto?.subtle?.digest) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return sha256Hex(data);
}

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

function sha256Hex(bytes) {
  const ror = (x, n) => (x >>> n) | (x << (32 - n));
  const bitLen = bytes.length * 8;
  const padLen = (56 - ((bytes.length + 1) % 64) + 64) % 64;
  const padded = new Uint8Array(bytes.length + 1 + padLen + 8);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000), false);
  dv.setUint32(padded.length - 4, bitLen >>> 0, false);

  const H = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const W = new Uint32Array(64);

  for (let i = 0; i < padded.length; i += 64) {
    for (let t = 0; t < 16; t++) W[t] = dv.getUint32(i + t * 4, false);
    for (let t = 16; t < 64; t++) {
      const s0 = ror(W[t - 15], 7) ^ ror(W[t - 15], 18) ^ (W[t - 15] >>> 3);
      const s1 = ror(W[t - 2], 17) ^ ror(W[t - 2], 19) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = ror(e, 6) ^ ror(e, 11) ^ ror(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA256_K[t] + W[t]) >>> 0;
      const S0 = ror(a, 2) ^ ror(a, 13) ^ ror(a, 22);
      const mj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + mj) >>> 0;
      h = g; g = f; f = e;
      e = (d + t1) >>> 0;
      d = c; c = b; b = a;
      a = (t1 + t2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
  }
  return Array.from(H, (v) => v.toString(16).padStart(8, "0")).join("");
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
