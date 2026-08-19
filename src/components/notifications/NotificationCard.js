import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppCard from "../common/AppCard";
import AppText from "../common/AppText";
import theme from "../../theme/theme";

const NotificationCard = ({
  notification,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <AppCard
        style={[
          styles.card,
          !notification.read && styles.unread,
        ]}
      >
        <View style={styles.row}>
          <View style={styles.icon}>
            <View style={styles.iconShape} />
          </View>

          <View style={styles.content}>
            <AppText
              size="md"
              weight={
                notification.read
                  ? "medium"
                  : "semiBold"
              }
              numberOfLines={2}
            >
              {notification.title}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.message}
              numberOfLines={2}
            >
              {notification.message}
            </AppText>

            <AppText
              size="xs"
              color="textTertiary"
              style={styles.time}
            >
              {notification.time}
            </AppText>
          </View>

          {!notification.read && (
            <View style={styles.dot} />
          )}
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },

  unread: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentLight,
  },

  pressed: {
    opacity: 0.75,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  iconShape: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },

  content: {
    flex: 1,
  },

  message: {
    marginTop: theme.spacing.xs,
  },

  time: {
    marginTop: theme.spacing.sm,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
    marginLeft: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
});

export default NotificationCard;
