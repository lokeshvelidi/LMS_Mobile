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

import theme from "../../theme/theme";

const ClientDetailsScreen = ({
  route,
  navigation,
}) => {
  const { client } = route.params;

  const initials = client.name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const relatedCases = [
    {
      id: "1",
      title: "Property Dispute",
      caseNumber: "CASE-001",
      status: "Active",
    },
    {
      id: "2",
      title: "Civil Matter",
      caseNumber: "CASE-002",
      status: "Pending",
    },
  ];

  return (
    <AppScreen>
      <AppHeader
        title="Client Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <AppText
              size="xxl"
              weight="bold"
              color="textWhite"
            >
              {initials}
            </AppText>
          </View>

          <AppText
            size="xxl"
            weight="bold"
            style={styles.name}
          >
            {client.name}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
          >
            {client.caseCount}{" "}
            {client.caseCount === 1
              ? "case"
              : "cases"}
          </AppText>
        </View>

        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Contact Information
          </AppText>

          <View style={styles.infoList}>
            <InfoRow
              label="Email"
              value={client.email}
            />

            <InfoRow
              label="Phone"
              value={client.phone}
            />

            <InfoRow
              label="Address"
              value={client.address}
              last
            />
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <View style={styles.sectionHeader}>
            <AppText
              size="lg"
              weight="semiBold"
            >
              Related Cases
            </AppText>

            <AppText
              size="sm"
              color="primary"
              weight="medium"
              onPress={() =>
                navigation.navigate("AdminMain", {
                  screen: "Cases",
                })
              }
            >
              View All
            </AppText>
          </View>

          {relatedCases.map((caseItem, index) => (
            <View
              key={caseItem.id}
              style={[
                styles.caseItem,
                index !==
                  relatedCases.length - 1 &&
                  styles.caseBorder,
              ]}
            >
              <View style={styles.caseContent}>
                <AppText
                  size="md"
                  weight="semiBold"
                >
                  {caseItem.title}
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                  style={styles.caseNumber}
                >
                  {caseItem.caseNumber}
                </AppText>
              </View>

              <View
                style={[
                  styles.status,
                  caseItem.status === "Active"
                    ? styles.activeStatus
                    : styles.pendingStatus,
                ]}
              >
                <AppText
                  size="xs"
                  weight="medium"
                  style={{
                    color:
                      caseItem.status ===
                      "Active"
                        ? theme.colors.success
                        : theme.colors.warning,
                  }}
                >
                  {caseItem.status}
                </AppText>
              </View>
            </View>
          ))}
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

  profileSection: {
    alignItems: "center",
    marginBottom: theme.spacing.xxl,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  name: {
    marginBottom: theme.spacing.xs,
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

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },

  caseItem: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  caseBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  caseContent: {
    flex: 1,
  },

  caseNumber: {
    marginTop: 2,
  },

  status: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },

  activeStatus: {
    backgroundColor: theme.colors.successLight,
  },

  pendingStatus: {
    backgroundColor: theme.colors.warningLight,
  },
});

export default ClientDetailsScreen;
