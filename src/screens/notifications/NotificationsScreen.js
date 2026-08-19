import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import NotificationCard from "../../components/notifications/NotificationCard";

import theme from "../../theme/theme";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Upcoming Hearing",
      message:
        "Your hearing for CASE-001 is scheduled for 20 Aug 2026.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Case Updated",
      message:
        "CASE-002 has been updated.",
      time: "Yesterday",
      read: false,
    },
    {
      id: "3",
      title: "Document Added",
      message:
        "A new document was added to CASE-003.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const handleNotificationPress = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  return (
    <AppScreen>
      <AppHeader
        title="Notifications"
        subtitle="Stay up to date"
        showNotification={false}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <AppText size="lg" weight="semiBold">
            Recent Notifications
          </AppText>

          <Pressable onPress={markAllAsRead}>
            <AppText
              size="sm"
              color="primary"
              weight="medium"
            >
              Mark all read
            </AppText>
          </Pressable>
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onPress={() =>
                handleNotificationPress(item.id)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },

  list: {
    paddingBottom: theme.spacing.xxl,
  },
});

export default NotificationsScreen;