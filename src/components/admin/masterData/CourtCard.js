import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
  activeBg: "#E3F1E9",
  activeText: "#287A50",
  inactiveBg: "#F8E3E1",
  inactiveText: "#D9534F",
};

const CourtCard = ({
  court,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AppText
            size="lg"
            weight="bold"
            style={styles.icon}
          >
            ⚖
          </AppText>
        </View>

        <View style={styles.titleContainer}>
          <AppText
            size="md"
            weight="bold"
            numberOfLines={2}
          >
            {court.courtName || "Court name unavailable"}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.code}
          >
            {court.courtId != null ? `ID: ${court.courtId}` : null}
          </AppText>
        </View>

      </View>

      <View style={styles.divider} />

      <InfoRow label="Court ID" value={court.courtId} />
    </Pressable>
  );
};

const InfoRow = ({
  label,
  value,
}) => {
  return (
    <View style={styles.infoRow}>
      <AppText
        size="xs"
        color="textSecondary"
      >
        {label}
      </AppText>

      <AppText
        size="sm"
        weight="medium"
        numberOfLines={1}
        style={styles.value}
      >
        {value != null && value !== "" ? String(value) : "Not available"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.75,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  icon: {
    color: COLORS.navy,
  },

  titleContainer: {
    flex: 1,
    marginRight: 8,
  },

  code: {
    marginTop: 3,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },

  activeStatus: {
    backgroundColor: COLORS.activeBg,
  },

  inactiveStatus: {
    backgroundColor: COLORS.inactiveBg,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },

  infoRow: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    maxWidth: "65%",
    textAlign: "right",
  },
});

export default CourtCard;
