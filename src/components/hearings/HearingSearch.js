import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import theme from "../../theme/theme";

const HearingSearch = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <View style={styles.circle} />
        <View style={styles.handle} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search hearings..."
        placeholderTextColor={
          theme.colors.textTertiary
        }
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing.sm,
    position: "relative",
  },

  circle: {
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: theme.colors.textTertiary,
    borderRadius: 7,
  },

  handle: {
    width: 7,
    height: 2,
    backgroundColor: theme.colors.textTertiary,
    position: "absolute",
    left: 11,
    top: 13,
    transform: [{ rotate: "45deg" }],
  },

  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
});

export default HearingSearch;