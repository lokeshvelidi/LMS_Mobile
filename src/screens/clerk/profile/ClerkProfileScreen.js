import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';

import ClerkProfileHeader from '../../../components/clerk/profile/ClerkProfileHeader';

import ClerkProfileInfo from '../../../components/clerk/profile/ClerkProfileInfo';

import ClerkProfileActions from '../../../components/clerk/profile/ClerkProfileActions';
import {useAuth} from '../../../context/AuthContext';
import {getClerkProfile, updateClerkProfile, changeClerkPassword} from '../../../services/api/clerkService';
import { SidebarMenuButton } from '../../../components/navigation/RoleSidebar';

const ClerkProfileScreen = ({
  navigation,
}) => {
  const {logout} = useAuth();
  const [profile, setProfile] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({fullName: '', email: '', mobile: ''});
  const [passwords, setPasswords] = useState({oldPassword: '', newPassword: '', confirm: ''});
  useEffect(() => { getClerkProfile().then((data) => { setProfile(data); setForm({fullName: data?.fullName || data?.name || '', email: data?.email || '', mobile: data?.mobile || data?.phone || ''}); }).catch(() => setProfile({})); }, []);
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

  const handleEditProfile = () => navigation.getParent()?.navigate('EditClerkProfile');

  const handleChangePassword = () => navigation.getParent()?.navigate('ChangeClerkPassword');
  const saveProfile = async () => { if (!form.fullName.trim() || !form.email.trim()) return Alert.alert('Validation', 'Full name and email are required.'); setSaving(true); try { const updated = await updateClerkProfile({fullName: form.fullName.trim(), email: form.email.trim(), mobile: form.mobile.trim()}); setProfile(updated); setEditVisible(false); Alert.alert('Profile updated', 'Your profile was updated successfully.'); } catch (error) { Alert.alert('Update failed', error.response?.data?.message || 'Unable to update profile.'); } finally { setSaving(false); } };
  const savePassword = async () => { if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirm) return Alert.alert('Validation', 'Complete all password fields.'); if (passwords.newPassword !== passwords.confirm) return Alert.alert('Validation', 'New passwords do not match.'); setSaving(true); try { await changeClerkPassword(passwords.oldPassword, passwords.newPassword); setPasswords({oldPassword: '', newPassword: '', confirm: ''}); setPasswordVisible(false); Alert.alert('Password changed', 'Your password was changed successfully.'); } catch (error) { Alert.alert('Password change failed', error.response?.data?.message || 'Unable to change password.'); } finally { setSaving(false); } };

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
          <View style={styles.headerRow}><View>
          <Text style={styles.pageTitle}>
            My Profile
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage your account information
            and preferences.
          </Text>
          </View><SidebarMenuButton role="clerk" /></View>
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
        <Modal visible={editVisible} transparent animationType="slide" onRequestClose={() => setEditVisible(false)}><View style={styles.modalOverlay}><View style={styles.modalCard}><Text style={styles.modalTitle}>Edit Profile</Text>{[['Full Name','fullName'],['Email','email'],['Mobile','mobile']].map(([label,key]) => <View key={key} style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput value={form[key]} onChangeText={(value) => setForm((old) => ({...old, [key]: value}))} style={styles.input} /></View>)}<View style={styles.modalActions}><Pressable onPress={() => setEditVisible(false)} style={styles.cancel}><Text>Cancel</Text></Pressable><Pressable disabled={saving} onPress={saveProfile} style={styles.primary}>{saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryText}>Save</Text>}</Pressable></View></View></View></Modal>
        <Modal visible={passwordVisible} transparent animationType="slide" onRequestClose={() => setPasswordVisible(false)}><View style={styles.modalOverlay}><View style={styles.modalCard}><Text style={styles.modalTitle}>Change Password</Text>{[['Current Password','oldPassword'],['New Password','newPassword'],['Confirm Password','confirm']].map(([label,key]) => <View key={key} style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput secureTextEntry value={passwords[key]} onChangeText={(value) => setPasswords((old) => ({...old, [key]: value}))} style={styles.input} /></View>)}<View style={styles.modalActions}><Pressable onPress={() => setPasswordVisible(false)} style={styles.cancel}><Text>Cancel</Text></Pressable><Pressable disabled={saving} onPress={savePassword} style={styles.primary}>{saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryText}>Change</Text>}</Pressable></View></View></View></Modal>

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
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(7,29,43,0.4)' },
  modalCard: { backgroundColor: '#FAF7EF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#19324D', marginBottom: 16 },
  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#293D53', marginBottom: 6 },
  input: { height: 46, borderWidth: 1, borderColor: '#D7DDE3', borderRadius: 11, backgroundColor: '#FFF', paddingHorizontal: 12 },
  modalActions: { flexDirection: 'row', marginTop: 8 },
  cancel: { flex: 1, height: 46, borderWidth: 1, borderColor: '#D7DDE3', borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 5 },
  primary: { flex: 1, height: 46, borderRadius: 11, backgroundColor: '#122F4B', alignItems: 'center', justifyContent: 'center', marginLeft: 5 },
  primaryText: { color: '#FFF', fontWeight: '700' },
});
