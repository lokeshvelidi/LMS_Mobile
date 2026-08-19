import React, { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import LawyerSummaryCard from "../../../components/lawyer/dashboard/LawyerSummaryCard";
import CaseStatusChart from "../../../components/lawyer/dashboard/CaseStatusChart";
import HearingsByCaseChart from "../../../components/lawyer/dashboard/HearingsByCaseChart";
import UpcomingHearingCard from "../../../components/lawyer/dashboard/UpcomingHearingCard";
import { getLawyerDashboard } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E5DED0",
  gold: "#DDB52F",
};

const LawyerDashboardScreen = ({
  navigation,
}) => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getLawyerDashboard()
      .then((result) => active && setDashboard(result))
      .catch(() => active && setError("Unable to load the Lawyer dashboard."));
    return () => { active = false; };
  }, []);

  const summaryData = [
    {
      id: "active",
      label: "Active Cases",
      value: String(dashboard?.activeCases ?? 0),
      accent: "#2563EB",
    },

    {
      id: "hearings",
      label: "Upcoming Hearings",
      value: String(dashboard?.upcomingHearings.length ?? 0),
      accent: "#18A957",
    },

    {
      id: "documents",
      label: "Assigned Documents",
      value: String(dashboard?.assignedDocuments.length ?? 0),
      accent: COLORS.gold,
    },

    {
      id: "assigned",
      label: "Total Assigned Cases",
      value: String(dashboard?.cases.length ?? 0),
      accent: "#D94B45",
    },
  ];

  const initials = useMemo(() => (dashboard?.profile.name ?? "Lawyer")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join(""), [dashboard?.profile.name]);

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* =========================
            HEADER
        ========================== */}

        <View style={styles.header}>
          <View>
            <AppText
              size="xxl"
              weight="bold"
              style={styles.heading}
            >
              Dashboard
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.description}
            >
              Welcome back! Here's what's
              happening today.
            </AppText>
          </View>

          <View style={styles.profile}>
            <View style={styles.avatar}>
              <AppText
                size="xs"
                weight="bold"
                style={styles.avatarText}
              >
                {initials || "L"}
              </AppText>
            </View>

            <View>
              <AppText
                size="sm"
                weight="bold"
                style={styles.profileName}
              >
                {dashboard?.profile.name ?? "Lawyer"}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
              >
                Advocate
              </AppText>
            </View>
          </View>
        </View>

        {!dashboard && !error && (
          <View style={styles.stateCard}><ActivityIndicator size="large" color={COLORS.navy} /></View>
        )}

        {error && <View style={styles.stateCard}><AppText size="sm" color="textSecondary">{error}</AppText></View>}

        {/* =========================
            SUMMARY CARDS
        ========================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.summaryContainer
          }
        >
          {summaryData.map((item) => (
            <LawyerSummaryCard
              key={item.id}
              label={item.label}
              value={item.value}
              accent={item.accent}
            />
          ))}
        </ScrollView>

        {/* =========================
            CHARTS
        ========================== */}

        <View style={styles.charts}>
          <CaseStatusChart statusCounts={dashboard?.statusCounts ?? {}} />

          <HearingsByCaseChart hearings={dashboard?.cases.flatMap((item) => item.hearings) ?? []} />
        </View>

        {/* =========================
            UPCOMING HEARINGS
        ========================== */}

        <UpcomingHearingCard hearings={dashboard?.upcomingHearings ?? []} />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  heading: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  description: {
    marginTop: 5,
    lineHeight: 20,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
    alignSelf: "flex-start",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  avatarText: {
    color: "#FFFFFF",
  },

  profileName: {
    color: COLORS.navy,
  },

  summaryContainer: {
    gap: 10,
    paddingBottom: 16,
  },

  charts: {
    gap: 16,
  },

  stateCard: {
    minHeight: 110,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: 18,
  },

  bottomSpace: {
    height: 20,
  },
});

export default LawyerDashboardScreen;
