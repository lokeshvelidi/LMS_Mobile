import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppCard from "../../components/common/AppCard";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";

import theme from "../../theme/theme";

const ProfileScreen = ({ navigation }) => {
  return (
    <AppScreen>
      <AppHeader
        title="Profile"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ProfileHeader
          name="User"
          email="user@example.com"
        />

        <AppCard style={styles.card}>
          <ProfileMenuItem
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() =>
              navigation.navigate("EditProfile")
            }
          />

          <ProfileMenuItem
            title="Settings"
            subtitle="Manage app preferences"
            onPress={() =>
              navigation.navigate("Settings")
            }
          />

          <ProfileMenuItem
            title="Notifications"
            subtitle="Manage notification preferences"
            onPress={() =>
              navigation.navigate("Notifications")
            }
          />
        </AppCard>

        <AppCard style={styles.card}>
          <ProfileMenuItem
            title="Logout"
            subtitle="Sign out of your account"
            danger
            onPress={() => {}}
          />
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  card: {
    marginBottom: theme.spacing.lg,
  },
});

export default ProfileScreen;