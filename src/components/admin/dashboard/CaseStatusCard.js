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
  green: "#3D9B68",
  red: "#D9534F",
  blue: "#547DA8",
};

/* Legacy chart records disabled; dashboard data must come from API. */
const STATUS_DATA = [];
/*
const LEGACY_STATUS_DATA = [
  {
    label: "Open",
    value: 7,
    color: COLORS.blue,
  },
  {
    label: "Pending",
    value: 2,
    color: COLORS.gold,
  },
  {
    label: "Closed",
    value: 1,
    color: COLORS.green,
  },
]; */

const CaseStatusCard = ({ data = [] }) => {
  const rows = data.length ? data : STATUS_DATA;
  const total = rows.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <View style={styles.card}>
      <AppText
        size="lg"
        weight="bold"
      >
        Case Status Overview
      </AppText>

      <AppText
        size="sm"
        color="textSecondary"
        style={styles.subtitle}
      >
        Current distribution of case statuses
      </AppText>

      <View style={styles.content}>
        <View style={styles.chart}>
          <View style={styles.outerRing}>
            <View style={styles.innerCircle}>
              <AppText
                size="xl"
                weight="bold"
              >
                {total}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
              >
                Cases
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.legend}>
          {rows.map((item) => {
            const percentage =
              total === 0
                ? 0
                : Math.round(
                    (item.value / total) * 100
                  );

            return (
              <View
                key={item.label}
                style={styles.legendItem}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        item.color,
                    },
                  ]}
                />

                <View
                  style={
                    styles.legendContent
                  }
                >
                  <AppText
                    size="sm"
                    weight="semiBold"
                  >
                    {item.label}
                  </AppText>

                  <AppText
                    size="xs"
                    color="textSecondary"
                  >
                    {item.value} cases
                  </AppText>
                </View>

                <AppText
                  size="sm"
                  weight="bold"
                >
                  {percentage}%
                </AppText>
              </View>
            );
          })}
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
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  subtitle: {
    marginTop: 4,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },

  chart: {
    width: 145,
    height: 145,
    alignItems: "center",
    justifyContent: "center",
  },

  outerRing: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 17,
    borderColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  legend: {
    flex: 1,
    marginLeft: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },

  legendContent: {
    flex: 1,
  },
});

export default CaseStatusCard;
