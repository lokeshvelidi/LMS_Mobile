import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const LawyerProfileActions = ({
  onEdit,
  onChangePassword,
  onLogout,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Account
      </AppText>

      <Pressable
        onPress={onEdit}
        style={({ pressed }) => [
          styles.action,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.icon}>
          <AppText
            size="sm"
            weight="bold"
            style={styles.iconText}
          >
            E
          </AppText>
        </View>

        <View style={styles.actionContent}>
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.actionTitle}
          >
            Edit Profile
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.actionDescription}
          >
            Update your professional information
          </AppText>
        </View>

        <AppText
          size="lg"
          style={styles.arrow}
        >
          →
        </AppText>
      </Pressable>

      <Pressable
        onPress={onChangePassword}
        style={({ pressed }) => [
          styles.action,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.icon}>
          <AppText
            size="sm"
            weight="bold"
            style={styles.iconText}
          >
            *
          </AppText>
        </View>

        <View style={styles.actionContent}>
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.actionTitle}
          >
            Change Password
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.actionDescription}
          >
            Update your account password
          </AppText>
        </View>

        <AppText
          size="lg"
          style={styles.arrow}
        >
          →
        </AppText>
      </Pressable>

      <Pressable
        onPress={onLogout}
        style={({ pressed }) => [
          styles.logout,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.logoutText}
        >
          Logout
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  title: {
    color: COLORS.navy,
    marginBottom: 8,
  },

  action: {
    minHeight: 66,
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    flexDirection: "row",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.65,
  },

  icon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F3F0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    color: COLORS.navy,
  },

  actionContent: {
    flex: 1,
    marginLeft: 11,
  },

  actionTitle: {
    color: COLORS.navy,
  },

  actionDescription: {
    marginTop: 3,
  },

  arrow: {
    color: COLORS.navy,
    marginLeft: 8,
  },

  logout: {
    height: 48,
    borderWidth: 1,
    borderColor: "#C97A70",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  logoutText: {
    color: "#A84438",
  },
});

export default LawyerProfileActions;