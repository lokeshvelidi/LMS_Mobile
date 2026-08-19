import React, {
  useMemo,
  useState,
} from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import ReportSummaryCard from "../../../components/admin/reports/ReportSummaryCard";
import ReportBarChart from "../../../components/admin/reports/ReportBarChart";
import ReportLegend from "../../../components/admin/reports/ReportLegend";
import ReportFilter from "../../../components/admin/reports/ReportFilter";
import { getAdminReport, getAdminCaseStatusCounts } from "../../../services/api/adminReportsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
  gold: "#E5B93F",
  blue: "#547DA8",
  green: "#3D9B68",
  red: "#D9534F",
};

/* Legacy report fixtures retained only as inactive reference. */
const REPORT_DATA = {
  "This Month": {
    clients: 13,
    cases: 10,
    hearings: 8,
    payments: "₹17,700",
    casesByMonth: [
      {
        label: "Week 1",
        value: 2,
      },
      {
        label: "Week 2",
        value: 4,
      },
      {
        label: "Week 3",
        value: 3,
      },
      {
        label: "Week 4",
        value: 1,
      },
    ],
  },

  "Last Month": {
    clients: 11,
    cases: 8,
    hearings: 6,
    payments: "₹14,500",
    casesByMonth: [
      {
        label: "Week 1",
        value: 1,
      },
      {
        label: "Week 2",
        value: 2,
      },
      {
        label: "Week 3",
        value: 3,
      },
      {
        label: "Week 4",
        value: 2,
      },
    ],
  },

  "Last 3 Months": {
    clients: 31,
    cases: 24,
    hearings: 19,
    payments: "₹42,800",
    casesByMonth: [
      {
        label: "Apr",
        value: 7,
      },
      {
        label: "May",
        value: 9,
      },
      {
        label: "Jun",
        value: 8,
      },
    ],
  },

  "This Year": {
    clients: 87,
    cases: 63,
    hearings: 52,
    payments: "₹1.28L",
    casesByMonth: [
      {
        label: "Q1",
        value: 16,
      },
      {
        label: "Q2",
        value: 21,
      },
      {
        label: "Q3",
        value: 15,
      },
      {
        label: "Q4",
        value: 11,
      },
    ],
  },
};

const ReportsScreen = () => {
  const [apiReports, setApiReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  React.useEffect(() => { Promise.all([getAdminReport("clients"), getAdminReport("cases"), getAdminReport("hearings"), getAdminReport("payments"), getAdminCaseStatusCounts()]).then(([clients,cases,hearings,payments,status]) => setApiReports({ clients, cases, hearings, payments, status })).catch((error) => setLoadError(error.response?.data?.message || "Unable to load reports.")).finally(() => setLoading(false)); }, []);
  const [filterVisible, setFilterVisible] =
    useState(false);

  const [period, setPeriod] =
    useState("This Month");

  const [reportType, setReportType] =
    useState("Overview");

  const unwrapRows = (value) => { const payload = value?.data ?? value; return Array.isArray(payload) ? payload : payload?.items ?? payload?.data ?? []; };
  const count = (value) => Array.isArray(value) ? value.length : value?.total ?? value?.count ?? value?.totalCount ?? null;
  const report = { clients: count(apiReports?.clients), cases: count(apiReports?.cases), hearings: count(apiReports?.hearings), payments: apiReports?.payments?.total ?? apiReports?.payments?.amount ?? null, casesByMonth: [] };

  const caseRows = unwrapRows(apiReports?.cases);
  const caseActivityData = useMemo(() => {
    const groups = new Map();
    caseRows.forEach((item) => { if (!item?.filingDate) return; const label = new Date(item.filingDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }); groups.set(label, (groups.get(label) || 0) + 1); });
    return Array.from(groups, ([label, value]) => ({ label, value }));
  }, [apiReports]);
  const caseStatusData = useMemo(() => {
    const statusRows = unwrapRows(apiReports?.status);
    const explicit = statusRows.filter((item) => item?.status != null && item?.count != null).map((item) => ({ label: item.status, value: Number(item.count) }));
    if (explicit.length) return explicit;
    const groups = new Map();
    caseRows.forEach((item) => { if (item?.caseStatus == null) return; groups.set(item.caseStatus, (groups.get(item.caseStatus) || 0) + 1); });
    return Array.from(groups, ([label, value]) => ({ label, value }));
  }, [apiReports]);
  const caseTypeData = useMemo(() => {
    const groups = new Map();
    caseRows.forEach((item) => { if (item?.caseType == null) return; groups.set(item.caseType, (groups.get(item.caseType) || 0) + 1); });
    return Array.from(groups, ([label, value]) => ({ label, value }));
  }, [apiReports]);

  const clearFilters = () => {
    setPeriod("This Month");
    setReportType("Overview");
  };

  return (
    <AppScreen>
      {loadError ? <View style={{ padding: 18 }}><AppText color="textSecondary">{loadError}</AppText></View> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <AppHeader
          title="Reports"
          subtitle="View performance and case statistics."
          showNotification={false}
        />

        <View style={styles.content}>
          <View style={styles.toolbar}>
            <View style={styles.periodContainer}>
              <AppText
                size="xs"
                color="textSecondary"
              >
                Period
              </AppText>

              <AppText
                size="sm"
                weight="semiBold"
                style={styles.period}
              >
                {period}
              </AppText>
            </View>

            <Pressable
              onPress={() =>
                setFilterVisible(true)
              }
              style={styles.filterButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
              >
                Filter
              </AppText>
            </Pressable>
          </View>

          <View style={styles.summaryGrid}>
            <ReportSummaryCard
              title="Total Clients"
              value={report.clients}
              subtitle="Registered"
              icon="C"
            />

            <ReportSummaryCard
              title="Total Cases"
              value={report.cases}
              subtitle="Recorded"
              icon="⚖"
            />

            <ReportSummaryCard
              title="Hearings"
              value={report.hearings}
              subtitle="Scheduled"
              icon="H"
            />

            <ReportSummaryCard
              title="Payments"
              value={report.payments}
              subtitle="Collected"
              icon="₹"
            />
          </View>

          <ReportBarChart
            title="Case Activity"
            subtitle={`Case activity for ${period.toLowerCase()}`}
            data={caseActivityData}
          />

          <ReportLegend
            title="Case Status"
            data={caseStatusData}
          />

          <ReportBarChart
            title="Cases by Type"
            subtitle="Distribution of registered cases"
            data={caseTypeData}
          />

          <View style={styles.bottomCard}>
            <AppText
              size="lg"
              weight="bold"
            >
              Report Information
            </AppText>

            <InfoRow
              label="Selected Period"
              value={period}
            />

            <InfoRow
              label="Report Type"
              value={reportType}
            />

            <InfoRow
              label="Total Cases"
              value={String(report.cases)}
            />

            <InfoRow
              label="Total Hearings"
              value={String(report.hearings)}
            />

            <InfoRow
              label="Payment Amount"
              value={report.payments}
              last
            />
          </View>
        </View>
      </ScrollView>

      <ReportFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        period={period}
        reportType={reportType}
        onPeriodChange={setPeriod}
        onReportTypeChange={
          setReportType
        }
        onClear={clearFilters}
      />
    </AppScreen>
  );
};

const InfoRow = ({
  label,
  value,
  last = false,
}) => (
  <View
    style={[
      styles.infoRow,
      !last && styles.divider,
    ]}
  >
    <AppText
      size="sm"
      color="textSecondary"
    >
      {label}
    </AppText>

    <AppText
      size="sm"
      weight="semiBold"
      style={styles.infoValue}
    >
      {value}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 35,
    backgroundColor:
      COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  periodContainer: {
    flex: 1,
  },

  period: {
    marginTop: 2,
  },

  filterButton: {
    height: 44,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  bottomCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
  },

  infoRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  infoValue: {
    maxWidth: "55%",
    textAlign: "right",
  },
});

export default ReportsScreen;
