import React, {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getAuthSession,
  saveAuthSession,
  clearAuthData,
} from "../services/storage/authStorage";
import {
  loginWithCredentials,
  logoutClient,
  validateSession,
} from "../services/api/authService";
import {
  refreshSessionTokens,
  setAuthenticationFailureHandler,
} from "../services/api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [realm, setRealm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSessionState = useCallback(() => {
    setToken(null);
    setUser(null);
    setRole(null);
    setRealm(null);
  }, []);

  const applySession = useCallback((session) => {
    setToken(session.accessToken);
    setUser(session.user);
    setRole(session.role);
    setRealm(session.realm);
  }, []);

  useEffect(() => setAuthenticationFailureHandler(clearSessionState), [clearSessionState]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await getAuthSession();
        if (!storedSession) return;

        const validated = await validateSession(storedSession);
        await saveAuthSession(validated);
        applySession(validated);
      } catch (error) {
        await clearAuthData();
        clearSessionState();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [applySession, clearSessionState]);

  const login = async (identifier, password) => {
    const session = await loginWithCredentials(identifier, password);
    await saveAuthSession(session);
    applySession(session);
    return session;
  };

  const logout = async () => {
    try {
      if (realm === "client") await logoutClient();
    } catch {
      // Local logout must always complete, including for an expired client token.
    } finally {
      await clearAuthData();
      clearSessionState();
    }
  };

  const refreshSession = async () => {
    const refreshed = await refreshSessionTokens();
    const validated = await validateSession(refreshed);
    await saveAuthSession(validated);
    applySession(validated);
    return validated;
  };

  const value = {
    user,
    token,
    role,
    realm,
    isLoading,
    isAuthenticated: Boolean(token && user && role && realm),
    login,
    logout,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
