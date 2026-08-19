import apiClient from "./apiClient";

const formatDateTime = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return { date: "Not available", time: "" };
  return {
    date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
};

export const getClientNotifications = async () => {
  const response = await apiClient.get("/api/client-portal/notifications", { params: { Page: 1, PageSize: 100 } });
  const data = response.data?.data;
  if (!data || !Array.isArray(data.items)) throw new Error("Unsupported Client Notifications response.");
  return data.items.map((item) => ({
    id: item.notificationId,
    caseId: item.caseId,
    title: item.title ?? "—",
    message: item.message ?? "—",
    type: item.notificationType ?? "—",
    channel: item.channel ?? "—",
    status: item.isRead ? "Read" : "Unread",
    ...formatDateTime(item.createdDate),
  }));
};

export const getClientUnreadCount = async () => {
  const response = await apiClient.get("/api/client-portal/notifications/unread-count");
  return Number(response.data?.data) || 0;
};

export const markClientNotificationRead = (notificationId) => apiClient.put(
  `/api/client-portal/notifications/${notificationId}/read`
);
