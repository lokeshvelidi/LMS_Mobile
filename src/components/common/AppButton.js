import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import AppText from "./AppText";
import theme from "../../theme/theme";

const AppButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "outline" && styles.outlineButton,
        isDisabled && styles.disabledButton,
        pressed && !isDisabled && styles.pressedButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline"
              ? theme.colors.primary
              : theme.colors.textWhite
          }
        />
      ) : (
        <AppText
          size="md"
          weight="semiBold"
          color={
            variant === "outline"
              ? "primary"
              : "textWhite"
          }
        >
          {title}
        </AppText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    backgroundColor: theme.colors.accent,
  },

  outlineButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  disabledButton: {
    opacity: 0.5,
  },

  pressedButton: {
    opacity: 0.85,
  },
});

export default AppButton;
