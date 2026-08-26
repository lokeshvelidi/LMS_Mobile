import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import AdminStatCard from "../../../components/admin/dashboard/AdminStatCard";
import CaseStatusCard from "../../../components/admin/dashboard/CaseStatusCard";
import TopAdvocatesCard from "../../../components/admin/dashboard/TopAdvocatesCard";
import UpcomingHearingCard from "../../../components/admin/dashboard/UpcomingHearingCard";
import { getAdminDashboard } from "../../../services/api/adminService";
import { getAdminUpcomingHearings } from "../../../services/api/adminHearingsService";
import { getAdminReport } from "../../../services/api/adminReportsService";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  secondary: "#61758A",
  gold: "#E5B93F",
  blue: "#547DA8",
  green: "#3D9B68",
  red: "#D9534F",
};

const AdminDashboardScreen = ({
  navigation,
}) => {
  const [dashboard, setDashboard] = useState(null);
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  const [caseTypeCounts, setCaseTypeCounts] = useState(null);
  useEffect(() => { getAdminDashboard().then(setDashboard).catch(() => setDashboard(null)); getAdminUpcomingHearings().then(setUpcomingHearings).catch(() => setUpcomingHearings([])); getAdminReport("cases").then((response) => { const payload = response?.result ?? response; const rows = Array.isArray(payload) ? payload : payload?.items ?? payload?.data ?? []; const counts = rows.reduce((result, item) => { const type = String(item?.caseType || "").trim().toLowerCase(); if (type === "civil" || type === "criminal") result[type] += 1; return result; }, { civil: 0, criminal: 0 }); setCaseTypeCounts(counts); }).catch(() => setCaseTypeCounts(null)); }, []);
  const summary = dashboard?.summary && typeof dashboard.summary === "object" ? dashboard.summary : {};
  const caseTypeValue = (type) => caseTypeCounts ? String(caseTypeCounts[type]) : "—";
  const value = (...keys) => { const key = keys.find((item) => summary[item] != null); return key ? String(summary[key]) : "—"; };
  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        {/* Header */}
        <AppHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening today."
          compact
          rightElement={<SidebarMenuButton role="admin" />}
        />

        {/* Statistics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText
              size="lg"
              weight="bold"
            >
              Overview
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
            >
              Current status
            </AppText>
          </View>

          <View style={styles.statsGrid}>
            <AdminStatCard
              title="Total Clients"
              value={value("totalClients", "clientsCount")}
              icon="people-outline"
              accent={COLORS.blue}
              description="Registered clients"
              onPress={() => navigation.navigate("Clients")}
            />

            <AdminStatCard
              title="Civil Cases"
              value={caseTypeValue("civil")}
              icon="briefcase-outline"
              accent={COLORS.gold}
              description="Active civil cases"
              onPress={() => navigation.navigate("Cases")}
            />

            <AdminStatCard
              title="Criminal Cases"
              value={caseTypeValue("criminal")}
              icon="shield-checkmark-outline"
              accent={COLORS.red}
              description="Active criminal cases"
              onPress={() => navigation.navigate("Cases")}
            />

            <AdminStatCard
              title="Today's Hearings"
              value={value("todayHearings", "todaysHearings")}
              icon="calendar-outline"
              accent={COLORS.green}
              description="Scheduled today"
              onPress={() => navigation.navigate("Hearings")}
            />

            <AdminStatCard
              title="Pending Cases"
              value={value("pendingCases", "pendingCaseCount")}
              icon="time-outline"
              accent={COLORS.gold}
              description="Awaiting action"
              onPress={() => navigation.navigate("Cases")}
            />

            <AdminStatCard
              title="Closed Cases"
              value={value("closedCases", "closedCaseCount")}
              icon="checkmark-circle-outline"
              accent={COLORS.green}
              description="Successfully closed"
              onPress={() => navigation.navigate("Cases")}
            />

            <AdminStatCard
              title="Upcoming Hearings"
              value={value("upcomingHearings", "upcomingHearingCount")}
              icon="calendar-number-outline"
              accent={COLORS.blue}
              description="Upcoming schedule"
              onPress={() => navigation.navigate("Hearings")}
            />

            <AdminStatCard
              title="Pending Payments"
              value={value("pendingPayments", "pendingPaymentAmount")}
              icon="card-outline"
              accent={COLORS.red}
              description="Outstanding amount"
              onPress={() => navigation.navigate("Reports")}
            />
          </View>
        </View>

        {/* Case Status */}
        <View style={styles.section}>
            <CaseStatusCard data={dashboard?.statusSeries || []} />
        </View>

        {/* Top Advocates */}
        <View style={styles.section}>
            <TopAdvocatesCard data={dashboard?.advocateSeries || []} />
        </View>

        {/* Upcoming Hearings */}
        <View style={styles.section}>
            <UpcomingHearingCard data={upcomingHearings.map((hearing) => ({ id: hearing.hearingId, date: hearing.hearingDate ? new Date(hearing.hearingDate).getDate() : "—", month: hearing.hearingDate ? new Date(hearing.hearingDate).toLocaleString("en", { month: "short" }).toUpperCase() : "", title: hearing.purpose || "—", caseNumber: hearing.caseNumber || (hearing.caseId != null ? `Case ${hearing.caseId}` : "—"), time: hearing.hearingDate ? new Date(hearing.hearingDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—" }))} />
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    backgroundColor: COLORS.background,
  },

  section: {
    paddingHorizontal: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default AdminDashboardScreen;
