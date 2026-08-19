import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const ProfileHeader = ({
  name,
  email,
}) => {
  const initials = name
    .split(" ")
    .map((item) => item.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <AppText
          size="xxl"
          weight="bold"
          color="textWhite"
        >
          {initials}
        </AppText>
      </View>

      <AppText
        size="xxl"
        weight="bold"
        style={styles.name}
      >
        {name}
      </AppText>

      <AppText
        size="sm"
        color="textSecondary"
      >
        {email}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  name: {
    marginBottom: theme.spacing.xs,
  },
});

export default ProfileHeader;