import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import LawyerDashboardScreen from "../../screens/lawyer/dashboard/LawyerDashboardScreen";
import LawyerCasesScreen from "../../screens/lawyer/assignedCases/AssignedCasesScreen";
import LawyerScheduleScreen from "../../screens/lawyer/hearings/HearingDeskScreen";
import LawyerDocumentsScreen from "../../screens/lawyer/preparePetition/PreparePetitionScreen";
import LawyerProfileScreen from "../../screens/lawyer/profile/LawyerProfileScreen";

const Tab = createMaterialTopTabNavigator();
const icons = {LawyerDashboard: ["home-outline", "home"], LawyerCases: ["briefcase-outline", "briefcase"], LawyerHearings: ["calendar-outline", "calendar"], LawyerPetitions: ["document-text-outline", "document-text"], LawyerProfile: ["person-outline", "person"]};

const LawyerBottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({route}) => ({
        headerShown: false,
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        lazyPreloadDistance: 1,
        sceneStyle: { backgroundColor: "#D9DEE0" },
        tabBarActiveTintColor: "#18324D",
        tabBarInactiveTintColor: "#718198",
        tabBarShowIcon: true,
        tabBarStyle: {height: 64, marginBottom: 12, marginHorizontal: 12, borderRadius: 16, paddingTop: 6, paddingBottom: 6, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderColor: "#E2E4E3", elevation: 4},
        tabBarItemStyle: {paddingVertical: 0},
        tabBarIndicatorStyle: {height: 0},
        tabBarLabelStyle: {fontSize: 11, fontWeight: "600", textTransform: "none"},
        tabBarIcon: ({color, size, focused}) => <Ionicons name={icons[route.name]?.[focused ? 1 : 0] || "ellipse-outline"} size={size} color={color} />,
      })}
    >
      <Tab.Screen
        name="LawyerDashboard"
        component={LawyerDashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />

      <Tab.Screen
        name="LawyerCases"
        component={LawyerCasesScreen}
        options={{
          title: "Cases",
        }}
      />

      <Tab.Screen
        name="LawyerHearings"
        component={LawyerScheduleScreen}
        options={{
          title: "Hearings",
        }}
      />

      <Tab.Screen
        name="LawyerPetitions"
        component={LawyerDocumentsScreen}
        options={{
          title: "Petitions",
        }}
      />

      <Tab.Screen
        name="LawyerProfile"
        component={LawyerProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default LawyerBottomNavigator;
