import React, { useEffect, useState } from "react";

import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import LawyerProfileHeader from "../../../components/lawyer/profile/LawyerProfileHeader";

import LawyerProfileInfo from "../../../components/lawyer/profile/LawyerProfileInfo";

import LawyerProfileActions from "../../../components/lawyer/profile/LawyerProfileActions";
import { useAuth } from "../../../context/AuthContext";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerProfile } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
};

const LawyerProfileScreen = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getLawyerProfile()
      .then((result) => active && setProfile(result))
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, "Unable to load profile."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const handleEdit = () => {
    Alert.alert(
      "Edit Profile",
      "Profile editing will be connected after API integration."
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "Password change flow will be connected after API integration."
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            My Profile
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Manage your professional and
            account information.
          </AppText>
        </View>

        {loading ? (
          <View style={styles.stateCard}><ActivityIndicator size="large" color={COLORS.navy} /></View>
        ) : error ? (
          <View style={styles.stateCard}><AppText size="sm" color="textSecondary">{error}</AppText></View>
        ) : (<>
          <LawyerProfileHeader profile={profile} />
          <LawyerProfileInfo profile={profile} />
        </>)}

        <LawyerProfileActions
          onEdit={handleEdit}
          onChangePassword={
            handleChangePassword
          }
          onLogout={handleLogout}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  bottomSpace: {
    height: 30,
  },

  stateCard: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },
});

export default LawyerProfileScreen;
