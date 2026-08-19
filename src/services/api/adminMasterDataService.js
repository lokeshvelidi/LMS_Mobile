import apiClient from "./apiClient";
export const getAdminMasterData = async (path) => { const response = await apiClient.get(path); const payload = response.data?.data ?? response.data; return Array.isArray(payload) ? payload : payload?.items ?? payload?.values ?? payload?.data ?? []; };
