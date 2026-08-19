import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const DocumentTypeBadge = ({ type }) => {
  const config = {
    pdf: {
      label: "PDF",
      color: theme.colors.danger,
      background: theme.colors.dangerLight,
    },
    image: {
      label: "IMAGE",
      color: theme.colors.primary,
      background: theme.colors.primaryLight,
    },
    word: {
      label: "DOC",
      color: theme.colors.info,
      background: theme.colors.infoLight,
    },
    other: {
      label: "FILE",
      color: theme.colors.textSecondary,
      background: theme.colors.surfaceSecondary,
    },
  };

  const item = config[type?.toLowerCase()] || config.other;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: item.background },
      ]}
    >
      <AppText
        size="xs"
        weight="bold"
        style={{ color: item.color }}
      >
        {item.label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
});

export default DocumentTypeBadge;