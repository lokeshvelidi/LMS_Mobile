import apiClient from "./apiClient";

const unwrapList = (response) => {
  const payload = response.data?.data ?? response.data;
  const items = Array.isArray(payload) ? payload : payload?.items ?? payload?.values ?? payload?.data ?? [];
  return items;
};

export const getAdminClients = async () => unwrapList(await apiClient.get("/api/clients"));
export const getAdminAdvocates = async () => unwrapList(await apiClient.get("/api/advocates"));
export const getAdminCourts = async () => {
  // The courts endpoint is paged by some backend versions (five items by default).
  const response = await apiClient.get("/api/courts", { params: { page: 1, pageSize: 100 } });
  return unwrapList(response);
};
export const getAdminMasterValues = async (path) => unwrapList(await apiClient.get(path));
