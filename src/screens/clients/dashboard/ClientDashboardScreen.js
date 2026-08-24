import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ClientStatCard from "../../../components/clients/dashboard/ClientStatCard";
import CaseStatusChart from "../../../components/clients/dashboard/CaseStatusChart";
import InvoiceStatusChart from "../../../components/clients/dashboard/InvoiceStatusChart";
import LatestCaseSnapshot from "../../../components/clients/dashboard/LatestCaseSnapshot";
import { getClientCases } from "../../../services/api/clientCasesService";
import { getClientHearings } from "../../../services/api/clientHearingsService";
import { getClientInvoices } from "../../../services/api/clientBillingService";
import { getClientUnreadCount } from "../../../services/api/clientNotificationsService";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";

const ClientDashboardScreen = () => {
  const navigation = useNavigation();
  const [cases, setCases] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.allSettled([
      getClientCases({ page: 1, pageSize: 100, search: "", sortBy: "docket", sortOrder: "asc" }),
      getClientHearings(),
      getClientInvoices(),
      getClientUnreadCount(),
    ]).then(([caseResult, hearingResult, invoiceResult, notificationResult]) => {
      const failures = [caseResult, hearingResult, invoiceResult, notificationResult].filter((result) => result.status === "rejected");
      if (caseResult.status === "fulfilled") setCases(caseResult.value.items);
      if (hearingResult.status === "fulfilled") setHearings(hearingResult.value);
      if (invoiceResult.status === "fulfilled") setInvoices(invoiceResult.value.items);
      if (notificationResult.status === "fulfilled") setUnreadNotifications(notificationResult.value);
      if (failures.length) setError("Some dashboard data could not be loaded.");
    }).finally(() => setLoading(false));
  }, []);

  const activeCases = cases.filter((item) => !["CLOSED", "COMPLETED"].includes(String(item.status).toUpperCase()));
  const closedCases = cases.filter((item) => ["CLOSED", "COMPLETED"].includes(String(item.status).toUpperCase()));
  const pendingInvoices = invoices.filter((item) => !["PAID", "SETTLED"].includes(String(item.status).toUpperCase()));
  const paidInvoices = invoices.filter((item) => ["PAID", "SETTLED"].includes(String(item.status).toUpperCase()));
  const latestCase = cases[0] ? { caseNumber: cases[0].docketNo, title: cases[0].caseName, lawyer: cases[0].lawyer, status: cases[0].status, nextHearing: "Not available", payment: "Not available" } : null;
  const caseStatusData = useMemo(() => {
    const counts = cases.reduce((result, item) => { const label = item.status || "Unknown"; result[label] = (result[label] || 0) + 1; return result; }, {});
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }, [cases]);
  const invoiceStatusData = [{ label: "Pending Invoices", value: pendingInvoices.length, color: "#D9AF32" }, { label: "Paid Invoices", value: paidInvoices.length, color: "#20A34A" }];
  const stats = [["TOTAL CASES", cases.length, "blue", "ClientCases"], ["ACTIVE CASES", activeCases.length, "yellow", "ClientCases"], ["CLOSED CASES", closedCases.length, "red", "ClientClosedCases"], ["UPCOMING HEARINGS", hearings.length, "green", "ClientHearingSchedule"], ["PENDING INVOICES", pendingInvoices.length, "yellow", "ClientBilling"], ["PAID INVOICES", paidInvoices.length, "green", "ClientBilling"], ["UNREAD NOTIFICATIONS", unreadNotifications, "blue", "ClientNotifications"]].filter(([, value]) => value != null);

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><View style={styles.heading}><View style={styles.headingRow}><View><Text style={styles.title}>Dashboard</Text><Text style={styles.subtitle}>Overview of your legal matters.</Text></View><SidebarMenuButton role="client" /></View></View>{error ? <Text style={styles.error}>{error}</Text> : null}{loading ? <View style={styles.loading}><ActivityIndicator color="#19324D" /></View> : <><View style={styles.stats}>{stats.map(([label, value, accent, route]) => <ClientStatCard key={label} label={label} value={value} accent={accent} onPress={() => navigation.navigate(route)} />)}</View><View style={styles.charts}><CaseStatusChart data={caseStatusData} /><InvoiceStatusChart data={invoiceStatusData} /></View><LatestCaseSnapshot caseData={latestCase} /></>}</ScrollView>;
};

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: "#D9DEE0" }, content: { padding: 20, paddingBottom: 110, gap: 18 }, heading: { marginTop: 25, marginBottom: 2 }, headingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }, title: { fontSize: 34, lineHeight: 41, fontWeight: "700", color: "#19324D" }, subtitle: { marginTop: 6, fontSize: 15, lineHeight: 21, color: "#60758E" }, stats: { flexDirection: "row", flexWrap: "wrap", gap: 14 }, charts: { flexDirection: "row", flexWrap: "wrap", gap: 16 }, loading: { minHeight: 180, alignItems: "center", justifyContent: "center" }, error: { color: "#A33A32", fontSize: 13 } });
export default ClientDashboardScreen;
