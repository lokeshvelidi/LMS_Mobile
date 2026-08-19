import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ClerkProfileHeader = ({
  name,
  email,
  role,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {name
            ? name
                .split(' ')
                .map(item => item[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()
            : 'CL'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {role}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ClerkProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EDDF',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#19324D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  info: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#19324D',
  },

  email: {
    marginTop: 5,
    fontSize: 13,
    color: '#687A8F',
  },

  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 9,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#DDE7F7',
  },

  roleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2864B5',
  },
});