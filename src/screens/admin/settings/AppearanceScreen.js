import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function AppearanceScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Appearance"><AppText color="textSecondary">The application currently uses its configured light theme. A global theme preference is not available.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
