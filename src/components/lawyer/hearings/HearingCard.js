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
  border: "#DED9CE",
};

const HearingCard = ({
  item,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.caseInfo}>
          <AppText
            size="md"
            weight="bold"
            style={styles.caseNumber}
          >
            {item.caseNumber}
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.client}
          >
            {item.client}
          </AppText>
        </View>

        <HearingStatusBadge
          status={item.status}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.infoGrid}>
        <View style={styles.info}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            HEARING DATE
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {item.date}
          </AppText>
        </View>

        <View style={styles.info}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            TIME
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {item.time}
          </AppText>
        </View>

        <View style={styles.info}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            COURT
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {item.court}
          </AppText>
        </View>

        <View style={styles.info}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            PURPOSE
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {item.purpose}
          </AppText>
        </View>
      </View>

      <View style={styles.action}>
        <AppText
          size="sm"
          weight="bold"
          style={styles.actionText}
        >
          Manage Hearing →
        </AppText>
      </View>
    </Pressable>
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

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  caseInfo: {
    flex: 1,
    paddingRight: 10,
  },

  caseNumber: {
    color: COLORS.navy,
  },

  client: {
    color: COLORS.navy,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 15,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    width: "50%",
    marginBottom: 15,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 5,
    paddingRight: 8,
  },

  action: {
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    paddingTop: 13,
    alignItems: "flex-end",
  },

  actionText: {
    color: COLORS.navy,
  },
});

export default HearingCard;