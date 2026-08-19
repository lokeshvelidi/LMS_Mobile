import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const QuickActionCard = ({
  title,
  description,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.icon}>
        <Ionicons
          name="briefcase-outline"
          size={20}
          color={theme.colors.accent}
        />
      </View>

      <View style={styles.content}>
        <AppText
          size="md"
          weight="semiBold"
        >
          {title}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={theme.colors.textTertiary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  content: {
    flex: 1,
  },

  description: {
    marginTop: 2,
  },
});

export default QuickActionCard;
