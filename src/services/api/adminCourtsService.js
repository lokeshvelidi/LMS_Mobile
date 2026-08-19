import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
const list = (data) => { const x = unwrap(data); return (Array.isArray(x) ? x : x?.items ?? x?.data ?? []).map((item) => ({ ...item, id: item.courtId })); };
export const getAdminCourts = async () => list((await apiClient.get("/api/courts")).data);
export const getAdminCourt = async (id) => ({ ...unwrap((await apiClient.get(`/api/courts/${Number(id)}`)).data), id: Number(id) });
export const createAdminCourt = async (payload) => unwrap((await apiClient.post("/api/courts", payload)).data);
export const updateAdminCourt = async (id, payload) => unwrap((await apiClient.put(`/api/courts/${Number(id)}`, payload)).data);
export const deleteAdminCourt = async (id) => apiClient.delete(`/api/courts/${Number(id)}`);
