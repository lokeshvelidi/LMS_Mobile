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

import HearingStatusBadge from "../../components/hearings/HearingStatusBadge";

import theme from "../../theme/theme";

const HearingDetailsScreen = ({ route }) => {
  const { hearing } = route.params;

  return (
    <AppScreen>
      <AppHeader
        title="Hearing Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Hearing Header */}
        <View style={styles.heading}>
          <View style={styles.dateBox}>
            <AppText
              size="xxl"
              weight="bold"
              color="primary"
            >
              {hearing.day}
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
            >
              {hearing.month}
            </AppText>
          </View>

          <View style={styles.titleContainer}>
            <AppText
              size="xl"
              weight="bold"
              numberOfLines={2}
            >
              {hearing.caseTitle}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.caseNumber}
            >
              {hearing.caseNumber}
            </AppText>

            <View style={styles.statusContainer}>
              <HearingStatusBadge
                status={hearing.status}
              />
            </View>
          </View>
        </View>

        {/* Hearing Information */}
        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Hearing Information
          </AppText>

          <View style={styles.infoList}>
            <InfoRow
              label="Date"
              value={hearing.date}
            />

            <InfoRow
              label="Time"
              value={hearing.time}
            />

            <InfoRow
              label="Court"
              value={hearing.court}
            />

            <InfoRow
              label="Status"
              value={formatStatus(hearing.status)}
              last
            />
          </View>
        </AppCard>

        {/* Case Information */}
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
              value={hearing.caseNumber}
            />

            <InfoRow
              label="Case Title"
              value={hearing.caseTitle}
            />

            <InfoRow
              label="Client"
              value={hearing.clientName}
              last
            />
          </View>
        </AppCard>

        {/* Court Information */}
        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Court Information
          </AppText>

          <View style={styles.infoList}>
            <InfoRow
              label="Court Name"
              value={hearing.court}
              last
            />
          </View>
        </AppCard>

        {/* Additional Information */}
        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Additional Information
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.additionalText}
          >
            Hearing details, notes and other
            information associated with this hearing
            will be displayed here once the backend
            API is connected.
          </AppText>
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
};

const formatStatus = (status) => {
  if (!status) {
    return "Not available";
  }

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
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
        !last && styles.infoBorder,
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
        {value || "Not available"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  heading: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.md,
  },

  dateBox: {
    width: 68,
    height: 76,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  titleContainer: {
    flex: 1,
    paddingTop: theme.spacing.xs,
  },

  caseNumber: {
    marginTop: theme.spacing.xs,
  },

  statusContainer: {
    marginTop: theme.spacing.sm,
  },

  card: {
    marginBottom: theme.spacing.lg,
  },

  infoList: {
    marginTop: theme.spacing.md,
  },

  infoRow: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  infoValue: {
    maxWidth: "60%",
    textAlign: "right",
  },

  additionalText: {
    lineHeight: 22,
    marginTop: theme.spacing.md,
  },
});

export default HearingDetailsScreen;