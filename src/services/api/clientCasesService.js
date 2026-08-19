import apiClient from "./apiClient";

const SORT_FIELDS = {
  docket: "caseNumber",
  case: "caseTitle",
  lawyer: "lawyerName",
};

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
};

export const mapClientCase = (item) => ({
  caseId: item.caseId,
  docketNo: displayValue(item.caseNumber),
  caseName: displayValue(item.caseTitle),
  lawyer: displayValue(item.lawyerName),
  status: displayValue(item.caseStatus).toUpperCase(),
});

export const getClientCases = async ({
  page,
  pageSize,
  search,
  sortBy,
  sortOrder,
}) => {
  const response = await apiClient.get("/api/client-portal/cases", {
    params: {
      Page: page,
      PageSize: pageSize,
      Search: search || undefined,
      SortBy: SORT_FIELDS[sortBy] ?? SORT_FIELDS.docket,
      SortDirection: sortOrder,
    },
  });
  const payload = response.data;
  const data = payload?.data;

  if (!data || !Array.isArray(data.items)) {
    throw new Error("The Client Cases response has an unsupported structure.");
  }

  return {
    items: data.items.map(mapClientCase),
    total: Number(data.total) || 0,
    page: Number(data.page) || page,
    pageSize: Number(data.pageSize) || pageSize,
  };
};

const formatDate = (value) => {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const mapClientCaseDetails = (item) => ({
  caseId: item.caseId,
  caseNumber: displayValue(item.caseNumber),
  caseTitle: displayValue(item.caseTitle),
  caseType: displayValue(item.caseType),
  status: displayValue(item.caseStatus),
  stage: displayValue(item.caseStage),
  priority: displayValue(item.priority),
  filingDate: formatDate(item.filingDate),
  nextHearingDate: formatDate(item.nextHearingDate),
  lawyerName: displayValue(item.lawyerName),
  lawyerMobile: displayValue(item.lawyerMobile),
  courtName: displayValue(item.courtName),
  judgeName: displayValue(item.judgeName),
  timeline: Array.isArray(item.timeline) ? item.timeline.map((event, index) => ({
    id: `${event.type ?? "event"}-${event.date ?? index}-${index}`,
    date: formatDate(event.date),
    title: displayValue(event.title),
    description: displayValue(event.description),
    type: displayValue(event.type),
    timestamp: event.date ? new Date(event.date).getTime() || 0 : 0,
  })) : [],
  hearings: Array.isArray(item.hearings) ? item.hearings : [],
  documents: Array.isArray(item.documents) ? item.documents : [],
  invoices: Array.isArray(item.invoices) ? item.invoices : [],
  payments: Array.isArray(item.payments) ? item.payments : [],
});

export const getClientCaseDetails = async (caseId) => {
  if (!Number.isInteger(Number(caseId)) || Number(caseId) <= 0) {
    throw new Error("A valid case ID is required.");
  }

  const response = await apiClient.get(`/api/client-portal/cases/${Number(caseId)}`);
  const item = response.data?.data;

  if (!item || item.caseId === undefined || item.caseId === null) {
    throw new Error("The Client Case Details response has an unsupported structure.");
  }

  return mapClientCaseDetails(item);
};

export const getClientTimelineCases = async () => {
  const list = await getClientCases({
    page: 1,
    pageSize: 100,
    search: "",
    sortBy: "docket",
    sortOrder: "asc",
  });
  const details = await Promise.all(list.items.map((item) => getClientCaseDetails(item.caseId)));

  return details.map((item) => {
    const orderedEvents = [...item.timeline].sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return {
      caseId: item.caseId,
      docketNo: item.caseNumber,
      caseName: item.caseTitle,
      lawyer: item.lawyerName,
      latestStatus: item.status,
      latestEvent: orderedEvents[0]?.title ?? "No activity available",
      nextHearing: item.nextHearingDate,
      payment: item.payments.length ? `${item.payments.length} payment recorded` : "No payment recorded",
      filingDate: item.filingDate,
    };
  });
};
