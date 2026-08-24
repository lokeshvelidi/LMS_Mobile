import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function PrivacyPolicyScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Privacy Policy"><AppText color="textSecondary">Official privacy policy content has not been configured in this application.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
