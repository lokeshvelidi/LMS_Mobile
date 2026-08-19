import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import Svg, {
  Circle,
} from "react-native-svg";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#18558D",
  gold: "#DDB52F",
  white: "#FFFDF8",
  border: "#E5DED0",
  text: "#102A43",
  secondary: "#61758A",
};

const CaseStatusChart = ({ statusCounts = {} }) => {
  const size = 190;
  const strokeWidth = 34;
  const radius = 60;
  const circumference =
    2 * Math.PI * radius;

  const entries = Object.entries(statusCounts).slice(0, 2);
  const first = entries[0] ?? ["No cases", 0];
  const second = entries[1] ?? ["Other", 0];
  const total = first[1] + second[1];

  const newLength =
    (total ? first[1] / total : 0) *
    circumference;

  const progressLength =
    (total ? second[1] / total : 0) *
    circumference;

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        My Case Status
      </AppText>

      <View style={styles.chartContainer}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EEF0F2"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={COLORS.navy}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${newLength} ${circumference}`}
            strokeDashoffset={0}
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={COLORS.gold}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${progressLength} ${circumference}`}
            strokeDashoffset={
              -newLength
            }
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  COLORS.navy,
              },
            ]}
          />

          <AppText
            size="xs"
            color="textSecondary"
          >
            {first[0]} ({first[1]})
          </AppText>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  COLORS.gold,
              },
            ]}
          />

          <AppText
            size="xs"
            color="textSecondary"
          >
            {second[0]} ({second[1]})
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    minHeight: 330,
  },

  title: {
    color: COLORS.text,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 22,
    marginTop: 2,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 14,
    height: 7,
    marginRight: 7,
  },
});

export default CaseStatusChart;
