import apiClient from "./apiClient";

const unwrap = (data) => data?.data ?? data;
const list = (payload) => { const value = unwrap(payload); return Array.isArray(value) ? value : value?.items ?? value?.data ?? []; };

export const mapAdminClient = (item) => ({
  id: item.clientId,
  clientId: item.clientId,
  name: item.name ?? "-",
  email: item.email ?? "-",
  mobile: item.mobile ?? item.phone ?? "-",
  address: item.address ?? "-",
  idProof: item.idProof ?? null,
  profilePhotoPath: item.profilePhotoPath ?? null,
  createdDate: item.createdDate ?? null,
  raw: item,
});

export const getAdminClients = async () => list((await apiClient.get("/api/clients")).data).map(mapAdminClient);
export const getAdminClient = async (clientId) => mapAdminClient(unwrap((await apiClient.get(`/api/clients/${Number(clientId)}`)).data));
export const createAdminClient = async (payload) => mapAdminClient(unwrap((await apiClient.post("/api/clients", payload)).data));
export const updateAdminClient = async (clientId, payload) => mapAdminClient(unwrap((await apiClient.put(`/api/clients/${Number(clientId)}`, payload)).data));
export const deleteAdminClient = async (clientId) => apiClient.delete(`/api/clients/${Number(clientId)}`);
export const uploadAdminClientIdProof = async (clientId, proofType, file) => { const form = new FormData(); form.append("proofType", proofType); form.append("file", file); return apiClient.post(`/api/clients/${Number(clientId)}/id-proof`, form, { headers: { "Content-Type": "multipart/form-data" } }); };
