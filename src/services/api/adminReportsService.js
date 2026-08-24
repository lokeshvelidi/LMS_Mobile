import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
const reportPayload = (data) => { const value = unwrap(data); return value?.result ?? value; };
export const getAdminReport = async (kind) => {
  const first = reportPayload((await apiClient.get(`/api/reports/${kind}`)).data);
  const firstRows = Array.isArray(first) ? first : first?.items ?? first?.data ?? first?.values ?? [];
  const total = first?.totalCount ?? first?.total ?? first?.count;
  if (!total || firstRows.length >= total || !firstRows.length) return first;
  const pageSize = firstRows.length;
  const allRows = [...firstRows];
  for (let page = 2; allRows.length < total; page += 1) {
    const next = reportPayload((await apiClient.get(`/api/reports/${kind}`, { params: { page, pageSize } })).data);
    const nextRows = Array.isArray(next) ? next : next?.items ?? next?.data ?? next?.values ?? [];
    if (!nextRows.length) break;
    allRows.push(...nextRows);
  }
  return Array.isArray(first) ? allRows : { ...first, items: allRows };
};
export const getAdminCaseStatusCounts = async () => reportPayload((await apiClient.get("/api/dashboard/case-status-count")).data);
