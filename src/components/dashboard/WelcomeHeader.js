import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const WelcomeHeader = ({ name = "User" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText size="sm" color="secondary" weight="semiBold">
          WELCOME BACK
        </AppText>

        <AppText
          size="display"
          weight="bold"
          heading
          numberOfLines={1}
        >
          Good morning, {name}
        </AppText>

        <AppText size="sm" color="textSecondary" style={styles.subtitle}>
          Here is what needs your attention today.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.sm,
    marginBottom: theme.spacing.xxl,
  },

  textContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
});

export default WelcomeHeader;
