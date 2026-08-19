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
  border: "#E6E0D4",
  gold: "#E5B93F",
};

const ReportSummaryCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <AppText
            size="md"
            weight="bold"
            style={styles.icon}
          >
            {icon}
          </AppText>
        </View>

        <AppText
          size="sm"
          color="textSecondary"
          numberOfLines={2}
          style={styles.title}
        >
          {title}
        </AppText>
      </View>

      <AppText
        size="xl"
        weight="bold"
        style={styles.value}
      >
        {value}
      </AppText>

      {subtitle ? (
        <AppText
          size="xs"
          color="textSecondary"
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 130,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  icon: {
    color: COLORS.navy,
  },

  title: {
    flex: 1,
  },

  value: {
    marginTop: 13,
    marginBottom: 3,
  },
});

export default ReportSummaryCard;