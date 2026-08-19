import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
};

const SettingsSection = ({
  title,
  children,
}) => {
  return (
    <View style={styles.container}>
      <AppText
        size="sm"
        weight="bold"
        style={styles.title}
      >
        {title}
      </AppText>

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    color: COLORS.navy,
    marginBottom: 9,
    marginLeft: 4,
  },

  content: {
    width: "100%",
  },
});

export default SettingsSection;