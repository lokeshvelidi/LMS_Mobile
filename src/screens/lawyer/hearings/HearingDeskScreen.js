import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import HearingFilter from "../../../components/lawyer/hearings/HearingFilter";

import HearingCard from "../../../components/lawyer/hearings/HearingCard";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerHearings } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const HearingDeskScreen = ({
  navigation,
}) => {
  const [search, setSearch] =
    useState("");

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState("Upcoming");

  const [
    sortAscending,
    setSortAscending,
  ] = useState(true);

  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getLawyerHearings()
      .then((items) => active && setHearings(items))
      .catch((requestError) => {
        if (!active) return;
        setHearings([]);
        setError(getApiErrorMessage(requestError, "Unable to load hearings."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredHearings =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      let result =
        hearings.filter((item) => {
          const matchesSearch =
            !searchValue ||
            item.caseNumber
              .toLowerCase()
              .includes(searchValue) ||
            item.client
              .toLowerCase()
              .includes(searchValue) ||
            item.court
              .toLowerCase()
              .includes(searchValue);

          let matchesFilter = true;

          if (
            selectedFilter ===
            "Upcoming"
          ) {
            matchesFilter = Boolean(item.dateValue) && item.dateValue >= new Date().toISOString().slice(0, 10);
          }

          if (
            selectedFilter ===
            "Today"
          ) {
            matchesFilter = item.dateValue === new Date().toISOString().slice(0, 10);
          }

          return (
            matchesSearch &&
            matchesFilter
          );
        });

      result.sort((a, b) => {
        const first =
          new Date(a.dateValue).getTime();

        const second =
          new Date(b.dateValue).getTime();

        return sortAscending
          ? first - second
          : second - first;
      });

      return result;
    }, [
      hearings,
      search,
      selectedFilter,
      sortAscending,
    ]);

  const handleHearingPress = (
    item
  ) => {
    navigation
      ?.getParent()
      ?.navigate(
        "HearingDetails",
        {
          hearing: item,
        }
      );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* Header */}

        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Hearing Desk
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            View and manage hearings for
            your assigned cases.
          </AppText>
        </View>

        {/* Filter */}

        <HearingFilter
          search={search}
          setSearch={setSearch}
          selectedFilter={
            selectedFilter
          }
          setSelectedFilter={
            setSelectedFilter
          }
          sortAscending={
            sortAscending
          }
          setSortAscending={
            setSortAscending
          }
        />

        {/* Results */}

        <View style={styles.resultsHeader}>
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.resultText}
          >
            {filteredHearings.length}{" "}
            {filteredHearings.length ===
            1
              ? "hearing"
              : "hearings"}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
          >
            {selectedFilter}
          </AppText>
        </View>

        {loading ? (
          <View style={styles.empty}><ActivityIndicator size="large" color={COLORS.navy} /></View>
        ) : error ? (
          <View style={styles.empty}>
            <AppText size="sm" color="textSecondary" style={styles.emptyText}>{error}</AppText>
            <Pressable style={styles.retryButton} onPress={() => setReloadKey((value) => value + 1)}>
              <AppText size="sm" weight="bold" style={styles.retryText}>Retry</AppText>
            </Pressable>
          </View>
        ) : filteredHearings.length >
        0 ? (
          filteredHearings.map(
            (item) => (
              <HearingCard
                key={item.id}
                item={item}
                onPress={
                  handleHearingPress
                }
              />
            )
          )
        ) : (
          <View style={styles.empty}>
            <AppText
              size="md"
              weight="semiBold"
              style={styles.emptyTitle}
            >
              No Hearings
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              There are no hearings
              matching the selected
              filters.
            </AppText>
          </View>
        )}

        {/* Calendar button */}

        <View style={styles.calendarCard}>
          <AppText
            size="md"
            weight="bold"
            style={styles.calendarTitle}
          >
            Hearing Calendar
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.calendarDescription}
          >
            Open the calendar to review
            hearings by date.
          </AppText>

          <View
            style={styles.calendarButton}
            onTouchEnd={() =>
              navigation
                ?.getParent()
                ?.navigate(
                  "HearingCalendar"
                )
            }
          >
            <AppText
              size="sm"
              weight="bold"
              style={
                styles.calendarButtonText
              }
            >
              Open Hearing Calendar
            </AppText>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 3,
  },

  resultText: {
    color: COLORS.navy,
  },

  empty: {
    minHeight: 180,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  emptyTitle: {
    color: COLORS.navy,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 14,
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  retryText: { color: "#FFFFFF" },

  calendarCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginTop: 14,
  },

  calendarTitle: {
    color: COLORS.navy,
  },

  calendarDescription: {
    marginTop: 5,
  },

  calendarButton: {
    height: 48,
    backgroundColor: COLORS.navy,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  calendarButtonText: {
    color: "#FFFFFF",
  },

  bottomSpace: {
    height: 25,
  },
});

export default HearingDeskScreen;
