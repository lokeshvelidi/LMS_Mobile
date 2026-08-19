import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
};

const HearingFilter = ({
  search,
  setSearch,
  selectedFilter,
  setSelectedFilter,
  sortAscending,
  setSortAscending,
}) => {
  const filters = [
    "Today",
    "Upcoming",
    "All",
  ];

  return (
    <View style={styles.card}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search case no / client..."
        placeholderTextColor="#8A99A8"
        style={styles.search}
      />

      <View style={styles.filterRow}>
        {filters.map((item) => {
          const active =
            selectedFilter === item;

          return (
            <Pressable
              key={item}
              onPress={() =>
                setSelectedFilter(item)
              }
              style={[
                styles.filter,
                active && styles.activeFilter,
              ]}
            >
              <AppText
                size="xs"
                weight={
                  active
                    ? "bold"
                    : "medium"
                }
                style={{
                  color: active
                    ? COLORS.navy
                    : COLORS.secondary,
                }}
              >
                {item}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <AppText
          size="xs"
          color="textSecondary"
        >
          Sort by Hearing Date
        </AppText>

        <Pressable
          onPress={() =>
            setSortAscending(
              !sortAscending
            )
          }
          style={styles.sortButton}
        >
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.sortText}
          >
            {sortAscending
              ? "Ascending ↑"
              : "Descending ↓"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 15,
  },

  search: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 14,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  filter: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilter: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  sortRow: {
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
  },

  sortText: {
    color: COLORS.navy,
  },
});

export default HearingFilter;