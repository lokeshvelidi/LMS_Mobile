import React from "react";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function AboutScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="About"><AppText size="lg" weight="bold">{Constants.expoConfig?.name || "LMS-App"}</AppText><AppText color="textSecondary">Version {Constants.expoConfig?.version || "Unavailable"}</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
