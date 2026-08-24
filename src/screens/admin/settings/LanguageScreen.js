import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function LanguageScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Language"><AppText color="textSecondary">English is the only configured application language. Localization support is not currently configured.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
