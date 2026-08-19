import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "./AppText";
import theme from "../../theme/theme";

const AppInput = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? (
        <AppText
          size="sm"
          weight="medium"
          style={styles.label}
        >
          {label}
        </AppText>
      ) : null}

      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
          style,
        ]}
        placeholderTextColor={theme.colors.textTertiary}
        {...props}
      />

      {error ? (
        <AppText
          size="xs"
          color="danger"
          style={styles.errorText}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.lg,
  },

  label: {
    marginBottom: theme.spacing.sm,
  },

  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },

  errorInput: {
    borderColor: theme.colors.danger,
  },

  errorText: {
    marginTop: theme.spacing.xs,
  },
});

export default AppInput;
