import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
export const normalizeAdminCourt = (item) => ({ courtId: item?.courtId, courtName: item?.courtName ?? null, id: item?.courtId });
const list = (data) => { const x = unwrap(data); return (Array.isArray(x) ? x : x?.items ?? x?.data ?? []).map(normalizeAdminCourt); };
export const getAdminCourts = async () => list((await apiClient.get("/api/courts")).data);
export const getAdminCourt = async (id) => normalizeAdminCourt(unwrap((await apiClient.get(`/api/courts/${Number(id)}`)).data));
export const createAdminCourt = async (payload) => unwrap((await apiClient.post("/api/courts", payload)).data);
export const updateAdminCourt = async (id, payload) => unwrap((await apiClient.put(`/api/courts/${Number(id)}`, payload)).data);
export const deleteAdminCourt = async (id) => apiClient.delete(`/api/courts/${Number(id)}`);
