import React from "react";
import { ScrollView } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppText from "../../../components/common/AppText";
 import SettingsPageHeader from "../../../components/admin/settings/SettingsPageHeader";
export default function TermsConditionsScreen() { return <AppScreen><ScrollView><SettingsPageHeader title="Terms & Conditions"><AppText color="textSecondary">Official terms and conditions have not been configured in this application.</AppText></SettingsPageHeader></ScrollView></AppScreen>; }
