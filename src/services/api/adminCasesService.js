import apiClient from "./apiClient";

const unwrap = (data) => data?.data ?? data;
const dateLabel = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";

export const mapAdminCase = (item) => ({
  id: item.caseId,
  caseNumber: item.caseNumber ?? "-",
  title: item.caseTitle ?? "-",
  type: item.caseType ?? "-",
  client: item.client?.name ?? item.clientName ?? "-",
  clientId: item.clientId ?? null,
  advocateId: item.advocateId ?? null,
  advocate: item.advocate?.name ?? "-",
  courtId: item.courtId ?? null,
  court: item.court?.courtName ?? "-",
  stage: item.caseStage ?? "-",
  status: item.caseStatus ?? "-",
  priority: item.priority ?? "-",
  nextHearing: dateLabel(item.nextHearingDate),
  created: dateLabel(item.filingDate),
  raw: item,
});

export const getAdminCases = async (params = {}) => {
  const response = await apiClient.get("/api/cases/paged", { params });
  const payload = unwrap(response.data);
  const items = Array.isArray(payload) ? payload : payload?.items ?? payload?.data ?? [];
  return { items: items.map(mapAdminCase), total: payload?.total ?? payload?.totalCount ?? null, page: payload?.page ?? params.page ?? 1, pageSize: payload?.pageSize ?? params.pageSize ?? items.length };
};

export const getAdminCaseDetail = async (caseId) => {
  const response = await apiClient.get(`/api/cases/${Number(caseId)}/detail`);
  return mapAdminCase(unwrap(response.data));
};

export const createAdminCase = async (payload) => {
  const response = await apiClient.post("/api/cases", payload);
  return mapAdminCase(unwrap(response.data));
};

export const updateAdminCase = async (caseId, payload) => {
  const response = await apiClient.put(`/api/cases/${Number(caseId)}`, payload);
  return mapAdminCase(unwrap(response.data));
};

export const updateAdminCaseStatus = async (caseId, value) => (await apiClient.patch(`/api/cases/${Number(caseId)}/status`, { value })).data;
export const updateAdminCaseStage = async (caseId, value) => (await apiClient.patch(`/api/cases/${Number(caseId)}/stage`, { value })).data;
export const deleteAdminCase = async (caseId) => apiClient.delete(`/api/cases/${Number(caseId)}`);
