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

import HearingStatusBadge from "../../../components/admin/hearings/HearingStatusBadge";
import { deleteAdminHearing, getAdminHearing } from "../../../services/api/adminHearingsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const HearingDetailsScreen = ({
  navigation,
  route,
}) => {
  const initial = route?.params?.hearing;
  const [hearing, setHearing] = useState(initial);
  useEffect(() => { if (initial?.hearingId || initial?.id) getAdminHearing(initial.hearingId ?? initial.id).then(setHearing).catch(() => {}); }, [initial?.hearingId, initial?.id]);

  if (!hearing) {
    return (
      <AppScreen>
        <AppHeader
          title="Hearing Details"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Hearing information unavailable
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const handleEdit = () => {
    navigation.navigate(
      "AddHearing",
      {
        hearing,
        editMode: true,
      }
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Hearing",
      "Are you sure you want to cancel this hearing?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Cancel Hearing",
          style: "destructive",
          onPress: () =>
            deleteAdminHearing(hearing.hearingId ?? hearing.id).then(() => Alert.alert("Hearing Deleted", "The hearing was deleted successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])).catch((e) => Alert.alert("Delete failed", e.response?.data?.message || "Unable to delete hearing.")),
        },
      ]
    );
  };

  return (
    <AppScreen>
      <AppHeader
        title="Hearing Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.heroCard}>
          <View style={styles.calendarIcon}>
            <AppText
              size="xl"
              weight="bold"
              style={styles.iconText}
            >
              {hearing.dateNumber}
            </AppText>

            <AppText
              size="xs"
              weight="bold"
              style={styles.month}
            >
              {hearing.month}
            </AppText>
          </View>

          <AppText
            size="xl"
            weight="bold"
            style={styles.title}
          >
            {hearing.title}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
          >
            {hearing.caseNumber}
          </AppText>

          <View style={styles.statusContainer}>
            <HearingStatusBadge
              status={hearing.status}
            />
          </View>
        </View>

        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            Hearing Information
          </AppText>

          <InfoRow
            label="Date"
            value={hearing.date}
          />

          <InfoRow
            label="Time"
            value={hearing.time}
          />

          <InfoRow
            label="Duration"
            value={hearing.duration}
          />

          <InfoRow
            label="Type"
            value={hearing.type}
          />

          <InfoRow
            label="Case Number"
            value={hearing.caseNumber}
          />

          <InfoRow
            label="Client"
            value={hearing.client}
          />

          <InfoRow
            label="Court"
            value={hearing.court}
          />

          <InfoRow
            label="Judge"
            value={hearing.judge}
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
              Edit Hearing
            </AppText>
          </Pressable>

          {hearing.status ===
          "Scheduled" ? (
            <Pressable
              onPress={handleCancel}
              style={styles.secondaryButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
              >
                Cancel Hearing
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

  calendarIcon: {
    width: 72,
    height: 72,
    borderRadius: 21,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconText: {
    color: COLORS.white,
  },

  month: {
    color: COLORS.gold,
    marginTop: -2,
  },

  title: {
    textAlign: "center",
    marginBottom: 4,
  },

  statusContainer: {
    marginTop: 14,
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

export default HearingDetailsScreen;
