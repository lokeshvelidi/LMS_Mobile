import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/admin/dashboard/DashboardScreen";
import CasesScreen from "../screens/cases/CasesScreen";
import ClientsScreen from "../screens/clients/ClientsScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import DocumentsScreen from "../screens/documents/DocumentsScreen";
import theme from "../theme/theme";
import AppText from "../components/common/AppText";

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused, icon, activeIcon }) => (
  <View style={styles.iconContainer}>
    <Ionicons
      name={focused ? activeIcon : icon}
      size={22}
      color={focused ? theme.colors.accent : theme.colors.textSecondary}
    />
    <AppText
      size="xs"
      weight={focused ? "semiBold" : "regular"}
      style={[
        styles.label,
        focused && styles.activeLabel,
      ]}
    >
      {label}
    </AppText>
  </View>
);

const screens = [
  ["Dashboard", DashboardScreen, "Home", "home-outline", "home"],
  ["Cases", CasesScreen, "Cases", "briefcase-outline", "briefcase"],
  ["Clients", ClientsScreen, "Clients", "people-outline", "people"],
  ["Documents", DocumentsScreen, "Files", "folder-outline", "folder"],
  ["Profile", ProfileScreen, "Profile", "person-outline", "person"],
];

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarHideOnKeyboard: true,
      tabBarItemStyle: styles.tabBarItem,
    }}
  >
    {screens.map(([name, component, label, icon, activeIcon]) => (
      <Tab.Screen
        key={name}
        name={name}
        component={component}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label={label}
              focused={focused}
              icon={icon}
              activeIcon={activeIcon}
            />
          ),
        }}
      />
    ))}

    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ tabBarButton: () => null }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 76,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  iconContainer: {
    minWidth: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: theme.colors.textSecondary,
    marginTop: 3,
  },
  activeLabel: {
    color: theme.colors.accent,
  },
});

export default BottomTabNavigator;
