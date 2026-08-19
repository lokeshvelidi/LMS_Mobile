import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ClientDashboardScreen from "../../screens/clients/dashboard/ClientDashboardScreen";
import ClientCasesScreen from "../../screens/clients/myCases/ClientMyCasesScreen";
import ClientTimelineScreen from "../../screens/clients/timeline/ClientTimelineScreen";
import ClientNotificationsScreen from "../../screens/clients/notifications/ClientNotificationsScreen";
import ClientProfileScreen from "../../screens/clients/profile/ClientProfileScreen";

const Tab = createBottomTabNavigator();
const icons = {ClientDashboard: ["home-outline", "home"], ClientCases: ["briefcase-outline", "briefcase"], ClientTimeline: ["git-branch-outline", "git-branch"], ClientNotifications: ["notifications-outline", "notifications"], ClientProfile: ["person-outline", "person"]};

const ClientBottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: "#18324D",
        tabBarInactiveTintColor: "#718198",
        tabBarStyle: {height: 64, marginBottom: 12, marginHorizontal: 12, borderRadius: 16, paddingTop: 6, paddingBottom: 6},
        tabBarIcon: ({color, size, focused}) => <Ionicons name={icons[route.name]?.[focused ? 1 : 0] || "ellipse-outline"} size={size} color={color} />,
      })}
    >
      <Tab.Screen
        name="ClientDashboard"
        component={ClientDashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />

      <Tab.Screen
        name="ClientCases"
        component={ClientCasesScreen}
        options={{
          title: "My Cases",
        }}
      />

      <Tab.Screen
        name="ClientTimeline"
        component={ClientTimelineScreen}
        options={{
          title: "Timeline",
        }}
      />

      <Tab.Screen
        name="ClientNotifications"
        component={ClientNotificationsScreen}
        options={{
          title: "Notifications",
        }}
      />

      <Tab.Screen
        name="ClientProfile"
        component={ClientProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default ClientBottomNavigator;
