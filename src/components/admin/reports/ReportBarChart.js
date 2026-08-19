import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  border: "#E6E0D4",
  gold: "#E5B93F",
  white: "#FFFDF8",
};

const ReportBarChart = ({
  title,
  subtitle,
  data,
}) => {
  const maximum =
    Math.max(
      ...data.map(
        (item) => item.value
      ),
      1
    );

  return (
    <View style={styles.card}>
      <AppText
        size="lg"
        weight="bold"
      >
        {title}
      </AppText>

      {subtitle ? (
        <AppText
          size="sm"
          color="textSecondary"
          style={styles.subtitle}
        >
          {subtitle}
        </AppText>
      ) : null}

      <View style={styles.chart}>
        {data.map((item) => {
          const height =
            (item.value / maximum) *
            145;

          return (
            <View
              key={item.label}
              style={styles.column}
            >
              <View
                style={styles.valueContainer}
              >
                <AppText
                  size="xs"
                  weight="semiBold"
                >
                  {item.value}
                </AppText>
              </View>

              <View
                style={styles.barArea}
              >
                <View
                  style={[
                    styles.bar,
                    {
                      height:
                        Math.max(
                          height,
                          5
                        ),
                    },
                  ]}
                />
              </View>

              <AppText
                size="xs"
                color="textSecondary"
                numberOfLines={1}
                style={styles.label}
              >
                {item.label}
              </AppText>
            </View>
          );
        })}
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

  chart: {
    height: 220,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  column: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  valueContainer: {
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  barArea: {
    height: 165,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bar: {
    width: 28,
    maxHeight: 145,
    minHeight: 5,
    backgroundColor: COLORS.gold,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  label: {
    width: 55,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});

export default ReportBarChart;