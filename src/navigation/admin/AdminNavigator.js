import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminBottomNavigator from "../bottom/AdminBottomNavigator";
import ClientDetailsScreen from "../../screens/clients/ClientDetailsScreen";
import NotificationsScreen from "../../screens/notifications/NotificationsScreen";
import DocumentsScreen from "../../screens/documents/DocumentsScreen";
import UploadDocumentScreen from "../../screens/documents/UploadDocumentScreen";
import DocumentDetailsScreen from "../../screens/documents/DocumentDetailsScreen";
import AddCaseScreen from "../../screens/admin/cases/AddCaseScreen";
import CaseDetailsScreen from "../../screens/admin/cases/CaseDetailsScreen";
import EditCaseScreen from "../../screens/admin/cases/EditCaseScreen";
import AddHearingScreen from "../../screens/admin/hearings/AddHearingScreen";
import HearingCalendarScreen from "../../screens/admin/hearings/HearingCalendarScreen";
import HearingDetailsScreen from "../../screens/admin/hearings/HearingDetailsScreen";
import AddUserScreen from "../../screens/admin/users/AddUserScreen";
import EditUserScreen from "../../screens/admin/users/EditUserScreen";
import UserDetailsScreen from "../../screens/admin/users/UserDetailsScreen";
import MasterDataScreen from "../../screens/admin/masterData/MasterDataScreen";
import CourtsScreen from "../../screens/admin/masterData/CourtsScreen";
import AddCourtScreen from "../../screens/admin/masterData/AddCourtScreen";
import CourtDetailsScreen from "../../screens/admin/masterData/CourtDetailsScreen";
import EditCourtScreen from "../../screens/admin/masterData/EditCourtScreen";
import ReportsScreen from "../../screens/admin/reports/ReportsScreen";
import AuditLogsScreen from "../../screens/admin/audit/AuditLogsScreen";
import SettingsScreen from "../../screens/admin/settings/SettingsScreen";
import AdminAdvocatesScreen from "../../screens/admin/advocates/AdvocatesScreen";
import AdminAdvocateDetailsScreen from "../../screens/admin/advocates/AdvocateDetailsScreen";
import AdminAddAdvocateScreen from "../../screens/admin/advocates/AddAdvocateScreen";
import AdminEditAdvocateScreen from "../../screens/admin/advocates/EditAdvocateScreen";
import AdminClientsScreen from "../../screens/admin/clients/ClientsScreen";
import AdminClientDetailsScreen from "../../screens/admin/clients/ClientDetailsScreen";
import AdminAddClientScreen from "../../screens/admin/clients/AddClientScreen";
import AdminEditClientScreen from "../../screens/admin/clients/EditClientScreen";

const Stack = createNativeStackNavigator();

const screens = [
  ["ClientDetails", ClientDetailsScreen],
  ["Notifications", NotificationsScreen],
  ["Documents", DocumentsScreen],
  ["UploadDocument", UploadDocumentScreen],
  ["DocumentDetails", DocumentDetailsScreen],
  ["AddCase", AddCaseScreen],
  ["CaseDetails", CaseDetailsScreen],
  ["EditCase", EditCaseScreen],
  ["Hearings", HearingCalendarScreen],
  ["AddHearing", AddHearingScreen],
  ["HearingDetails", HearingDetailsScreen],
  ["AddUser", AddUserScreen],
  ["EditUser", EditUserScreen],
  ["UserDetails", UserDetailsScreen],
  ["Master", MasterDataScreen],
  ["Courts", CourtsScreen],
  ["AddCourt", AddCourtScreen],
  ["CourtDetails", CourtDetailsScreen],
  ["EditCourt", EditCourtScreen],
  ["Reports", ReportsScreen],
  ["AuditLogs", AuditLogsScreen],
  ["Settings", SettingsScreen],
  ["AdminClients", AdminClientsScreen],
  ["AdminClientDetails", AdminClientDetailsScreen],
  ["AdminAddClient", AdminAddClientScreen],
  ["AdminEditClient", AdminEditClientScreen],
  ["AdminAdvocates", AdminAdvocatesScreen],
  ["AdminAdvocateDetails", AdminAdvocateDetailsScreen],
  ["AdminAddAdvocate", AdminAddAdvocateScreen],
  ["AdminEditAdvocate", AdminEditAdvocateScreen],
];

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminMain" component={AdminBottomNavigator} />
    {screens.map(([name, component]) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
);

export default AdminNavigator;
