import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ClerkProfileActions = ({
  onEditProfile,
  onChangePassword,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Account Actions
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.secondaryButton}
        onPress={onEditProfile}>
        <Text style={styles.secondaryText}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.secondaryButton}
        onPress={onChangePassword}>
        <Text style={styles.secondaryText}>
          Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.logoutButton}
        onPress={onLogout}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClerkProfileActions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 14,
  },

  secondaryButton: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#D8DEE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  secondaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#263A50',
  },

  logoutButton: {
    height: 46,
    borderRadius: 23,
    backgroundColor: '#B7443B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  logoutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});