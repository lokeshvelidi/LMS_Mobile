import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  gold: "#E5B93F",
};

const AppHeader = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.titleIndicator} />

        <AppText
          size="xl"
          weight="bold"
        >
          {title}
        </AppText>
      </View>

      {subtitle ? (
        <AppText
          size="sm"
          color="textSecondary"
          style={styles.subtitle}
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleIndicator: {
    width: 5,
    height: 28,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    marginRight: 10,
  },

  subtitle: {
    marginTop: 7,
    paddingLeft: 15,
  },
});

export default AppHeader;
