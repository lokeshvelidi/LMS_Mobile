import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";

import WelcomeHeader from "../../../components/dashboard/WelcomeHeader";
import SummaryCard from "../../../components/dashboard/SummaryCard";
import QuickActionCard from "../../../components/dashboard/QuickActionCard";
import SectionHeader from "../../../components/dashboard/SectionHeader";

import theme from "../../../theme/theme";

const DashboardScreen = ({ navigation }) => {
  const dashboardData = {
    userName: "User",

    summary: {
      totalCases: 0,
      activeCases: 0,
      upcomingHearings: 0,
      completedCases: 0,
    },
  };

  return (
    <AppScreen scrollable>
      <AppHeader
        title="Dashboard"
        subtitle="LMS"
        onNotificationPress={() =>
          navigation.navigate("Notifications")
        }
      />

      <View style={styles.container}>
        <WelcomeHeader
          name={dashboardData.userName}
        />

        <SectionHeader title="Your practice at a glance" />

        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Total Cases"
            value={dashboardData.summary.totalCases}
            description="VIEW ALL"
            variant="primary"
          />

          <SummaryCard
            title="Active Cases"
            value={dashboardData.summary.activeCases}
            description="VIEW ALL"
            variant="success"
          />

          <SummaryCard
            title="Hearings"
            value={dashboardData.summary.upcomingHearings}
            description="VIEW ALL"
            variant="warning"
          />

          <SummaryCard
            title="Completed"
            value={dashboardData.summary.completedCases}
            description="VIEW ALL"
            variant="success"
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Today's Hearings"
            actionLabel="View All"
            onActionPress={() => navigation.navigate("Hearings")}
          />

          <QuickActionCard
            title="Property Dispute · 10:30 AM"
            description="CASE-001 · District Court"
            onPress={() =>
              navigation.navigate("Hearings")
            }
          />

          <QuickActionCard
            title="Civil Matter · 11:00 AM"
            description="CASE-002 · High Court"
            onPress={() =>
              navigation.navigate("Hearings")
            }
          />

        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Recent Cases"
            actionLabel="View All"
            onActionPress={() =>
              navigation.navigate("Cases")
            }
          />

          <QuickActionCard
            title="Property Dispute"
            description="CASE-001 · Active"
            onPress={() => navigation.navigate("Cases")}
          />
          <QuickActionCard
            title="Civil Matter"
            description="CASE-002 · Pending"
            onPress={() => navigation.navigate("Cases")}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },

  section: {
    marginTop: theme.spacing.xxxl,
  },

  emptyCard: {
    minHeight: 150,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xxl,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  emptyIconShape: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: theme.colors.textTertiary,
    borderRadius: 4,
  },

  emptyDescription: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});

export default DashboardScreen;
