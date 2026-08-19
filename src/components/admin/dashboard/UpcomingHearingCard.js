import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
  gold: "#E5B93F",
};

/* Legacy chart records disabled; dashboard data must come from API. */
const HEARINGS = [];
/*
const LEGACY_HEARINGS = [
  {
    id: "1",
    date: "05",
    month: "JUL",
    title: "Client Meeting",
    caseNumber: "CASE-1024",
    time: "10:30 AM",
  },
  {
    id: "2",
    date: "06",
    month: "JUL",
    title: "Court Hearing",
    caseNumber: "CASE-1025",
    time: "11:00 AM",
  },
  {
    id: "3",
    date: "07",
    month: "JUL",
    title: "Advocate Meeting",
    caseNumber: "CASE-1028",
    time: "02:30 PM",
  },
]; */

const UpcomingHearingCard = ({ data = [] }) => {
  const rows = data.length ? data : HEARINGS;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText
            size="lg"
            weight="bold"
          >
            Upcoming Hearings
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Your next scheduled events
          </AppText>
        </View>

        <View style={styles.countBadge}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.countText}
          >
            {rows.length}
          </AppText>
        </View>
      </View>

      <View style={styles.list}>
        {rows.length === 0 ? <AppText size="sm" color="textSecondary">No upcoming hearings available</AppText> : rows.map((hearing) => (
          <View
            key={hearing.id}
            style={styles.hearing}
          >
            <View style={styles.dateBox}>
              <AppText
                size="lg"
                weight="bold"
                style={styles.date}
              >
                {hearing.date}
              </AppText>

              <AppText
                size="xs"
                weight="bold"
                style={styles.month}
              >
                {hearing.month}
              </AppText>
            </View>

            <View style={styles.details}>
              <AppText
                size="sm"
                weight="bold"
                numberOfLines={1}
              >
                {hearing.title}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.caseNumber}
              >
                {hearing.caseNumber}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
              >
                {hearing.time}
              </AppText>
            </View>

            <View style={styles.arrow}>
              <AppText
                size="lg"
                style={styles.arrowText}
              >
                ›
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  subtitle: {
    marginTop: 4,
  },

  countBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    color: COLORS.navy,
  },

  list: {
    marginTop: 18,
  },

  hearing: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
  },

  dateBox: {
    width: 52,
    height: 56,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  date: {
    color: COLORS.white,
  },

  month: {
    color: COLORS.gold,
    marginTop: -2,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  caseNumber: {
    marginTop: 3,
    marginBottom: 2,
  },

  arrow: {
    width: 28,
    alignItems: "center",
  },

  arrowText: {
    color: COLORS.secondary,
  },
});

export default UpcomingHearingCard;
