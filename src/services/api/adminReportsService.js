import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
export const getAdminReport = async (kind) => unwrap((await apiClient.get(`/api/reports/${kind}`)).data);
export const getAdminCaseStatusCounts = async () => unwrap((await apiClient.get("/api/dashboard/case-status-count")).data);
