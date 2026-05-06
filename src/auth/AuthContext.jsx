import { useCallback, useMemo, useState } from "react";
import {
  authenticate,
  changePassword as storeChangePassword,
  clearSession,
  createUser,
  loadSession,
  saveSession,
  updateProfile as storeUpdateProfile,
} from "./userStore";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());

  const login = useCallback(async ({ email, password, rememberMe = false }) => {
    const u = await authenticate({ email, password });
    if (!u) throw new Error("이메일 또는 패스워드가 올바르지 않습니다.");
    saveSession(u, { rememberMe });
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const u = await createUser({ name, email, password });
    // 가입 직후엔 기본적으로 24시간 세션을 부여
    saveSession(u, { rememberMe: true });
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async ({ name, email }) => {
    if (!user) throw new Error("로그인이 필요합니다.");
    const updated = await storeUpdateProfile(user.id, { name, email });
    setUser(updated);
    return updated;
  }, [user]);

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    if (!user) throw new Error("로그인이 필요합니다.");
    await storeChangePassword(user.id, { currentPassword, newPassword });
  }, [user]);

  const value = useMemo(() => ({
    user, login, register, logout, updateProfile, changePassword,
  }), [user, login, register, logout, updateProfile, changePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
