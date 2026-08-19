import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
export const getAdminUsers = async () => { const x = unwrap((await apiClient.get("/api/auth/AppUsers")).data); return Array.isArray(x) ? x : x?.items ?? x?.data ?? []; };
export const regenerateAdminUserPassword = async (id) => {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) throw new Error("Invalid AppUser ID");
  return apiClient.post(`/api/auth/AppUsers/${numericId}/regenerate-password`);
};
