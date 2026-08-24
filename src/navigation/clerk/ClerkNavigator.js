import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClerkBottomNavigator from "./ClerkBottomNavigator";

import HearingsScreen from "../../screens/clerk/hearings/HearingsScreen";
import ClerkHearingCalendarScreen from "../../screens/clerk/hearingCalendar/ClerkHearingCalendarScreen";
import ClerkPaymentDeskScreen from "../../screens/clerk/paymentDesk/PaymentDeskScreen";
import ClerkReportsScreen from "../../screens/clerk/reports/ClerkReportsScreen";
import ClerkDocumentsScreen from "../../screens/clerk/documents/DocumentsScreen";
import EditClerkProfileScreen from "../../screens/clerk/profile/EditClerkProfileScreen";
import ChangeClerkPasswordScreen from "../../screens/clerk/profile/ChangeClerkPasswordScreen";

const Stack = createNativeStackNavigator();

const ClerkNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ClerkMain"
        component={ClerkBottomNavigator}
      />

      <Stack.Screen
        name="ClerkHearings"
        component={HearingsScreen}
      />

      <Stack.Screen
        name="ClerkHearingCalendar"
        component={ClerkHearingCalendarScreen}
      />

      <Stack.Screen
        name="ClerkPaymentDesk"
        component={ClerkPaymentDeskScreen}
      />

      <Stack.Screen
        name="ClerkReports"
        component={ClerkReportsScreen}
      />

      <Stack.Screen
        name="ClerkDocuments"
        component={ClerkDocumentsScreen}
      />
      <Stack.Screen name="EditClerkProfile" component={EditClerkProfileScreen} />
      <Stack.Screen name="ChangeClerkPassword" component={ChangeClerkPasswordScreen} />
    </Stack.Navigator>
  );
};

export default ClerkNavigator;
