import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  createBg: "#E3F1E9",
  createText: "#287A50",

  updateBg: "#E8EEF5",
  updateText: "#42627F",

  deleteBg: "#F8E3E1",
  deleteText: "#B6423E",

  loginBg: "#F7EAC5",
  loginText: "#8A6810",

  defaultBg: "#ECE9E2",
  defaultText: "#61758A",
};

const AuditActionBadge = ({
  action,
}) => {
  const value = String(
    action || ""
  ).toLowerCase();

  let backgroundColor =
    COLORS.defaultBg;

  let textColor =
    COLORS.defaultText;

  if (
    value === "created" ||
    value === "create"
  ) {
    backgroundColor =
      COLORS.createBg;
    textColor =
      COLORS.createText;
  } else if (
    value === "updated" ||
    value === "update"
  ) {
    backgroundColor =
      COLORS.updateBg;
    textColor =
      COLORS.updateText;
  } else if (
    value === "deleted" ||
    value === "delete"
  ) {
    backgroundColor =
      COLORS.deleteBg;
    textColor =
      COLORS.deleteText;
  } else if (
    value === "login" ||
    value === "logged in"
  ) {
    backgroundColor =
      COLORS.loginBg;
    textColor =
      COLORS.loginText;
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
        {action || "Unknown"}
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

export default AuditActionBadge;