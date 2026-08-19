import * as FileSystem from "expo-file-system/legacy";
import apiClient from "./apiClient";
import { getAuthToken } from "../storage/authStorage";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://16.16.216.155:5000";
const UNAVAILABLE = "Unavailable";

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

const asAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const getPagedData = (response, resourceName) => {
  const data = response.data?.data;
  if (!data || !Array.isArray(data.items)) {
    throw new Error(`Unsupported ${resourceName} response.`);
  }
  return data;
};

const mapInvoice = (item) => ({
  id: item.invoiceId,
  invoiceNo: item.invoiceNumber ?? UNAVAILABLE,
  caseNo: item.case?.caseNumber ?? UNAVAILABLE,
  description: item.notes ?? UNAVAILABLE,
  issuedDate: formatDate(item.invoiceDate),
  dueDate: formatDate(item.dueDate),
  amount: asAmount(item.totalAmount),
  paidAmount: asAmount(item.paidAmount),
  outstandingAmount: asAmount(item.outstandingAmount),
  status: item.status ?? UNAVAILABLE,
});

const mapPayment = (item) => ({
  id: item.paymentId,
  invoiceNo: item.invoice?.invoiceNumber ?? (
    item.invoiceId == null ? UNAVAILABLE : String(item.invoiceId)
  ),
  caseNo: item.case?.caseNumber ?? UNAVAILABLE,
  date: formatDate(item.paymentDate),
  amount: asAmount(item.amount),
  method: item.paymentMode ?? UNAVAILABLE,
  status: UNAVAILABLE,
  receiptPath: item.receiptPath ?? null,
});

const pageResult = (data, mapper) => ({
  items: data.items.map(mapper),
  total: asAmount(data.total),
  page: asAmount(data.page),
  pageSize: asAmount(data.pageSize),
  totalPages: asAmount(data.totalPages),
});

export const getClientInvoices = async (params = {}) => {
  const response = await apiClient.get("/api/client-portal/billing/invoices", {
    params: { Page: 1, PageSize: 100, ...params },
  });
  return pageResult(getPagedData(response, "Client Invoices"), mapInvoice);
};

export const getClientPayments = async (params = {}) => {
  const response = await apiClient.get("/api/client-portal/billing/payments", {
    params: { Page: 1, PageSize: 100, ...params },
  });
  return pageResult(getPagedData(response, "Client Payments"), mapPayment);
};

export const downloadClientInvoice = async (invoiceId) => {
  if (invoiceId == null) throw new Error("A valid invoice ID is required.");

  const token = await getAuthToken();
  if (!token) throw new Error("Authentication is required to download an invoice.");

  const result = await FileSystem.downloadAsync(
    `${baseURL}/api/client-portal/billing/invoices/${invoiceId}/download`,
    `${FileSystem.cacheDirectory}invoice-${invoiceId}.pdf`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Invoice download failed with status ${result.status}.`);
  }

  return result;
};

export const createClientPayment = (payload) => apiClient.post(
  "/api/client-portal/billing/payments",
  payload
);
