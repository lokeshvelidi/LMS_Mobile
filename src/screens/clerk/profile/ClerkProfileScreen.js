import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';

import ClerkProfileHeader from '../../../components/clerk/profile/ClerkProfileHeader';

import ClerkProfileInfo from '../../../components/clerk/profile/ClerkProfileInfo';

import ClerkProfileActions from '../../../components/clerk/profile/ClerkProfileActions';
import {useAuth} from '../../../context/AuthContext';
import {getClerkProfile} from '../../../services/api/clerkService';

const ClerkProfileScreen = ({
  navigation,
}) => {
  const {logout} = useAuth();
  const [profile, setProfile] = useState(null);
  useEffect(() => { getClerkProfile().then(setProfile).catch(() => setProfile({})); }, []);
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const profileData = profile || {};

  const personalInformation = [
    {
      label: 'Full Name',
      value: profileData.fullName || profileData.name || '-',
    },
    {
      label: 'Email',
      value: profileData.email || '-',
    },
    {
      label: 'Phone',
      value: profileData.mobile || profileData.phone || '-',
    },
  ];

  const workInformation = [
    {
      label: 'Employee ID',
      value: profileData.appUserId || profileData.userId || '-',
    },
    {
      label: 'Role',
      value: profileData.role || 'Clerk',
    },
    {
      label: 'Department',
      value: profileData.department || '-',
    },
    {
      label: 'Office',
      value: profileData.office || '-',
    },
    {
      label: 'Joining Date',
      value: profileData.joiningDate || '-',
    },
  ];

  const handleEditProfile = () => {
    console.log(
      'Edit clerk profile',
    );
  };

  const handleChangePassword = () => {
    console.log(
      'Change clerk password',
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>
        {/* HEADER */}

        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>
            My Profile
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage your account information
            and preferences.
          </Text>
        </View>

        {/* PROFILE HEADER */}

        <ClerkProfileHeader
          name={profileData.fullName || profileData.name || '-'}
          email={profileData.email || '-'}
          role={profileData.role || 'Clerk'}
        />

        {/* INFORMATION */}

        <View
          style={[
            styles.infoRow,
            isMobile &&
              styles.infoColumn,
          ]}>
          <ClerkProfileInfo
            title="Personal Information"
            items={
              personalInformation
            }
          />

          <ClerkProfileInfo
            title="Work Information"
            items={workInformation}
          />
        </View>

        {/* ACTIONS */}

        <ClerkProfileActions
          onEditProfile={
            handleEditProfile
          }
          onChangePassword={
            handleChangePassword
          }
          onLogout={handleLogout}
        />

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Clerk Portal
          </Text>

          <Text style={styles.version}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClerkProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DEE0',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  headerSection: {
    marginTop: 25,
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 15,
    color: '#60758E',
  },

  infoRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 14,
  },

  infoColumn: {
    flexDirection: 'column',
  },

  footer: {
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#C7CDD2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#60758E',
  },

  version: {
    fontSize: 11,
    color: '#7C8997',
  },
});
