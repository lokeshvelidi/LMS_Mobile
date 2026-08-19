import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import AppCard from "../../components/common/AppCard";

import CaseStatusBadge from "../../components/cases/CaseStatusBadge";
import CaseTimeline from "../../components/cases/CaseTimeline";

import theme from "../../theme/theme";

const CaseDetailsScreen = ({
  route,
}) => {
  const { caseItem } = route.params;

  const timeline = [
    {
      id: "1",
      title: "Case Created",
      date: "10 Aug 2026",
      description:
        "Case was added to the system.",
    },
    {
      id: "2",
      title: "Case Updated",
      date: "12 Aug 2026",
      description:
        "Case information was updated.",
    },
  ];

  return (
    <AppScreen>
      <AppHeader
        title="Case Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleSection}>
          <View style={styles.titleContainer}>
            <AppText
              size="xl"
              weight="bold"
            >
              {caseItem.title}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.caseNumber}
            >
              {caseItem.caseNumber}
            </AppText>
          </View>

          <CaseStatusBadge
            status={caseItem.status}
          />
        </View>

        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Case Information
          </AppText>

          <View style={styles.infoList}>
            <InfoRow
              label="Case Number"
              value={caseItem.caseNumber}
            />

            <InfoRow
              label="Client"
              value={caseItem.clientName}
            />

            <InfoRow
              label="Court"
              value={caseItem.court}
            />

            <InfoRow
              label="Next Hearing"
              value={
                caseItem.nextHearing ||
                "Not scheduled"
              }
            />

            <InfoRow
              label="Status"
              value={
                caseItem.status
                  .charAt(0)
                  .toUpperCase() +
                caseItem.status.slice(1)
              }
              last
            />
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
            style={styles.sectionTitle}
          >
            Activity Timeline
          </AppText>

          <CaseTimeline
            events={timeline}
          />
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
};

const InfoRow = ({
  label,
  value,
  last = false,
}) => {
  return (
    <View
      style={[
        styles.infoRow,
        !last && styles.infoRowBorder,
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
        weight="medium"
        style={styles.infoValue}
      >
        {value}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  titleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },

  titleContainer: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },

  caseNumber: {
    marginTop: theme.spacing.xs,
  },

  card: {
    marginBottom: theme.spacing.lg,
  },

  infoList: {
    marginTop: theme.spacing.md,
  },

  infoRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  infoValue: {
    maxWidth: "55%",
    textAlign: "right",
  },

  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
});

export default CaseDetailsScreen;