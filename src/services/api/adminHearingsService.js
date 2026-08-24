import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
const list = (data) => { const x = unwrap(data); return Array.isArray(x) ? x : x?.items ?? x?.data ?? []; };
export const normalizeAdminHearing = (item) => ({
  hearingId: item?.hearingId,
  caseId: item?.caseId,
  hearingDate: item?.hearingDate ?? null,
  purpose: item?.purpose ?? null,
  caseNumber: item?.caseNumber ?? null,
  courtHall: item?.courtHall ?? null,
  status: item?.status ?? null,
});
export const getAdminHearings = async () => list((await apiClient.get("/api/hearings")).data).map(normalizeAdminHearing);
export const getAdminUpcomingHearings = async () => list((await apiClient.get("/api/hearings/upcoming")).data).map(normalizeAdminHearing);
export const getAdminHearing = async (id) => normalizeAdminHearing(unwrap((await apiClient.get(`/api/hearings/${Number(id)}`)).data));
export const createAdminHearing = async (payload) => unwrap((await apiClient.post("/api/hearings", payload)).data);
export const updateAdminHearing = async (id, payload) => unwrap((await apiClient.put(`/api/hearings/${Number(id)}`, payload)).data);
export const deleteAdminHearing = async (id) => apiClient.delete(`/api/hearings/${Number(id)}`);
