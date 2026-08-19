import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  scheduledBg: "#E8EEF5",
  scheduledText: "#42627F",

  completedBg: "#E3F1E9",
  completedText: "#287A50",

  postponedBg: "#F7EAC5",
  postponedText: "#8A6810",

  cancelledBg: "#F8E3E1",
  cancelledText: "#B6423E",

  defaultBg: "#ECE9E2",
  defaultText: "#61758A",
};

const HearingStatusBadge = ({
  status,
}) => {
  const value = String(
    status || ""
  ).toLowerCase();

  let backgroundColor =
    COLORS.defaultBg;

  let textColor =
    COLORS.defaultText;

  if (value === "scheduled") {
    backgroundColor =
      COLORS.scheduledBg;
    textColor =
      COLORS.scheduledText;
  }

  if (value === "completed") {
    backgroundColor =
      COLORS.completedBg;
    textColor =
      COLORS.completedText;
  }

  if (value === "postponed") {
    backgroundColor =
      COLORS.postponedBg;
    textColor =
      COLORS.postponedText;
  }

  if (value === "cancelled") {
    backgroundColor =
      COLORS.cancelledBg;
    textColor =
      COLORS.cancelledText;
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
        },
      ]}
    >
      <AppText
        size="xs"
        weight="semiBold"
        style={{
          color: textColor,
        }}
      >
        {status || "Unknown"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },
});

export default HearingStatusBadge;