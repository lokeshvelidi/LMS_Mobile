import apiClient from "./apiClient";
export const getAdminAuditLogs = async () => { const response = await apiClient.get("/api/auditlogs"); const payload = response.data?.data ?? response.data; return Array.isArray(payload) ? payload : payload?.items ?? payload?.data ?? []; };
