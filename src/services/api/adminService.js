import apiClient from "./apiClient";

const unwrap = (response) => response.data?.data ?? response.data;

export const getAdminDashboard = async () => {
  const [summary, status, stage, advocates, courts] = await Promise.allSettled([
    apiClient.get("/api/dashboard/summary"),
    apiClient.get("/api/dashboard/case-status-count"),
    apiClient.get("/api/dashboard/case-stage-count"),
    apiClient.get("/api/dashboard/advocate-wise-cases"),
    apiClient.get("/api/dashboard/court-wise-cases"),
  ]);
  const successful = (result) => result.status === "fulfilled" ? result.value : null;
  const rows = (payload) => { const value = payload?.data ?? payload; return Array.isArray(value) ? value : value?.items ?? value?.data ?? []; };
  const mapCaseStatusSeries = (payload) => rows(payload).filter((row) => row && row.status != null && row.count != null).map((row) => ({ label: row.status, value: Number(row.count) || 0, raw: row }));
  const mapStageSeries = (payload) => rows(payload).filter((row) => row && row.stage != null && row.count != null).map((row) => ({ label: row.stage, value: Number(row.count) || 0, raw: row }));
  const mapAdvocateSeries = (payload) => rows(payload).filter((row) => row && row.advocateId != null && row.count != null).map((row) => ({ advocateId: row.advocateId, name: row.advocateName, cases: Number(row.count) || 0, raw: row }));
  const mapCourtSeries = (payload) => rows(payload).filter((row) => row && row.courtId != null && row.count != null).map((row) => ({ courtId: row.courtId, label: row.courtName, value: Number(row.count) || 0, raw: row }));
  return {
    summary: successful(summary) ? unwrap(successful(summary)) : null,
    status: successful(status) ? unwrap(successful(status)) : null,
    stage: successful(stage) ? unwrap(successful(stage)) : null,
    advocates: successful(advocates) ? unwrap(successful(advocates)) : null,
    courts: successful(courts) ? unwrap(successful(courts)) : null,
    statusSeries: successful(status) ? mapCaseStatusSeries(unwrap(successful(status))) : [],
    stageSeries: successful(stage) ? mapStageSeries(unwrap(successful(stage))) : [],
    advocateSeries: successful(advocates) ? mapAdvocateSeries(unwrap(successful(advocates))) : [],
    courtSeries: successful(courts) ? mapCourtSeries(unwrap(successful(courts))) : [],
  };
};
