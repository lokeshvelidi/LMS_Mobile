import axios from "axios";

import {
  clearAuthData,
  getAuthSession,
  updateAuthSession,
} from "../storage/authStorage";
import { parseAuthResponse } from "./authSession";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://16.16.216.155:5000";

const apiClient = axios.create({
  baseURL,
  // Keep startup and screen transitions responsive when the API is offline or slow.
  timeout: 12000,
  headers: { Accept: "application/json" },
});

let refreshPromise = null;
let authenticationFailureHandler = null;

export const setAuthenticationFailureHandler = (handler) => {
  authenticationFailureHandler = handler;
  return () => {
    if (authenticationFailureHandler === handler) authenticationFailureHandler = null;
  };
};

const refreshStoredSession = async () => {
  const session = await getAuthSession();
  if (!session?.refreshToken || !session?.realm) {
    throw new Error("No refresh token is available.");
  }

  const path = session.realm === "client"
    ? "/api/client-portal/auth/refresh"
    : "/api/auth/refresh";
  const response = await axios.post(
    `${baseURL}${path}`,
    { refreshToken: session.refreshToken },
    { timeout: 12000, headers: { Accept: "application/json" } }
  );
  const refreshed = parseAuthResponse(response.data, session.realm);

  return updateAuthSession({
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken ?? session.refreshToken,
    expiresAt: refreshed.expiresAt ?? session.expiresAt ?? null,
    expiresIn: refreshed.expiresIn ?? session.expiresIn ?? null,
  });
};

export const refreshSessionTokens = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshStoredSession().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (config.skipAuth) return config;

    const session = await getAuthSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (
      error.response?.status !== 401 ||
      !request ||
      request.skipRefresh ||
      request._authRetry
    ) {
      return Promise.reject(error);
    }

    request._authRetry = true;

    try {
      const session = await refreshSessionTokens();
      request.headers = request.headers ?? {};
      request.headers.Authorization = `Bearer ${session.accessToken}`;
      return apiClient(request);
    } catch (refreshError) {
      await clearAuthData();
      authenticationFailureHandler?.();
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
