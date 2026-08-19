import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClerkBottomNavigator from "./ClerkBottomNavigator";

import HearingsScreen from "../../screens/clerk/hearings/HearingsScreen";
import ClerkHearingCalendarScreen from "../../screens/clerk/hearingCalendar/ClerkHearingCalendarScreen";
import ClerkPaymentDeskScreen from "../../screens/clerk/paymentDesk/PaymentDeskScreen";
import ClerkReportsScreen from "../../screens/clerk/reports/ClerkReportsScreen";
import ClerkDocumentsScreen from "../../screens/clerk/documents/DocumentsScreen";

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
    </Stack.Navigator>
  );
};

export default ClerkNavigator;
