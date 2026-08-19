import React, {
  useMemo,
  useState,
} from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
  lightGold: "#FFF8E6",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const HearingCalendar = ({
  hearings = [],
  onDatePress,
}) => {
  const today = new Date();

  const [month, setMonth] =
    useState(today.getMonth());

  const [year, setYear] =
    useState(today.getFullYear());

  const selectedDateInitial =
    today.getDate();

  const [selectedDate, setSelectedDate] =
    useState(selectedDateInitial);

  const daysInMonth = useMemo(() => {
    return new Date(
      year,
      month + 1,
      0
    ).getDate();
  }, [month, year]);

  const firstDay = useMemo(() => {
    return new Date(
      year,
      month,
      1
    ).getDay();
  }, [month, year]);

  const hearingDates = useMemo(() => {
    return new Set(
      hearings
        .map((item) => {
          const value =
            item.dateValue;

          if (!value) {
            return null;
          }

          const date = new Date(value);

          if (
            date.getFullYear() !== year ||
            date.getMonth() !== month
          ) {
            return null;
          }

          return date.getDate();
        })
        .filter(Boolean)
    );
  }, [hearings, month, year]);

  const changeMonth = (direction) => {
    let nextMonth = month + direction;
    let nextYear = year;

    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    }

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    setMonth(nextMonth);
    setYear(nextYear);
    setSelectedDate(1);
  };

  const days = [];

  for (
    let i = 0;
    i < firstDay;
    i += 1
  ) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day += 1
  ) {
    days.push(day);
  }

  return (
    <View style={styles.card}>
      {/* Month Header */}

      <View style={styles.monthHeader}>
        <Pressable
          onPress={() =>
            changeMonth(-1)
          }
          style={styles.arrowButton}
        >
          <AppText
            size="lg"
            weight="bold"
            style={styles.arrow}
          >
            ‹
          </AppText>
        </Pressable>

        <AppText
          size="lg"
          weight="bold"
          style={styles.monthTitle}
        >
          {MONTHS[month]} {year}
        </AppText>

        <Pressable
          onPress={() =>
            changeMonth(1)
          }
          style={styles.arrowButton}
        >
          <AppText
            size="lg"
            weight="bold"
            style={styles.arrow}
          >
            ›
          </AppText>
        </Pressable>
      </View>

      {/* Week days */}

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day) => (
          <View
            key={day}
            style={styles.weekDay}
          >
            <AppText
              size="xs"
              weight="semiBold"
              style={styles.weekDayText}
            >
              {day}
            </AppText>
          </View>
        ))}
      </View>

      {/* Calendar days */}

      <View style={styles.daysGrid}>
        {days.map((day, index) => {
          const selected =
            day === selectedDate;

          const hasHearing =
            day &&
            hearingDates.has(day);

          return (
            <Pressable
              key={`${year}-${month}-${index}`}
              disabled={!day}
              onPress={() => {
                if (!day) {
                  return;
                }

                setSelectedDate(day);

                onDatePress?.({
                  day,
                  month,
                  year,
                });
              }}
              style={[
                styles.dayCell,
                selected &&
                  styles.selectedDay,
              ]}
            >
              {day && (
                <>
                  <AppText
                    size="sm"
                    weight={
                      selected
                        ? "bold"
                        : "medium"
                    }
                    style={[
                      styles.dayText,
                      selected &&
                        styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </AppText>

                  {hasHearing && (
                    <View
                      style={
                        styles.hearingDot
                      }
                    />
                  )}
                </>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Legend */}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={styles.legendDot}
          />

          <AppText
            size="xs"
            color="textSecondary"
          >
            Hearing scheduled
          </AppText>
        </View>
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
    padding: 15,
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    color: COLORS.navy,
    lineHeight: 24,
  },

  monthTitle: {
    color: COLORS.navy,
  },

  weekRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  weekDay: {
    width: "14.2857%",
    alignItems: "center",
    paddingVertical: 7,
  },

  weekDayText: {
    color: COLORS.secondary,
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayCell: {
    width: "14.2857%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    marginBottom: 3,
  },

  selectedDay: {
    backgroundColor: COLORS.gold,
  },

  dayText: {
    color: COLORS.navy,
  },

  selectedDayText: {
    color: COLORS.navy,
  },

  hearingDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.navy,
    marginTop: 3,
  },

  legend: {
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    marginTop: 12,
    paddingTop: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.navy,
    marginRight: 7,
  },
});

export default HearingCalendar;