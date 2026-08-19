import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const SectionHeader = ({
  title,
  actionLabel,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <AppText
        size="lg"
        weight="semiBold"
        heading
      >
        {title}
      </AppText>

      {actionLabel ? (
        <AppText
          size="sm"
          color="secondary"
          weight="medium"
          onPress={onActionPress}
        >
          {actionLabel}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
});

export default SectionHeader;
