import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const CaseStatusBadge = ({ status }) => {
  const statusConfig = {
    active: {
      label: "Active",
      color: theme.colors.success,
      background: theme.colors.successLight,
    },

    pending: {
      label: "Pending",
      color: theme.colors.warning,
      background: theme.colors.warningLight,
    },

    closed: {
      label: "Closed",
      color: theme.colors.textSecondary,
      background: theme.colors.surfaceSecondary,
    },

    completed: {
      label: "Completed",
      color: theme.colors.primary,
      background: theme.colors.primaryLight,
    },
  };

  const config =
    statusConfig[status?.toLowerCase()] ||
    statusConfig.pending;

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
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.xs,
  },
});

export default CaseStatusBadge;