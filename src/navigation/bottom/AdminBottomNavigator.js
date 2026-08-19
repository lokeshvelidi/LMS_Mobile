import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AdminDashboardScreen from "../../screens/admin/dashboard/AdminDashboardScreen";
import AdminCasesScreen from "../../screens/admin/cases/CasesScreen";
import AdminUsersScreen from "../../screens/admin/users/UsersScreen";
import AdminReportsScreen from "../../screens/admin/reports/ReportsScreen";
import AdminMoreScreen from "./AdminMoreScreen";
import AdminClientsScreen from "../../screens/admin/clients/ClientsScreen";

const Tab = createBottomTabNavigator();
const icons = {AdminDashboard: ["home-outline", "home"], Cases: ["briefcase-outline", "briefcase"], Clients: ["person-outline", "person"], Users: ["people-outline", "people"], ReportsTab: ["bar-chart-outline", "bar-chart"], More: ["grid-outline", "grid"]};

const AdminBottomNavigator = () => {
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
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />

      <Tab.Screen
        name="Cases"
        component={AdminCasesScreen}
        options={{
          title: "Cases",
        }}
      />

      <Tab.Screen
        name="Users"
        component={AdminUsersScreen}
        options={{
          title: "Users",
        }}
      />

      <Tab.Screen name="Clients" component={AdminClientsScreen} options={{ title: "Clients" }} />

      <Tab.Screen
        name="ReportsTab"
        component={AdminReportsScreen}
        options={{
          title: "Reports",
        }}
      />

      <Tab.Screen
        name="More"
        component={AdminMoreScreen}
        options={{
          title: "More",
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigator;
