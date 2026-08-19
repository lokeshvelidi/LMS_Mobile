import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const SummaryCard = ({
  title,
  value,
  description,
  icon,
  variant = "primary",
}) => {
  const colors = {
    primary: {
      background: theme.colors.primaryLight,
      accent: theme.colors.primary,
    },

    success: {
      background: theme.colors.successLight,
      accent: theme.colors.success,
    },

    warning: {
      background: theme.colors.warningLight,
      accent: theme.colors.warning,
    },

    danger: {
      background: theme.colors.dangerLight,
      accent: theme.colors.danger,
    },
  };

  const currentColors =
    colors[variant] || colors.primary;

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              currentColors.background,
          },
        ]}
      >
        {icon ? (
          icon
        ) : (
          <View
            style={[
              styles.defaultIcon,
              {
                backgroundColor:
                  currentColors.accent,
              },
            ]}
          />
        )}
      </View>

      <AppText
        size="display"
        weight="bold"
        heading
        style={styles.value}
      >
        {value}
      </AppText>

      {description ? (
        <AppText
          size="xs"
          color="secondary"
          weight="semiBold"
        >
          {description}
        </AppText>
      ) : null}

      <AppText size="sm" color="textSecondary" style={styles.title}>
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "46%",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.medium,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: theme.borderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  defaultIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },

  title: {
    marginTop: theme.spacing.sm,
  },

  value: {
    marginBottom: 2,
  },
});

export default SummaryCard;
