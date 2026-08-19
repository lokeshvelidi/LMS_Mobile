import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";
import HearingStatusBadge from "./HearingStatusBadge";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
  gold: "#E5B93F",
};

const HearingCard = ({
  hearing,
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
      <View style={styles.timeContainer}>
        <AppText
          size="md"
          weight="bold"
        >
          {hearing.time}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.duration}
        >
          {hearing.duration}
        </AppText>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <AppText
              size="md"
              weight="bold"
              numberOfLines={1}
            >
              {hearing.title}
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.caseNumber}
            >
              {hearing.caseNumber}
            </AppText>
          </View>

          <HearingStatusBadge
            status={hearing.status}
          />
        </View>

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
        />

        <View style={styles.footer}>
          <AppText
            size="xs"
            color="textSecondary"
          >
            {hearing.type}
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.view}
          >
            View Details ›
          </AppText>
        </View>
      </View>
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
        {value || "-"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },

  pressed: {
    opacity: 0.75,
  },

  timeContainer: {
    width: 67,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 3,
  },

  duration: {
    marginTop: 4,
  },

  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  titleContainer: {
    flex: 1,
    marginRight: 8,
  },

  caseNumber: {
    marginTop: 3,
  },

  infoRow: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    maxWidth: "68%",
    textAlign: "right",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
    paddingTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  view: {
    color: COLORS.navy,
  },
});

export default HearingCard;