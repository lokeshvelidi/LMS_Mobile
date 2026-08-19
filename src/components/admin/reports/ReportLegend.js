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
  blue: "#547DA8",
  gold: "#E5B93F",
  green: "#3D9B68",
  red: "#D9534F",
};

const ReportLegend = ({
  title,
  data,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="lg"
        weight="bold"
      >
        {title}
      </AppText>

      <View style={styles.list}>
        {data.map((item) => (
          <View
            key={item.label}
            style={styles.item}
          >
            <View style={styles.left}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      item.color ||
                      COLORS.blue,
                  },
                ]}
              />

              <AppText
                size="sm"
                weight="medium"
              >
                {item.label}
              </AppText>
            </View>

            <AppText
              size="sm"
              weight="bold"
            >
              {item.value}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFDF8",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  list: {
    marginTop: 17,
  },

  item: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 9,
  },
});

export default ReportLegend;