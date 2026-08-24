import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function DateTimeScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Date & Time"><AppText color="textSecondary">Date and time formatting are controlled by the application and device configuration. No editable preference is currently supported.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
