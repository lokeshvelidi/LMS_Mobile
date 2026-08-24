import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LawyerBottomNavigator from "./LawyerBottomNavigator";
import LawyerCaseDetailsScreen from "../../screens/lawyer/cases/LawyerCaseDetailsScreen";
import LawyerCaseNotesScreen from "../../screens/lawyer/caseNotes/LawyerCaseNotesScreen";
import PreparePetitionScreen from "../../screens/lawyer/preparePetition/PreparePetitionScreen";
import HearingDeskScreen from "../../screens/lawyer/hearings/HearingDeskScreen";
import HearingCalendarScreen from "../../screens/lawyer/hearings/HearingCalendarScreen";
import HearingDetailsScreen from "../../screens/lawyer/hearings/HearingDetailsScreen";
import ManageHearingScreen from "../../screens/lawyer/hearings/ManageHearingScreen";
import UploadCourtOrdersScreen from "../../screens/lawyer/courtOrders/UploadCourtOrdersScreen";
import RequestPaymentScreen from "../../screens/lawyer/payments/RequestPaymentScreen";
import ContinueCaseUpdatesScreen from "../../screens/lawyer/caseUpdates/ContinueCaseUpdatesScreen";
import CaseCompletedScreen from "../../screens/lawyer/caseCompletion/CaseCompletedScreen";
import MarkReadyForClosureScreen from "../../screens/lawyer/caseClosure/MarkReadyForClosureScreen";
import DocumentsScreen from "../../screens/documents/DocumentsScreen";
import UploadDocumentScreen from "../../screens/documents/UploadDocumentScreen";
import DocumentDetailsScreen from "../../screens/documents/DocumentDetailsScreen";
import EditLawyerProfileScreen from "../../screens/lawyer/profile/EditLawyerProfileScreen";
import ChangeLawyerPasswordScreen from "../../screens/lawyer/profile/ChangeLawyerPasswordScreen";

const Stack = createNativeStackNavigator();

const screens = [
  ["LawyerCaseDetails", LawyerCaseDetailsScreen],
  ["CaseNotes", LawyerCaseNotesScreen],
  ["PreparePetition", PreparePetitionScreen],
  ["HearingDesk", HearingDeskScreen],
  ["HearingCalendar", HearingCalendarScreen],
  ["HearingDetails", HearingDetailsScreen],
  ["ManageHearing", ManageHearingScreen],
  ["UploadCourtOrders", UploadCourtOrdersScreen],
  ["RequestPayment", RequestPaymentScreen],
  ["ContinueCaseUpdates", ContinueCaseUpdatesScreen],
  ["CaseCompleted", CaseCompletedScreen],
  ["MarkReadyForClosure", MarkReadyForClosureScreen],
  ["Documents", DocumentsScreen],
  ["UploadDocument", UploadDocumentScreen],
  ["DocumentDetails", DocumentDetailsScreen],
  ["EditLawyerProfile", EditLawyerProfileScreen],
  ["ChangeLawyerPassword", ChangeLawyerPasswordScreen],
];

const LawyerNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LawyerMain" component={LawyerBottomNavigator} />
    {screens.map(([name, component]) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
);

export default LawyerNavigator;
