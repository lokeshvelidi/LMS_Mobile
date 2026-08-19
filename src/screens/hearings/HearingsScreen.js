import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";

import HearingCard from "../../components/hearings/HearingCard";
import HearingSearch from "../../components/hearings/HearingSearch";

import theme from "../../theme/theme";

const FILTERS = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "upcoming",
    label: "Upcoming",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "postponed",
    label: "Postponed",
  },
];

const HearingsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("all");

  /*
   * This is only UI data for now.
   * API integration will replace this later.
   */
  const hearings = [
    {
      id: "1",
      day: "20",
      month: "AUG",
      date: "20 Aug 2026",
      time: "10:30 AM",
      caseTitle: "Property Dispute",
      caseNumber: "CASE-001",
      clientName: "Rajesh Kumar",
      court: "District Court",
      status: "upcoming",
    },
    {
      id: "2",
      day: "25",
      month: "AUG",
      date: "25 Aug 2026",
      time: "11:00 AM",
      caseTitle: "Civil Matter",
      caseNumber: "CASE-002",
      clientName: "Priya Sharma",
      court: "High Court",
      status: "upcoming",
    },
    {
      id: "3",
      day: "28",
      month: "AUG",
      date: "28 Aug 2026",
      time: "02:00 PM",
      caseTitle: "Contract Dispute",
      caseNumber: "CASE-003",
      clientName: "Suresh Reddy",
      court: "District Court",
      status: "postponed",
    },
    {
      id: "4",
      day: "05",
      month: "AUG",
      date: "05 Aug 2026",
      time: "09:30 AM",
      caseTitle: "Land Dispute",
      caseNumber: "CASE-004",
      clientName: "Ramesh Kumar",
      court: "Civil Court",
      status: "completed",
    },
  ];

  const filteredHearings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return hearings.filter((hearing) => {
      const matchesSearch =
        !searchValue ||
        hearing.caseTitle
          .toLowerCase()
          .includes(searchValue) ||
        hearing.caseNumber
          .toLowerCase()
          .includes(searchValue) ||
        hearing.clientName
          .toLowerCase()
          .includes(searchValue) ||
        hearing.court
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        selectedFilter === "all" ||
        hearing.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  const handleHearingPress = (hearing) => {
    navigation.navigate("HearingDetails", {
      hearing,
    });
  };

  return (
    <AppScreen>
      <AppHeader
        title="Hearings"
        subtitle="Upcoming and scheduled hearings"
        showNotification={false}
      />

      <View style={styles.container}>
        <HearingSearch
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filterContainer}>
          {FILTERS.map((filter) => {
            const isActive =
              selectedFilter === filter.key;

            return (
              <Pressable
                key={filter.key}
                onPress={() =>
                  setSelectedFilter(filter.key)
                }
                style={[
                  styles.filterButton,
                  isActive && styles.activeFilterButton,
                ]}
              >
                <AppText
                  size="sm"
                  weight={
                    isActive
                      ? "semiBold"
                      : "medium"
                  }
                  color={
                    isActive
                      ? "textWhite"
                      : "textSecondary"
                  }
                >
                  {filter.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.resultHeader}>
          <AppText
            size="sm"
            color="textSecondary"
          >
            {filteredHearings.length}{" "}
            {filteredHearings.length === 1
              ? "hearing"
              : "hearings"}
          </AppText>
        </View>

        <FlatList
          data={filteredHearings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HearingCard
              hearing={item}
              onPress={() =>
                handleHearingPress(item)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            filteredHearings.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <View style={styles.emptyIconShape} />
              </View>

              <AppText
                size="lg"
                weight="semiBold"
              >
                No hearings found
              </AppText>

              <AppText
                size="sm"
                color="textSecondary"
                style={styles.emptyText}
              >
                Try changing your search or filter.
              </AppText>
            </View>
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.sm,
  },

  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },

  activeFilterButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  resultHeader: {
    marginBottom: theme.spacing.md,
  },

  list: {
    paddingBottom: theme.spacing.xxxl,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xxl,
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  emptyIconShape: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.textTertiary,
    borderRadius: 5,
  },

  emptyText: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },
});

export default HearingsScreen;