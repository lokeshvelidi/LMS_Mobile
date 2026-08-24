import React from "react";

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
import { deleteAdminCourt } from "../../../services/api/adminCourtsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const CourtDetailsScreen = ({
  navigation,
  route,
}) => {
  const court = route?.params?.court;

  if (!court) {
    return (
      <AppScreen>
        <AppHeader
          title="Court Details"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Court not found
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const handleEdit = () => {
    navigation.navigate(
      "EditCourt",
      {
        court,
      }
    );
  };

  const handleDelete = () => Alert.alert("Delete Court", `Delete ${court.courtName || "this court"}?`, [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => deleteAdminCourt(court.courtId).then(() => Alert.alert("Court Deleted", "Court deleted successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])).catch((e) => Alert.alert("Delete failed", e.response?.data?.message || "Unable to delete court.")) }]);

  return (
    <AppScreen>
      <AppHeader
        title="Court Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.heroCard}>
          <View style={styles.iconContainer}>
            <AppText
              size="xxl"
              weight="bold"
              style={styles.icon}
            >
              ⚖
            </AppText>
          </View>

          <AppText
            size="xl"
            weight="bold"
            style={styles.title}
          >
            {court.courtName || "Court name unavailable"}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
          >
            {court.courtId != null ? `ID: ${court.courtId}` : ""}
          </AppText>

        </View>

        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            Court Information
          </AppText>

          <InfoRow
            label="Court Name"
            value={court.courtName}
          />

          <InfoRow
            label="Court ID"
            value={court.courtId}
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
              Edit Court
            </AppText>
          </Pressable>

          <Pressable onPress={handleDelete} style={styles.secondaryButton}><AppText size="sm" weight="semiBold" style={{ color: "#D9534F" }}>Delete Court</AppText></Pressable>
        </View>
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
        {value != null && value !== "" ? String(value) : "Not available"}
      </AppText>
    </View>
  );
};

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

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  icon: {
    color: COLORS.navy,
  },

  title: {
    textAlign: "center",
    marginBottom: 4,
  },

  status: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 14,
  },

  active: {
    backgroundColor: "#E3F1E9",
  },

  inactive: {
    backgroundColor: "#F8E3E1",
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
    backgroundColor: COLORS.navy,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default CourtDetailsScreen;
