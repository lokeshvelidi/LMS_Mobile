import * as FileSystem from "expo-file-system/legacy";
import apiClient from "./apiClient";
import { getAuthToken } from "../storage/authStorage";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://16.16.216.155:5000";
const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  return !date || Number.isNaN(date.getTime()) ? "Not available" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export const mapClientDocument = (item) => ({
  id: item.documentId,
  caseId: item.caseId,
  name: item.filePath?.split("/").pop() || item.documentType || "Document",
  caseNo: item.caseNumber ?? "—",
  type: item.documentType ?? "—",
  uploaded: formatDate(item.uploadedDate),
  size: "—",
  status: item.status ?? "—",
  version: item.version,
});

export const getClientDocuments = async () => {
  const response = await apiClient.get("/api/client-portal/documents");
  if (!Array.isArray(response.data?.data)) throw new Error("Unsupported Client Documents response.");
  return response.data.data.map(mapClientDocument);
};

export const uploadClientDocument = async ({ caseId, documentType, remarks, file }) => {
  const form = new FormData();
  form.append("CaseId", String(caseId));
  form.append("DocumentType", documentType);
  form.append("Remarks", remarks || "");
  form.append("File", { uri: file.uri, name: file.name, type: file.mimeType || "application/octet-stream" });
  const response = await apiClient.post("/api/client-portal/documents/upload", form);
  return response.data;
};

const downloadAuthenticated = async (path, fileName) => {
  const token = await getAuthToken();
  const destination = `${FileSystem.cacheDirectory}${fileName}`;
  return FileSystem.downloadAsync(`${baseURL}${path}`, destination, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const downloadClientDocument = (documentId) => downloadAuthenticated(
  `/api/client-portal/documents/${documentId}/download`,
  `document-${documentId}`
);

export const deleteClientDocument = (documentId) => apiClient.delete(
  `/api/client-portal/documents/${documentId}`
);
