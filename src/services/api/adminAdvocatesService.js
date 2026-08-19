import apiClient from "./apiClient";
const unwrap = (data) => data?.data ?? data;
const list = (data) => { const x = unwrap(data); return (Array.isArray(x) ? x : x?.items ?? x?.data ?? []).map(mapAdminAdvocate); };
export const mapAdminAdvocate = (x) => ({ id: x.advocateId, advocateId: x.advocateId, name: x.name ?? "-", mobile: x.mobile ?? "-", email: x.email ?? "-", cases: Array.isArray(x.cases) ? x.cases : [], raw: x });
export const getAdminAdvocates = async () => list((await apiClient.get("/api/advocates")).data);
export const getAdminAdvocate = async (id) => mapAdminAdvocate(unwrap((await apiClient.get(`/api/advocates/${Number(id)}`)).data));
export const createAdminAdvocate = async (payload) => mapAdminAdvocate(unwrap((await apiClient.post("/api/advocates", payload)).data));
export const updateAdminAdvocate = async (id, payload) => mapAdminAdvocate(unwrap((await apiClient.put(`/api/advocates/${Number(id)}`, payload)).data));
export const deleteAdminAdvocate = async (id) => apiClient.delete(`/api/advocates/${Number(id)}`);
