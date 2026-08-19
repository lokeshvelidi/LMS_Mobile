import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "./AppText";
import theme from "../../theme/theme";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="folder-open-outline"
          size={25}
          color={theme.colors.accent}
        />
      </View>

      <AppText
        size="lg"
        weight="semiBold"
      >
        {title}
      </AppText>

      {description ? (
        <AppText
          size="sm"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xxxl,
  },

  icon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },
});

export default EmptyState;
