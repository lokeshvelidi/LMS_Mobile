import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  white: "#FFFDF8",
  border: "#E5DED0",
  secondary: "#61758A",
};

const UpcomingHearingCard = ({ hearings = [] }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <AppText
          size="md"
          weight="bold"
          style={styles.title}
        >
          My Upcoming Hearings
        </AppText>
      </View>

      <View style={styles.empty}>
        <AppText
          size="sm"
          color="textSecondary"
        >
          {hearings.length
            ? `${hearings.length} upcoming ${hearings.length === 1 ? "hearing" : "hearings"}`
            : "No upcoming hearings"}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 16,
    padding: 18,
    minHeight: 150,
  },

  header: {
    marginBottom: 15,
  },

  title: {
    color: COLORS.navy,
  },

  empty: {
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpcomingHearingCard;
