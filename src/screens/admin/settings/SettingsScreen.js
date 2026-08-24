import React, {
  useState,
} from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import SettingsSection from "../../../components/settings/SettingsSection";
import SettingsRow from "../../../components/settings/SettingsRow";
import SettingsToggleRow from "../../../components/settings/SettingsToggleRow";
import { useAuth } from "../../../context/AuthContext";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const SettingsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(true);

  const [
    hearingReminders,
    setHearingReminders,
  ] = useState(true);

  const [
    caseUpdates,
    setCaseUpdates,
  ] = useState(true);

  const open = (route) => navigation.navigate(route);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  return (
    <AppScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <AppHeader
          title="Settings"
          subtitle="Manage your application preferences."
          showNotification={false}
        />

        <View style={styles.content}>
          <SettingsSection title="Account">
            <SettingsRow
              title="Profile"
              subtitle="Manage your personal information"
              icon="P"
              onPress={() =>
                open("AdminProfileSettings")
              }
            />

            <SettingsRow
              title="Change Password"
              subtitle="Update your account password"
              icon="🔒"
              onPress={() =>
                open("AdminChangePassword")
              }
            />

            <SettingsRow
              title="Security"
              subtitle="Manage account security"
              icon="S"
              onPress={() =>
                open("AdminSecurity")
              }
            />
          </SettingsSection>
{/* 
          <SettingsSection title="Application">
            <SettingsRow
              title="Language"
              subtitle="Choose application language"
              icon="A"
              rightText="English"
              onPress={() =>
                open("AdminLanguage")
              }
            />

            <SettingsRow
              title="Appearance"
              subtitle="Customize application appearance"
              icon="◐"
              rightText="System"
              onPress={() =>
                open("AdminAppearance")
              }
            />

            <SettingsRow
              title="Date & Time"
              subtitle="Manage date and time preferences"
              icon="T"
              onPress={() =>
                open("AdminDateTime")
              }
            />
          </SettingsSection> */}

          {/* <SettingsSection title="Notifications">
            <SettingsToggleRow
              title="Push Notifications"
              subtitle="Receive notifications on your device"
              icon="N"
              value={notifications}
              onValueChange={
                setNotifications
              }
            />

            <SettingsToggleRow
              title="Email Notifications"
              subtitle="Receive important updates by email"
              icon="@"
              value={emailNotifications}
              onValueChange={
                setEmailNotifications
              }
            />

            <SettingsToggleRow
              title="Hearing Reminders"
              subtitle="Get reminders before scheduled hearings"
              icon="H"
              value={hearingReminders}
              onValueChange={
                setHearingReminders
              }
            />

            <SettingsToggleRow
              title="Case Updates"
              subtitle="Receive updates about your cases"
              icon="C"
              value={caseUpdates}
              onValueChange={
                setCaseUpdates
              }
            />
          </SettingsSection> */}

          <SettingsSection title="Data & Privacy">
            <SettingsRow
              title="Privacy Policy"
              subtitle="View privacy policy"
              icon="P"
              onPress={() =>
                open("AdminPrivacyPolicy")
              }
            />

            <SettingsRow
              title="Terms & Conditions"
              subtitle="View terms and conditions"
              icon="T"
              onPress={() =>
                open("AdminTermsConditions")
              }
            />

            <SettingsRow
              title="Data & Storage"
              subtitle="Manage application data"
              icon="D"
              onPress={() => open("AdminDataStorage")}
            />
          </SettingsSection>

          <SettingsSection title="Support">
            <SettingsRow
              title="Help & Support"
              subtitle="Get help with the application"
              icon="?"
              onPress={() =>
                open("AdminHelpSupport")
              }
            />

            <SettingsRow
              title="About"
              subtitle="Application information"
              icon="i"
              onPress={() =>
                open("AdminAbout")
              }
            />
          </SettingsSection>

          <View style={styles.versionContainer}>
            <AppText
              size="xs"
              color="textSecondary"
            >
              VeeGPT LMS
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.version}
            >
              Version 1.0.0
            </AppText>
          </View>

          <SettingsRow
            title="Logout"
            subtitle="Sign out of your account"
            icon="↪"
            showArrow={false}
            danger
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 35,
    backgroundColor:
      COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
  },

  versionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  version: {
    marginTop: 3,
  },
});

export default SettingsScreen;
