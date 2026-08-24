import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function DataStorageScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Data & Storage"><AppText color="textSecondary">No safe cache-size or clear-cache operation is currently exposed by the application.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
