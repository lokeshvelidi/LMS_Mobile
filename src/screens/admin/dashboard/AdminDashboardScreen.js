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
  useEffect(() => { getAdminDashboard().then(setDashboard).catch(() => setDashboard(null)); getAdminUpcomingHearings().then(setUpcomingHearings).catch(() => setUpcomingHearings([])); }, []);
  const summary = dashboard?.summary && typeof dashboard.summary === "object" ? dashboard.summary : {};
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
              icon="C"
              accent={COLORS.blue}
              description="Registered clients"
            />

            <AdminStatCard
              title="Civil Cases"
              value={value("civilCases", "civilCaseCount")}
              icon="⚖"
              accent={COLORS.gold}
              description="Active civil cases"
            />

            <AdminStatCard
              title="Criminal Cases"
              value={value("criminalCases", "criminalCaseCount")}
              icon="§"
              accent={COLORS.red}
              description="Active criminal cases"
            />

            <AdminStatCard
              title="Today's Hearings"
              value={value("todayHearings", "todaysHearings")}
              icon="D"
              accent={COLORS.green}
              description="Scheduled today"
            />

            <AdminStatCard
              title="Pending Cases"
              value={value("pendingCases", "pendingCaseCount")}
              icon="P"
              accent={COLORS.gold}
              description="Awaiting action"
            />

            <AdminStatCard
              title="Closed Cases"
              value={value("closedCases", "closedCaseCount")}
              icon="✓"
              accent={COLORS.green}
              description="Successfully closed"
            />

            <AdminStatCard
              title="Upcoming Hearings"
              value={value("upcomingHearings", "upcomingHearingCount")}
              icon="H"
              accent={COLORS.blue}
              description="Upcoming schedule"
            />

            <AdminStatCard
              title="Pending Payments"
              value={value("pendingPayments", "pendingPaymentAmount")}
              icon="₹"
              accent={COLORS.red}
              description="Outstanding amount"
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
