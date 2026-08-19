import React, { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import CaseStatusBadge from "../../../components/admin/cases/CaseStatusBadge";
import CasePriorityBadge from "../../../components/admin/cases/CasePriorityBadge";
import { getAdminCaseDetail } from "../../../services/api/adminCasesService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const CaseDetailsScreen = ({
  navigation,
  route,
}) => {
  const initialCase = route?.params?.caseItem;
  const [caseItem, setCaseItem] = useState(initialCase);
  useEffect(() => { if (initialCase?.id) getAdminCaseDetail(initialCase.id).then(setCaseItem).catch(() => {}); }, [initialCase?.id]);

  if (!caseItem) {
    return (
      <AppScreen>
        <AppHeader
          title="Case Details"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Case information unavailable
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const handleEdit = () => {
    navigation.navigate(
      "EditCase",
      {
        caseItem,
      }
    );
  };

  const handleClose = () => {
    Alert.alert(
      "Close Case",
      `Are you sure you want to close ${caseItem.caseNumber}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Close Case",
          onPress: () =>
            Alert.alert(
              "Case Closed",
              "The case status has been updated."
            ),
        },
      ]
    );
  };

  return (
    <AppScreen>
      <AppHeader
        title="Case Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.heroCard}>
          <View style={styles.caseIcon}>
            <AppText
              size="xl"
              weight="bold"
              style={styles.iconText}
            >
              ⚖
            </AppText>
          </View>

          <AppText
            size="xl"
            weight="bold"
            style={styles.caseNumber}
          >
            {caseItem.caseNumber}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
          >
            {caseItem.type}
          </AppText>

          <View style={styles.badges}>
            <CaseStatusBadge
              status={caseItem.status}
            />

            <View style={styles.badgeGap} />

            <CasePriorityBadge
              priority={caseItem.priority}
            />
          </View>
        </View>

        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            Case Information
          </AppText>

          <InfoRow
            label="Case Number"
            value={caseItem.caseNumber}
          />

          <InfoRow
            label="Case Type"
            value={caseItem.type}
          />

          <InfoRow
            label="Client"
            value={caseItem.client}
          />

          <InfoRow
            label="Stage"
            value={caseItem.stage}
          />

          <InfoRow
            label="Status"
            value={caseItem.status}
          />

          <InfoRow
            label="Priority"
            value={caseItem.priority}
          />

          <InfoRow
            label="Next Hearing"
            value={caseItem.nextHearing}
          />

          <InfoRow
            label="Created"
            value={caseItem.created}
            last
          />
        </View>

        <View style={styles.actions}>
          <AppText
            size="lg"
            weight="bold"
          >
            Actions
          </AppText>

          <Pressable
            onPress={handleEdit}
            style={styles.primaryButton}
          >
            <AppText
              size="sm"
              weight="semiBold"
              style={styles.primaryText}
            >
              Edit Case
            </AppText>
          </Pressable>

          {caseItem.status !== "Closed" ? (
            <Pressable
              onPress={handleClose}
              style={styles.secondaryButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
              >
                Close Case
              </AppText>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
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
      weight="medium"
      style={styles.value}
    >
      {value || "-"}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  caseIcon: {
    width: 68,
    height: 68,
    borderRadius: 21,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconText: {
    color: COLORS.navy,
  },

  caseNumber: {
    textAlign: "center",
    marginBottom: 4,
  },

  badges: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  badgeGap: {
    width: 8,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },

  infoRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  value: {
    maxWidth: "60%",
    textAlign: "right",
  },

  actions: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
  },

  primaryButton: {
    height: 48,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryButton: {
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default CaseDetailsScreen;
