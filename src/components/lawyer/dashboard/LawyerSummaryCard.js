import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  cream: "#F5F0E3",
  blue: "#2563EB",
  green: "#18A957",
  gold: "#DDB52F",
  red: "#D94B45",
  border: "#E5DED0",
};

const LawyerSummaryCard = ({
  label,
  value,
  accent,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: accent,
        },
      ]}
    >
      <View style={styles.topRow}>
        <AppText
          size="xs"
          weight="semiBold"
          style={styles.label}
        >
          {label}
        </AppText>
      </View>

      <AppText
        size="xxl"
        weight="bold"
        style={styles.value}
      >
        {value}
      </AppText>

      <View style={styles.cornerShape} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    minHeight: 92,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    paddingHorizontal: 15,
    paddingVertical: 13,
    overflow: "hidden",
    position: "relative",
  },

  topRow: {
    marginBottom: 7,
  },

  label: {
    color: COLORS.secondary,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  value: {
    color: COLORS.navy,
    fontSize: 28,
    lineHeight: 34,
  },

  cornerShape: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: COLORS.cream,
    right: -25,
    bottom: -30,
  },
});

export default LawyerSummaryCard;