import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  gold: "#E5B93F",
  secondary: "#61758A",
};

const HearingDateHeader = ({
  hearingDate,
  count,
}) => {
  const parsed = hearingDate ? new Date(hearingDate) : null;
  const valid = parsed && !Number.isNaN(parsed.getTime());
  const date = valid ? String(parsed.getDate()).padStart(2, "0") : "";
  const month = valid ? parsed.toLocaleString("en", { month: "short" }).toUpperCase() : "";
  const day = valid ? parsed.toLocaleString("en", { weekday: "long" }) : "Date unavailable";
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <View style={styles.dateBox}>
          <AppText
            size="xl"
            weight="bold"
            style={styles.date}
          >
            {date}
          </AppText>

          <AppText
            size="xs"
            weight="bold"
            style={styles.month}
          >
            {month}
          </AppText>
        </View>

        <View style={styles.dayContainer}>
          <AppText
            size="md"
            weight="bold"
          >
            {day}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
          >
            Scheduled hearings
          </AppText>
        </View>
      </View>

      <View style={styles.count}>
        <AppText
          size="xs"
          weight="bold"
          style={styles.countText}
        >
          {count}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateBox: {
    width: 54,
    height: 58,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  date: {
    color: "#FFFFFF",
  },

  month: {
    color: COLORS.gold,
    marginTop: -2,
  },

  dayContainer: {
    marginLeft: 12,
  },

  count: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    color: COLORS.navy,
  },
});

export default HearingDateHeader;
