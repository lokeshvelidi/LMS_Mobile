import React from "react";
import { StyleSheet, TextInput } from "react-native";

import theme from "../../theme/theme";

const ClientSearch = ({ value, onChangeText }) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder="Search clients"
    placeholderTextColor={theme.colors.textSecondary}
    style={styles.input}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
});

export default ClientSearch;
