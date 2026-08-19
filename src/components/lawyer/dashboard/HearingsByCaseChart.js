import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  white: "#FFFDF8",
  border: "#E5DED0",
  secondary: "#61758A",
  grid: "#E8E5DE",
};

const HearingsByCaseChart = ({ hearings = [] }) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Hearings by Case
      </AppText>

      <View style={styles.chart}>
        <View style={styles.yAxis}>
          <AppText
            size="xs"
            color="textSecondary"
          >
            1
          </AppText>

          <View style={styles.verticalLine} />

          <AppText
            size="xs"
            color="textSecondary"
          >
            0
          </AppText>
        </View>

        <View style={styles.chartArea}>
          <View
            style={styles.horizontalLineTop}
          />

          <View
            style={styles.horizontalLineBottom}
          />

          <View style={styles.emptyState}>
            <AppText
              size="xs"
              color="textSecondary"
            >
              {hearings.length ? `${hearings.length} recorded hearings` : "No Hearings"}
            </AppText>
          </View>
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
    color: COLORS.navy,
  },

  chart: {
    flexDirection: "row",
    height: 240,
    marginTop: 20,
  },

  yAxis: {
    width: 24,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.grid,
  },

  chartArea: {
    flex: 1,
    marginLeft: 6,
    position: "relative",
    justifyContent: "center",
  },

  horizontalLineTop: {
    position: "absolute",
    top: 3,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.grid,
  },

  horizontalLineBottom: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.grid,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default HearingsByCaseChart;
