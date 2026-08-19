import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import theme from "../../theme/theme";

const AppCard = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    ...theme.shadows.medium,
  },
});

export default AppCard;
