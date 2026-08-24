import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";
import AppText from "../../../components/common/AppText";
import ReportSummaryCard from "../../../components/admin/reports/ReportSummaryCard";
import ReportBarChart from "../../../components/admin/reports/ReportBarChart";
import ReportLegend from "../../../components/admin/reports/ReportLegend";
import { getAdminReport, getAdminCaseStatusCounts } from "../../../services/api/adminReportsService";

const COLORS = { background: "#F5F2EA", navy: "#102A43", white: "#FFFDF8", secondary: "#61758A", border: "#DED9CE", gold: "#E5B93F" };
const CATEGORIES = ["Cases", "Hearings", "Payments", "Fee Summary"];
const ENDPOINTS = { Cases: "cases", Hearings: "hearings", Payments: "payments", "Fee Summary": "fee-summary" };
const rowsOf = (value) => { const payload = value?.data ?? value; const result = payload?.result ?? payload; return Array.isArray(result) ? result : result?.items ?? result?.data ?? result?.values ?? []; };
const totalOf = (value, rows) => { const payload = value?.data ?? value; const result = payload?.result ?? payload; return result?.totalCount ?? result?.total ?? result?.count ?? rows.length; };
const display = (value) => value == null || value === "" || typeof value === "object" ? "Not available" : String(value);
const dateText = (value) => { if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(value)) return null; const parsed = new Date(value); return Number.isNaN(parsed.getTime()) ? null : parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); };

const ReportsScreen = () => {
  const [category, setCategory] = useState("Cases");
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [sortInput, setSortInput] = useState("Newest first");
  const [pageSize, setPageSize] = useState(25);
  const [filterVisible, setFilterVisible] = useState(false);
  const [workspaceVisible, setWorkspaceVisible] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [filters, setFilters] = useState({ search: "", from: "", to: "", sort: "Newest first" });
  const [page, setPage] = useState(1);
  const [statusCounts, setStatusCounts] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const entries = await Promise.all(CATEGORIES.map(async (name) => {
      try { const response = await getAdminReport(ENDPOINTS[name]); const rows = rowsOf(response); return [name, { rows, total: totalOf(response, rows) }]; }
      catch (error) { return [name, { error: error.response?.data?.message || "Unable to load this report." }]; }
    }));
    setReports(Object.fromEntries(entries));
    try { setStatusCounts(await getAdminCaseStatusCounts()); } catch { setStatusCounts(null); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const rows = reports[category]?.rows || [];
  const filteredRows = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const result = rows.filter((row) => {
      if (search && !Object.values(row).some((value) => typeof value !== "object" && String(value ?? "").toLowerCase().includes(search))) return false;
      const rawDate = row.filingDate || row.hearingDate || row.createdAt || row.paymentDate || row.date;
      if (filters.from && (!rawDate || new Date(rawDate) < new Date(filters.from))) return false;
      if (filters.to && (!rawDate || new Date(rawDate) > new Date(`${filters.to}T23:59:59`))) return false;
      return true;
    });
    const timestamp = (row) => new Date(row.filingDate || row.hearingDate || row.createdAt || row.paymentDate || row.date || 0).getTime();
    return result.sort((a, b) => filters.sort === "Oldest first" ? timestamp(a) - timestamp(b) : timestamp(b) - timestamp(a));
  }, [rows, filters]);
  const pageRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const columns = useMemo(() => {
    if (category === "Cases") return [["caseNumber", "Case Number"], ["filingDate", "Filing Date"], ["caseType", "Case Type"], ["clientName", "Client"], ["petitioner", "Petitioner"], ["respondent", "Respondent"], ["caseStatus", "Status"], ["priority", "Priority"], ["nextHearingDate", "Next Hearing"]];
    if (category === "Hearings") return [["hearingId", "Hearing ID"], ["hearingDate", "Hearing Date"], ["purpose", "Purpose"], ["caseNumber", "Case Number"], ["courtHall", "Court/Hall"], ["status", "Status"]];
    const keys = [...new Set(rows.slice(0, 25).flatMap((row) => Object.keys(row).filter((key) => typeof row[key] !== "object")))].slice(0, 7);
    return keys.map((key) => [key, key.replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase())]);
  }, [category, rows]);
  const statusData = useMemo(() => rowsOf(statusCounts).filter((x) => x?.status != null && x?.count != null).map((x) => ({ label: x.status, value: Number(x.count) })), [statusCounts]);
  const typeData = useMemo(() => { const map = new Map(); rows.forEach((x) => x.caseType != null && map.set(x.caseType, (map.get(x.caseType) || 0) + 1)); return [...map].map(([label, value]) => ({ label, value })); }, [rows]);
  const activityData = useMemo(() => { const map = new Map(); rows.forEach((x) => { if (!x.filingDate) return; const label = new Date(x.filingDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }); map.set(label, (map.get(label) || 0) + 1); }); return [...map].map(([label, value]) => ({ label, value })); }, [rows]);
  const apply = () => { setFilters({ search: searchInput, from: fromInput, to: toInput, sort: sortInput }); setPage(1); };
  const clear = () => { setSearchInput(""); setFromInput(""); setToInput(""); setSortInput("Newest first"); setFilters({ search: "", from: "", to: "", sort: "Newest first" }); setPage(1); };
  const totalRecords = reports[category]?.total ?? rows.length;
  const columnsSummary = category === "Cases" ? [["Total Records", totalRecords, "Backend total", "C"], ["Open Cases", rows.filter((x) => String(x.caseStatus || "").toLowerCase() === "open").length, "From loaded records", "O"]] : [["Total Records", totalRecords, "Backend total", "#"]];
  const error = reports[category]?.error;

  return <AppScreen><ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}><AppHeader title="Reports" subtitle="Report Center · Review API-backed records and analytics." showNotification={false} rightElement={<SidebarMenuButton role="admin" />} /><View style={styles.content}>
    <View style={styles.headerRow}><View><AppText size="xs" color="textSecondary">REPORT CENTER</AppText><AppText size="xl" weight="bold">Reports workspace</AppText></View><Pressable onPress={() => setExportVisible(true)} style={styles.filterButton}><AppText weight="semiBold" style={styles.buttonText}>Export ▼</AppText></Pressable></View>
    <AppText size="xs" color="textSecondary" style={styles.note}>Export is unavailable because no confirmed report download endpoint or utility exists.</AppText>
    <View style={styles.workspaceRow}><View><AppText size="xs" color="textSecondary">WORKSPACE</AppText><Pressable onPress={() => setWorkspaceVisible(true)} style={styles.workspaceButton}><AppText weight="semiBold">{category}</AppText><AppText color="textSecondary">▼</AppText></Pressable></View><Pressable onPress={() => setFilterVisible(true)} style={styles.filterButton}><AppText weight="semiBold" style={styles.buttonText}>Filters</AppText></Pressable></View>
    {loading ? <View style={styles.state}><ActivityIndicator color={COLORS.navy} /><AppText color="textSecondary">Loading reports...</AppText></View> : error ? <View style={styles.state}><AppText color="textSecondary">{error}</AppText><Pressable onPress={load} style={styles.primaryButton}><AppText style={styles.buttonText}>Retry</AppText></Pressable></View> : <>
      <View style={styles.summaryGrid}>{columnsSummary.map(([title, value, subtitle, icon]) => <ReportSummaryCard key={title} title={title} value={value} subtitle={subtitle} icon={icon} />)}</View>
      {filterVisible ? <View style={styles.filterCard}><View style={styles.filterHeader}><AppText size="lg" weight="bold">Search and filters</AppText><Pressable onPress={() => setFilterVisible(false)}><AppText color="textSecondary">Close</AppText></Pressable></View><TextInput value={searchInput} onChangeText={setSearchInput} placeholder="Search loaded records" style={styles.input} /><View style={styles.inputRow}><TextInput value={fromInput} onChangeText={setFromInput} placeholder="From YYYY-MM-DD" style={styles.smallInput} /><TextInput value={toInput} onChangeText={setToInput} placeholder="To YYYY-MM-DD" style={styles.smallInput} /></View><View style={styles.inputRow}><TextInput value={sortInput} onChangeText={setSortInput} placeholder="Newest first / Oldest first" style={styles.smallInput} /><TextInput value={String(pageSize)} onChangeText={(value) => setPageSize(Math.max(1, Number(value.replace(/[^0-9]/g, "")) || 25))} keyboardType="numeric" placeholder="Rows" style={styles.smallInput} /></View><View style={styles.buttonRow}><Pressable onPress={clear} style={styles.clearButton}><AppText weight="semiBold">Clear</AppText></Pressable><Pressable onPress={() => { apply(); setFilterVisible(false); }} style={styles.primaryButton}><AppText style={styles.buttonText}>Apply</AppText></Pressable></View></View> : null}
      <View style={styles.tableCard}><AppText size="lg" weight="bold">{category}</AppText><AppText size="sm" color="textSecondary">{filteredRows.length} matching records · {rows.length} loaded</AppText>{filteredRows.length === 0 ? <AppText color="textSecondary" style={styles.empty}>No records returned for this report.</AppText> : <ScrollView horizontal><View><View style={styles.tableRow}>{columns.map(([key, label]) => <AppText key={key} weight="semiBold" style={styles.cellHeader}>{label}</AppText>)}</View>{pageRows.map((row, index) => <View key={String(row.caseId ?? row.hearingId ?? row.paymentId ?? row.feeId ?? index)} style={styles.tableRow}>{columns.map(([key]) => <AppText key={key} size="xs" style={styles.cell}>{display(dateText(row[key]) || row[key])}</AppText>)}</View>)}</View></ScrollView>}<View style={styles.pagination}><Pressable disabled={page <= 1} onPress={() => setPage(page - 1)}><AppText color="textSecondary">Previous</AppText></Pressable><AppText size="sm">Page {page} of {totalPages}</AppText><Pressable disabled={page >= totalPages} onPress={() => setPage(page + 1)}><AppText color="textSecondary">Next</AppText></Pressable></View></View>
      {category === "Cases" ? <><ReportBarChart title="Case Activity" subtitle="Filing activity from API records" data={activityData} /><ReportLegend title="Case Status" data={statusData} /><ReportBarChart title="Cases by Type" subtitle="Case type values from API records" data={typeData} /></> : null}
    </>}
  </View></ScrollView><Modal visible={workspaceVisible || exportVisible} transparent animationType="fade" onRequestClose={() => { setWorkspaceVisible(false); setExportVisible(false); }}><Pressable style={styles.modalOverlay} onPress={() => { setWorkspaceVisible(false); setExportVisible(false); }}><View style={styles.workspaceMenu}><AppText size="lg" weight="bold">{exportVisible ? "Export" : "Report workspace"}</AppText>{(exportVisible ? ["Cases Excel", "Cases CSV", "Hearings Excel", "Payments Excel", "Fees Excel"] : CATEGORIES).map((name) => <Pressable key={name} disabled={exportVisible} onPress={() => { setCategory(name); setPage(1); setWorkspaceVisible(false); }} style={styles.menuOption}><AppText weight="semiBold" color={exportVisible ? "textSecondary" : undefined}>{name}</AppText>{!exportVisible ? <AppText size="sm" color="textSecondary">{reports[name]?.total ?? reports[name]?.rows?.length ?? "—"}</AppText> : <AppText size="xs" color="textSecondary">Unavailable</AppText>}</Pressable>)}</View></Pressable></Modal></AppScreen>;
};

const styles = StyleSheet.create({ container: { paddingBottom: 35, backgroundColor: COLORS.background }, content: { paddingHorizontal: 18 }, headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }, exportRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "55%" }, disabledExport: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 8, marginLeft: 5, marginBottom: 5, backgroundColor: "#EFECE5" }, note: { marginBottom: 12 }, workspaceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }, workspaceButton: { minWidth: 180, height: 44, marginTop: 5, paddingHorizontal: 12, borderWidth: 1, borderColor: COLORS.border, borderRadius: 11, backgroundColor: COLORS.white, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, filterButton: { height: 44, paddingHorizontal: 18, borderRadius: 11, backgroundColor: COLORS.navy, alignItems: "center", justifyContent: "center" }, summaryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }, filterCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 16, marginBottom: 14 }, filterHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, input: { height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 11, paddingHorizontal: 12, marginTop: 12 }, inputRow: { flexDirection: "row", gap: 8, marginTop: 8 }, smallInput: { flex: 1, height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 11, paddingHorizontal: 10 }, buttonRow: { flexDirection: "row", marginTop: 12 }, clearButton: { flex: 1, height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 11, alignItems: "center", justifyContent: "center", marginRight: 5 }, primaryButton: { backgroundColor: COLORS.navy, borderRadius: 11, paddingHorizontal: 16, minHeight: 44, alignItems: "center", justifyContent: "center", marginLeft: 5 }, buttonText: { color: COLORS.white }, tableCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 16, marginBottom: 14 }, tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: COLORS.border, minHeight: 48, alignItems: "center" }, cellHeader: { width: 125, paddingHorizontal: 8, color: COLORS.navy }, cell: { width: 125, paddingHorizontal: 8 }, pagination: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 }, state: { alignItems: "center", padding: 30 }, empty: { paddingVertical: 24 }, modalOverlay: { flex: 1, backgroundColor: "rgba(7,29,43,0.35)", justifyContent: "center", padding: 24 }, workspaceMenu: { backgroundColor: COLORS.background, borderRadius: 18, padding: 16 }, menuOption: { minHeight: 46, paddingHorizontal: 12, borderRadius: 11, flexDirection: "row", alignItems: "center", justifyContent: "space-between" } });
export default ReportsScreen;
