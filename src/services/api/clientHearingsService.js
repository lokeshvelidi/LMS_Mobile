import apiClient from "./apiClient";

const formatDateParts = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return { date: "Not available", time: "Not provided", timestamp: null };
  }
  return {
    date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: date.getHours() || date.getMinutes()
      ? date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      : "Not provided",
    timestamp: date.getTime(),
  };
};

export const getClientHearings = async () => {
  const response = await apiClient.get("/api/client-portal/hearings", {
    params: { Page: 1, PageSize: 100 },
  });
  const data = response.data?.data;
  if (!data || !Array.isArray(data.items)) throw new Error("Unsupported Client Hearings response.");
  return data.items.map((item) => {
    const formatted = formatDateParts(item.hearingDate);
    return {
      id: item.hearingId,
      caseId: item.caseId,
      docketNo: item.caseNumber ?? "—",
      caseName: "—",
      lawyer: "—",
      court: "—",
      courtroom: item.courtHall ?? "—",
      purpose: item.purpose ?? "—",
      result: item.result ?? "—",
      status: item.status ?? "—",
      ...formatted,
    };
  });
};
