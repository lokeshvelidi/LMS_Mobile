import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const filters = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "active",
    label: "Active",
  },
  {
    key: "pending",
    label: "Pending",
  },
  {
    key: "closed",
    label: "Closed",
  },
];

const CaseFilter = ({
  selected,
  onSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const active =
          selected === filter.key;

        return (
          <Pressable
            key={filter.key}
            onPress={() => onSelect(filter.key)}
            style={[
              styles.filter,
              active && styles.activeFilter,
            ]}
          >
            <AppText
              size="sm"
              weight={active ? "semiBold" : "medium"}
              color={
                active
                  ? "textWhite"
                  : "textSecondary"
              }
            >
              {filter.label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.md,
  },

  filter: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },

  activeFilter: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});

export default CaseFilter;