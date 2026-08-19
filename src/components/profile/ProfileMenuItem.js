import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const ProfileMenuItem = ({
  title,
  subtitle,
  onPress,
  danger = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.icon}>
        <View
          style={[
            styles.iconShape,
            danger && styles.dangerIcon,
          ]}
        />
      </View>

      <View style={styles.content}>
        <AppText
          size="md"
          weight="medium"
          color={danger ? "danger" : "textPrimary"}
        >
          {title}
        </AppText>

        {subtitle ? (
          <AppText
            size="xs"
            color="textSecondary"
            style={styles.subtitle}
          >
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <AppText
        size="xl"
        color="textTertiary"
      >
        ›
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },

  pressed: {
    opacity: 0.6,
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  iconShape: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
  },

  dangerIcon: {
    borderColor: theme.colors.danger,
  },

  content: {
    flex: 1,
  },

  subtitle: {
    marginTop: 2,
  },
});

export default ProfileMenuItem;
