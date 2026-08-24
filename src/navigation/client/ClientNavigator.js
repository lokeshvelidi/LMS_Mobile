import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClientBottomNavigator from "./ClientBottomNavigator";

import ClientHearingScheduleScreen from "../../screens/clients/hearingSchedule/ClientHearingScheduleScreen";
import ClientDocumentsScreen from "../../screens/clients/documents/ClientDocumentsScreen";
import ClientBillingScreen from "../../screens/clients/billing/ClientBillingScreen";
import ClientClosedCasesScreen from "../../screens/clients/closedCases/ClientClosedCasesScreen";
import ClientCaseDetailsScreen from "../../screens/clients/myCases/ClientCaseDetailsScreen";
import ClientHearingDetailsScreen from "../../screens/clients/hearingSchedule/ClientHearingDetailsScreen";

const Stack = createNativeStackNavigator();

const ClientNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ClientMain"
        component={ClientBottomNavigator}
      />

      <Stack.Screen
        name="ClientHearingSchedule"
        component={ClientHearingScheduleScreen}
      />

      <Stack.Screen
        name="ClientDocuments"
        component={ClientDocumentsScreen}
      />

      <Stack.Screen
        name="ClientBilling"
        component={ClientBillingScreen}
      />

      <Stack.Screen
        name="ClientClosedCases"
        component={ClientClosedCasesScreen}
      />

      <Stack.Screen
        name="ClientCaseDetails"
        component={ClientCaseDetailsScreen}
      />
      <Stack.Screen
        name="ClientHearingDetails"
        component={ClientHearingDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default ClientNavigator;
