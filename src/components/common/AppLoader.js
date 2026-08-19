import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import theme from "../../theme/theme";

const AppLoader = ({ fullScreen = false }) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
      ]}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xxl,
  },

  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default AppLoader;