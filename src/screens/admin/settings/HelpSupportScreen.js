import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function HelpSupportScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Help & Support"><AppText color="textSecondary">No support email, phone number, FAQ, or website is configured in the project.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
