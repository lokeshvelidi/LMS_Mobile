import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../common/AppText";

const COLORS = {
  highBg: "#F8E3E1",
  highText: "#B6423E",
  mediumBg: "#F7EAC5",
  mediumText: "#8A6810",
  lowBg: "#E3F1E9",
  lowText: "#287A50",
  defaultBg: "#ECE9E2",
  defaultText: "#61758A",
};

const CasePriorityBadge = ({ priority }) => {
  const value = String(priority || "").toLowerCase();

  let backgroundColor = COLORS.defaultBg;
  let textColor = COLORS.defaultText;

  if (value === "high") {
    backgroundColor = COLORS.highBg;
    textColor = COLORS.highText;
  } else if (value === "medium") {
    backgroundColor = COLORS.mediumBg;
    textColor = COLORS.mediumText;
  } else if (value === "low") {
    backgroundColor = COLORS.lowBg;
    textColor = COLORS.lowText;
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
      ]}
    >
      <AppText
        size="xs"
        weight="semiBold"
        style={{ color: textColor }}
      >
        {priority || "Normal"}
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

export default CasePriorityBadge;