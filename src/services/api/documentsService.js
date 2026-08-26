import * as FileSystem from "expo-file-system/legacy";
import { Linking } from "react-native";
import apiClient from "./apiClient";
import { getAuthToken } from "../storage/authStorage";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://16.16.216.155:5000";
const unwrap = (value) => value?.data ?? value;
const list = (value) => { const data = unwrap(value); return Array.isArray(data) ? data : data?.items ?? data?.data ?? []; };
const date = (value) => { const parsed = value ? new Date(value) : null; return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null; };

export const normalizeDocument = (item) => ({
  id: item?.documentId ?? item?.id,
  name: item?.originalFileName ?? item?.fileName ?? item?.filePath?.split("/").pop() ?? null,
  type: item?.documentType ?? null,
  uploadedDate: date(item?.uploadedDate ?? item?.createdDate),
  status: item?.status ?? null,
  version: item?.version ?? null,
  caseNumber: item?.caseNumber ?? null,
  raw: item,
});

export const getDocuments = async () => list((await apiClient.get("/api/documents")).data).map(normalizeDocument);
const requireId = (documentId) => { const id = Number(documentId); if (!Number.isInteger(id) || id <= 0) throw new Error("The document response did not contain a valid document ID."); return id; };
export const getDocumentById = async (documentId) => { const id = requireId(documentId); return normalizeDocument(unwrap((await apiClient.get(`/api/documents/${id}`)).data)); };
export const uploadDocument = async ({ caseId, documentType, file }) => {
  const form = new FormData();
  form.append("caseId", String(Number(caseId)));
  form.append("documentType", documentType);
  form.append("file", { uri: file.uri, name: file.name, type: file.mimeType || "application/octet-stream" });
  return unwrap((await apiClient.post("/api/documents/upload", form)).data);
};
export const downloadDocument = async (documentId) => {
  const id = requireId(documentId);
  const token = await getAuthToken();
  if (!token) throw new Error("Authentication is required to download a document.");
  const result = await FileSystem.downloadAsync(`${baseURL}/api/documents/${id}/download`, `${FileSystem.documentDirectory}document-${id}`, { headers: { Authorization: `Bearer ${token}` } });
  if (result.status < 200 || result.status >= 300) throw new Error(`Document download failed with status ${result.status}.`);
  return result;
};
export const openDocument = async (documentId) => { const result = await downloadDocument(documentId); if (!(await Linking.canOpenURL(result.uri))) throw new Error("No installed application can open this document."); await Linking.openURL(result.uri); return result; };
