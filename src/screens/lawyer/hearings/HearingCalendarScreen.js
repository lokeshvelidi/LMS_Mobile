import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import HearingCalendar from "../../../components/lawyer/hearings/HearingCalendar";

import CalendarHearingCard from "../../../components/lawyer/hearings/CalendarHearingCard";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerHearings } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const HearingCalendarScreen = ({
  navigation,
}) => {
  const [hearings, setHearings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getLawyerHearings()
      .then((items) => active && setHearings(items))
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, "Unable to load hearing calendar."));
      });
    return () => { active = false; };
  }, []);

  const [selectedDate, setSelectedDate] =
    useState({
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });

  const selectedHearings = useMemo(() => {
    return hearings.filter((item) => {
      const date =
        new Date(item.dateValue);

      return (
        date.getDate() ===
          selectedDate.day &&
        date.getMonth() ===
          selectedDate.month &&
        date.getFullYear() ===
          selectedDate.year
      );
    });
  }, [hearings, selectedDate]);

  const handleDatePress = ({
    day,
    month,
    year,
  }) => {
    setSelectedDate({
      day,
      month,
      year,
    });
  };

  const handleHearingPress = (
    hearing
  ) => {
    navigation
      ?.getParent()
      ?.navigate(
        "HearingDetails",
        {
          hearing,
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
            Hearing Calendar
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            View your assigned hearings by
            date.
          </AppText>
        </View>

        {/* Calendar */}

        <HearingCalendar
          hearings={hearings}
          onDatePress={
            handleDatePress
          }
        />

        {/* Selected date */}

        <View style={styles.selectedHeader}>
          <View>
            <AppText
              size="md"
              weight="bold"
              style={styles.selectedTitle}
            >
              Selected Date
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.selectedDate}
            >
              {selectedDate.day} /{" "}
              {selectedDate.month + 1} /{" "}
              {selectedDate.year}
            </AppText>
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.count}
          >
            {selectedHearings.length}{" "}
            {selectedHearings.length ===
            1
              ? "hearing"
              : "hearings"}
          </AppText>
        </View>

        {/* Hearings */}

        {selectedHearings.length >
        0 ? (
          selectedHearings.map(
            (item) => (
              <CalendarHearingCard
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
              {error || "There are no hearings scheduled for this date."}
            </AppText>
          </View>
        )}

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

  selectedHeader: {
    marginTop: 18,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedTitle: {
    color: COLORS.navy,
  },

  selectedDate: {
    marginTop: 4,
  },

  count: {
    color: COLORS.navy,
  },

  empty: {
    minHeight: 160,
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
    textAlign: "center",
    marginTop: 6,
  },

  bottomSpace: {
    height: 30,
  },
});

export default HearingCalendarScreen;
