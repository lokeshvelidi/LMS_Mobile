import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ClerkDashboardScreen from "../../screens/clerk/dashboard/ClerkDashboardScreen";
import ClerkClientsScreen from "../../screens/clerk/clients/ClientListScreen";
import ClerkCasesScreen from "../../screens/clerk/cases/CaseDeskScreen";
import MyScheduleScreen from "../../screens/clerk/schedule/MyScheduleScreen";
import ClerkProfileScreen from "../../screens/clerk/profile/ClerkProfileScreen";

const Tab = createBottomTabNavigator();
const icons = {ClerkDashboard: ["home-outline", "home"], ClerkClients: ["people-outline", "people"], ClerkCases: ["briefcase-outline", "briefcase"], ClerkSchedule: ["calendar-outline", "calendar"], ClerkProfile: ["person-outline", "person"]};

const ClerkBottomNavigator = () => {
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
        name="ClerkDashboard"
        component={ClerkDashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />

      <Tab.Screen
        name="ClerkClients"
        component={ClerkClientsScreen}
        options={{
          title: "Clients",
        }}
      />

      <Tab.Screen
        name="ClerkCases"
        component={ClerkCasesScreen}
        options={{
          title: "Cases",
        }}
      />

      <Tab.Screen
        name="ClerkSchedule"
        component={MyScheduleScreen}
        options={{
          title: "Schedule",
        }}
      />

      <Tab.Screen
        name="ClerkProfile"
        component={ClerkProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default ClerkBottomNavigator;
