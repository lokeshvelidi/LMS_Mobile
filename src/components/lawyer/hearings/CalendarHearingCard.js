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

const CalendarHearingCard = ({
  item,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() =>
        onPress?.(item)
      }
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.dateColumn}>
        <AppText
          size="xs"
          weight="semiBold"
          style={styles.dateLabel}
        >
          HEARING
        </AppText>

        <AppText
          size="sm"
          weight="bold"
          style={styles.date}
        >
          {item.date}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.time}
        >
          {item.time}
        </AppText>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <AppText
            size="sm"
            weight="bold"
            style={styles.caseNumber}
          >
            {item.caseNumber}
          </AppText>

          <HearingStatusBadge
            status={item.status}
          />
        </View>

        <AppText
          size="sm"
          weight="semiBold"
          style={styles.client}
        >
          {item.client}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.court}
        >
          {item.court}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.purpose}
        >
          {item.purpose}
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
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    marginBottom: 11,
  },

  pressed: {
    opacity: 0.7,
  },

  dateColumn: {
    width: 82,
    borderRightWidth: 1,
    borderRightColor: "#EEE9DE",
    paddingRight: 10,
  },

  dateLabel: {
    color: COLORS.secondary,
    fontSize: 9,
    letterSpacing: 1,
  },

  date: {
    color: COLORS.navy,
    marginTop: 7,
  },

  time: {
    marginTop: 4,
  },

  content: {
    flex: 1,
    paddingLeft: 13,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  caseNumber: {
    color: COLORS.navy,
    flex: 1,
    paddingRight: 8,
  },

  client: {
    color: COLORS.navy,
    marginTop: 7,
  },

  court: {
    marginTop: 5,
  },

  purpose: {
    marginTop: 3,
  },
});

export default CalendarHearingCard;