import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#F5F2EA",
};

const AppScreen = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container,
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default AppScreen;
