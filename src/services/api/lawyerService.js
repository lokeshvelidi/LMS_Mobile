import apiClient from "./apiClient";
import * as FileSystem from "expo-file-system/legacy";
import { getAuthToken } from "../storage/authStorage";

const UNAVAILABLE = "Unavailable";
const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://16.16.216.155:5000";

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  return !date || Number.isNaN(date.getTime())
    ? UNAVAILABLE
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const dateValue = (value) => {
  const date = value ? new Date(value) : null;
  return !date || Number.isNaN(date.getTime())
    ? null
    : date.toISOString().slice(0, 10);
};

export const mapLawyerCase = (item) => ({
  id: item.caseId,
  raw: item,
  caseNumber: item.caseNumber ?? UNAVAILABLE,
  title: item.caseTitle ?? UNAVAILABLE,
  type: item.caseType ?? UNAVAILABLE,
  client: item.client?.name ?? UNAVAILABLE,
  clientId: item.clientId ?? null,
  advocateId: item.advocateId ?? null,
  courtId: item.courtId ?? null,
  stage: item.caseStage ?? UNAVAILABLE,
  status: item.caseStatus ?? UNAVAILABLE,
  priority: item.priority ?? UNAVAILABLE,
  filingDate: formatDate(item.filingDate),
  nextHearing: formatDate(item.nextHearingDate),
  nextHearingDateValue: dateValue(item.nextHearingDate),
  court: item.court?.courtName ?? UNAVAILABLE,
  judge: item.court?.judgeName ?? UNAVAILABLE,
  petitioner: item.petitioner ?? UNAVAILABLE,
  respondent: item.respondent ?? UNAVAILABLE,
  remarks: item.remarks ?? UNAVAILABLE,
  hearings: Array.isArray(item.hearings) ? item.hearings : [],
  documents: Array.isArray(item.documents) ? item.documents : [],
  payments: Array.isArray(item.payments) ? item.payments : [],
  paymentRequests: Array.isArray(item.paymentRequests) ? item.paymentRequests : [],
});

export const mapLawyerHearing = (item, caseById = new Map()) => {
  const relatedCase = caseById.get(item.caseId);
  const courtParts = [relatedCase?.court, item.courtHall].filter(
    (value) => value && value !== UNAVAILABLE
  );

  return {
    id: item.hearingId,
    caseId: item.caseId,
    caseNumber: relatedCase?.caseNumber ?? UNAVAILABLE,
    client: relatedCase?.client ?? UNAVAILABLE,
    date: formatDate(item.hearingDate),
    dateValue: dateValue(item.hearingDate),
    time: UNAVAILABLE,
    court: courtParts.join(" · ") || UNAVAILABLE,
    purpose: item.purpose ?? UNAVAILABLE,
    status: UNAVAILABLE,
    result: item.result ?? UNAVAILABLE,
    nextHearing: formatDate(item.nextHearingDate),
    notes: item.notes ?? UNAVAILABLE,
    judgment: item.judgment ?? UNAVAILABLE,
    caseData: relatedCase ?? null,
  };
};

export const getLawyerProfile = async () => {
  const meResponse = await apiClient.get("/api/auth/me");
  const me = meResponse.data?.data ?? meResponse.data;
  let advocate = null;

  if (me?.advocateId != null) {
    const advocateResponse = await apiClient.get(`/api/advocates/${me.advocateId}`);
    advocate = advocateResponse.data?.data ?? advocateResponse.data;
  }

  return {
    id: me?.advocateId ?? advocate?.advocateId ?? null,
    name: me?.fullName ?? advocate?.name ?? UNAVAILABLE,
    role: me?.role ?? UNAVAILABLE,
    email: me?.email ?? advocate?.email ?? UNAVAILABLE,
    phone: me?.mobile ?? advocate?.mobile ?? UNAVAILABLE,
    licenseNumber: UNAVAILABLE,
    specialization: UNAVAILABLE,
    experience: UNAVAILABLE,
    profilePhotoPath: me?.profilePhotoPath ?? null,
  };
};

export const getLawyerCases = async () => {
  const response = await apiClient.get("/api/cases/my");
  const data = response.data?.data ?? response.data;
  if (!Array.isArray(data)) throw new Error("Unsupported Lawyer Cases response.");
  return data.map(mapLawyerCase);
};

const getMasterValues = async (path) => {
  const response = await apiClient.get(path);
  const payload = response.data?.data ?? response.data;
  const data = Array.isArray(payload)
    ? payload
    : payload?.items ?? payload?.values ?? payload?.data;
  if (!Array.isArray(data)) throw new Error("Unsupported Master response.");
  return data
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.value ?? item?.name ?? item?.label ?? item?.title ?? null;
    })
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim());
};

export const getLawyerCaseFilterOptions = async () => {
  const [caseTypes, statuses, priorities] = await Promise.all([
    getMasterValues("/api/master/case-types"),
    getMasterValues("/api/master/case-statuses"),
    getMasterValues("/api/master/priorities"),
  ]);

  return { caseTypes, statuses, priorities };
};

export const updateLawyerCase = async (caseId, payload) => {
  if (caseId == null) throw new Error("A valid case ID is required.");
  const response = await apiClient.put(`/api/cases/${Number(caseId)}`, payload);
  const data = response.data?.data ?? response.data;
  return data?.caseId != null ? mapLawyerCase(data) : data;
};

export const updateLawyerCaseStage = async (caseId, value) => {
  if (caseId == null) throw new Error("A valid case ID is required.");
  const response = await apiClient.patch(`/api/cases/${Number(caseId)}/stage`, { value });
  return response.data?.data ?? response.data;
};

export const updateLawyerCaseStatus = async (caseId, value) => {
  if (caseId == null) throw new Error("A valid case ID is required.");
  const response = await apiClient.patch(`/api/cases/${Number(caseId)}/status`, { value });
  return response.data?.data ?? response.data;
};

export const createLawyerPaymentRequest = async (payload) => {
  const response = await apiClient.post("/api/payment-management/requests", payload);
  return response.data?.data ?? response.data;
};

export const uploadLawyerCourtOrder = async ({ caseId, hearingId, orderType, orderDate, remarks, file }) => {
  if (caseId == null || !file?.uri) throw new Error("A case and document file are required.");
  const form = new FormData();
  form.append("CaseId", String(Number(caseId)));
  if (hearingId != null) form.append("HearingId", String(Number(hearingId)));
  if (orderType) form.append("OrderType", orderType);
  if (orderDate) form.append("OrderDate", orderDate);
  if (remarks) form.append("Remarks", remarks);
  form.append("File", { uri: file.uri, name: file.name ?? "court-order", type: file.mimeType ?? "application/octet-stream" });
  const response = await apiClient.post("/api/documents/court-order/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data?.data ?? response.data;
};

export const getLawyerCaseDetail = async (caseId) => {
  const response = await apiClient.get(`/api/cases/${Number(caseId)}/detail`);
  const data = response.data?.data ?? response.data;
  if (!data || data.caseId == null) throw new Error("Unsupported Lawyer Case Detail response.");
  return mapLawyerCase(data);
};

export const getLawyerHearings = async () => {
  const [hearingResponse, cases] = await Promise.all([
    apiClient.get("/api/hearings"),
    getLawyerCases(),
  ]);
  const data = hearingResponse.data?.data ?? hearingResponse.data;
  if (!Array.isArray(data)) throw new Error("Unsupported Lawyer Hearings response.");
  const caseById = new Map(cases.map((item) => [item.id, item]));
  return data.map((item) => mapLawyerHearing(item, caseById));
};

export const getLawyerUpcomingHearings = async () => {
  const [hearingResponse, cases] = await Promise.all([
    apiClient.get("/api/hearings/upcoming"),
    getLawyerCases(),
  ]);
  const data = hearingResponse.data?.data ?? hearingResponse.data;
  if (!Array.isArray(data)) throw new Error("Unsupported Upcoming Hearings response.");
  const caseById = new Map(cases.map((item) => [item.id, item]));
  return data.map((item) => mapLawyerHearing(item, caseById));
};

export const getLawyerDashboard = async () => {
  const [profile, cases, upcomingHearings, documentsResponse] = await Promise.all([
    getLawyerProfile(),
    getLawyerCases(),
    getLawyerUpcomingHearings(),
    apiClient.get("/api/documents"),
  ]);
  const documents = documentsResponse.data?.data ?? documentsResponse.data;
  if (!Array.isArray(documents)) throw new Error("Unsupported Lawyer Documents response.");
  const assignedCaseIds = new Set(cases.map((item) => item.id));
  const assignedDocuments = documents.filter((item) => assignedCaseIds.has(item.caseId));
  const statusCounts = cases.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] ?? 0) + 1;
    return counts;
  }, {});

  return {
    profile,
    cases,
    upcomingHearings,
    assignedDocuments,
    activeCases: cases.filter((item) => item.status.toLowerCase() !== "closed").length,
    statusCounts,
  };
};

export const updateLawyerHearing = async (hearingId, payload) => {
  if (hearingId == null) throw new Error("A valid hearing ID is required.");
  const response = await apiClient.put(
    `/api/hearings/${Number(hearingId)}/advocate-update`,
    payload
  );
  return response.data?.data ?? response.data;
};

export const getLawyerCaseDocuments = async (caseId) => {
  if (caseId == null) return [];
  const response = await apiClient.get(`/api/documents/case/${Number(caseId)}`);
  const data = response.data?.data ?? response.data;
  if (!Array.isArray(data)) throw new Error("Unsupported Case Documents response.");
  return data.map((item) => ({
    id: item.documentId,
    name: item.originalFileName ?? item.documentType ?? UNAVAILABLE,
    type: item.documentType ?? UNAVAILABLE,
    size: UNAVAILABLE,
    remarks: item.remarks ?? UNAVAILABLE,
    uploadedDate: formatDate(item.uploadedDate),
  }));
};

export const downloadLawyerDocument = async (documentId) => {
  if (documentId == null) throw new Error("A valid document ID is required.");
  const token = await getAuthToken();
  if (!token) throw new Error("Authentication is required to download a document.");
  const result = await FileSystem.downloadAsync(
    `${baseURL}/api/documents/${documentId}/download`,
    `${FileSystem.cacheDirectory}lawyer-document-${documentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Document download failed with status ${result.status}.`);
  }
  return result;
};
