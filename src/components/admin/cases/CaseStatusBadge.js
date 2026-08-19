import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../common/AppText";

const COLORS = {
  activeBg: "#E3F1E9",
  activeText: "#287A50",
  pendingBg: "#F7EAC5",
  pendingText: "#8A6810",
  closedBg: "#E8EEF5",
  closedText: "#42627F",
  defaultBg: "#ECE9E2",
  defaultText: "#61758A",
};

const CaseStatusBadge = ({ status }) => {
  const value = String(status || "").toLowerCase();

  let backgroundColor = COLORS.defaultBg;
  let textColor = COLORS.defaultText;

  if (value === "open" || value === "active") {
    backgroundColor = COLORS.activeBg;
    textColor = COLORS.activeText;
  } else if (value === "pending") {
    backgroundColor = COLORS.pendingBg;
    textColor = COLORS.pendingText;
  } else if (value === "closed") {
    backgroundColor = COLORS.closedBg;
    textColor = COLORS.closedText;
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

export default CaseStatusBadge;