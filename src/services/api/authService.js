import apiClient from "./apiClient";
import { getUserRole, parseAuthResponse } from "./authSession";
import { getAuthSession } from "../storage/authStorage";

export const getStaffProfile = async () => {
  const response = await apiClient.get("/api/auth/me");
  return response.data?.data ?? response.data;
};

export const updateStaffProfile = async (payload) => {
  const response = await apiClient.put("/api/auth/me", payload);
  return response.data?.data ?? response.data;
};

export const uploadStaffProfilePhoto = async (file) => {
  const form = new FormData();
  form.append("file", { uri: file.uri, name: file.fileName || "profile-photo.jpg", type: file.mimeType || "image/jpeg" });
  const response = await apiClient.post("/api/auth/me/photo", form, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data?.data ?? response.data;
};

export const changeStaffPassword = async (oldPassword, newPassword) => {
  const response = await apiClient.post("/api/auth/change-password", { oldPassword, newPassword });
  return response.data?.data ?? response.data;
};

const AUTH_REJECTION_STATUSES = [401, 403, 404];

export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (error?.code === "ECONNABORTED") return "The request timed out. Please try again.";
  if (!error?.response) {
    if (error?.request) return "Unable to connect to the server. Check your internet connection.";
    return error?.message || fallback;
  }

  const status = error.response.status;
  const message = error.response.data?.message ?? error.response.data?.title ?? error.response.data?.error;
  if (typeof message === "string" && message.trim()) return message;
  if (status === 400 || status === 422) return "Please check the information you entered.";
  if (status === 401) return "Invalid login details.";
  if (status === 403) return "You do not have permission to sign in.";
  if (status === 404) return "The requested account was not found.";
  if (status >= 500) return "The server is unavailable. Please try again later.";
  return fallback;
};

const loadProfile = async (realm, accessToken, allowRefresh = false) => {
  const path = realm === "client" ? "/api/client-portal/profile" : "/api/auth/me";
  const response = await apiClient.get(path, {
    skipAuth: true,
    skipRefresh: !allowRefresh,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data?.data ?? response.data;
};

const completeSession = async (payload, realm) => {
  const parsed = parseAuthResponse(payload, realm);
  const user = parsed.user ?? await loadProfile(realm, parsed.accessToken);
  const role = realm === "client" ? "client" : getUserRole(user, parsed.role);

  if (!user || !role || (realm === "client" && role !== "client")) {
    throw new Error("The authenticated account has an unsupported role.");
  }

  return { ...parsed, user: { ...user, role }, role };
};

export const loginStaff = async (email, password) => {
  const response = await apiClient.post(
    "/api/auth/login",
    { email, password },
    { skipAuth: true, skipRefresh: true }
  );
  return completeSession(response.data, "staff");
};

export const loginClient = async (login, password) => {
  const response = await apiClient.post(
    "/api/client-portal/auth/login",
    { login, password },
    { skipAuth: true, skipRefresh: true }
  );
  return completeSession(response.data, "client");
};

export const loginWithCredentials = async (identifier, password) => {
  let staffSession;

  try {
    staffSession = await loginStaff(identifier, password);
  } catch (staffError) {
    if (!AUTH_REJECTION_STATUSES.includes(staffError.response?.status)) throw staffError;
    return loginClient(identifier, password);
  }

  // The general endpoint can authenticate a Client account. Re-authenticate
  // it through the Client Portal so refresh and logout use the correct realm.
  if (staffSession.role === "client") {
    return loginClient(identifier, password);
  }

  return staffSession;
};

export const validateSession = async (session) => {
  const user = await loadProfile(session.realm, session.accessToken, true);
  const currentSession = await getAuthSession();
  const role = session.realm === "client" ? "client" : getUserRole(user, session.role);

  if (!user || !role || (session.realm === "client" && role !== "client")) {
    throw new Error("The stored account has an unsupported role.");
  }

  if (session.realm === "staff" && role === "client") {
    throw new Error("The Client session must be authenticated through the Client Portal.");
  }

  return { ...(currentSession ?? session), user: { ...user, role }, role };
};

export const logoutClient = async () => {
  await apiClient.post("/api/client-portal/auth/logout", null, { skipRefresh: true });
};
