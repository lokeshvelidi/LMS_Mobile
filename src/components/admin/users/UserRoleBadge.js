import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  cream: "#F5F2EA",
  clientBg: "#E8EEF5",
  advocateBg: "#F7EAC5",
  clerkBg: "#E3F1E9",
  adminBg: "#E8E4F8",
};

const UserRoleBadge = ({ role }) => {
  const normalizedRole = String(role || "").toLowerCase();

  let backgroundColor = COLORS.clientBg;
  let textColor = COLORS.navy;

  if (normalizedRole === "advocate" || normalizedRole === "lawyer") {
    backgroundColor = COLORS.advocateBg;
  } else if (normalizedRole === "clerk") {
    backgroundColor = COLORS.clerkBg;
  } else if (normalizedRole === "administrator" || normalizedRole === "admin") {
    backgroundColor = COLORS.adminBg;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <AppText
        size="xs"
        weight="semiBold"
        style={{ color: textColor }}
      >
        {role || "Unknown"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
});

export default UserRoleBadge;