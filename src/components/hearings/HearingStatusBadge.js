import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const HearingStatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: {
      label: "Upcoming",
      color: theme.colors.primary,
      background: theme.colors.primaryLight,
    },

    completed: {
      label: "Completed",
      color: theme.colors.success,
      background: theme.colors.successLight,
    },

    postponed: {
      label: "Postponed",
      color: theme.colors.warning,
      background: theme.colors.warningLight,
    },

    cancelled: {
      label: "Cancelled",
      color: theme.colors.danger,
      background: theme.colors.dangerLight,
    },
  };

  const config =
    statusConfig[status?.toLowerCase()] ||
    statusConfig.upcoming;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.background,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: config.color,
          },
        ]}
      />

      <AppText
        size="xs"
        weight="medium"
        style={{ color: config.color }}
      >
        {config.label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: theme.spacing.xs,
  },
});

export default HearingStatusBadge;