import React, { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import UserRoleBadge from "../../../components/admin/users/UserRoleBadge";
import { regenerateAdminUserPassword } from "../../../services/api/adminUsersService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
  danger: "#D9534F",
};

const UserDetailsScreen = ({
  navigation,
  route,
}) => {
  const user = route?.params?.user;
  const [regenerating, setRegenerating] = useState(false);

  if (!user) {
    return (
      <AppScreen>
        <AppHeader
          title="User Details"
          showNotification={false}
        />

        <View style={styles.errorContainer}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            User not found
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const handleRegeneratePassword = () => {
    Alert.alert(
      "Regenerate Password",
      `Are you sure you want to regenerate the password for ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Regenerate",
          onPress: async () => {
            if (regenerating) return;
            setRegenerating(true);
            try { await regenerateAdminUserPassword(user.id); Alert.alert("Success", "Password regeneration completed successfully."); }
            catch (error) { Alert.alert("Password regeneration failed", error.response?.data?.message || "Unable to regenerate password."); }
            finally { setRegenerating(false); }
          },
        },
      ]
    );
  };

  return (
    <AppScreen>
      <AppHeader
        title="User Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <AppText
              size="xxl"
              weight="bold"
              style={styles.avatarText}
            >
              {user.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </AppText>
          </View>

          <AppText
            size="xl"
            weight="bold"
            style={styles.name}
          >
            {user.name}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
          >
            @{user.username}
          </AppText>

          <View style={styles.badgeRow}>
            <UserRoleBadge
              role={user.role}
            />

            <View
              style={[
                styles.statusBadge,
                user.status === "Active"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <AppText
                size="xs"
                weight="semiBold"
                style={{
                  color:
                    user.status === "Active"
                      ? "#287A50"
                      : COLORS.danger,
                }}
              >
                {user.status}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            Account Information
          </AppText>

          <InfoRow
            label="Name"
            value={user.name}
          />

          <InfoRow
            label="Username"
            value={user.username}
          />

          <InfoRow
            label="Email"
            value={user.email}
          />

          <InfoRow
            label="Mobile"
            value={user.mobile}
          />

          <InfoRow
            label="Role"
            value={user.role}
          />

          <InfoRow
            label="Status"
            value={user.status}
          />

          <InfoRow
            label="Created"
            value={user.created}
            last
          />
        </View>

        <View style={styles.actionsCard}>
          <AppText
            size="lg"
            weight="bold"
          >
            Account Actions
          </AppText>

          <Pressable
            disabled={regenerating}
            onPress={handleRegeneratePassword}
            style={styles.secondaryButton}
          >
            <AppText
              size="sm"
              weight="semiBold"
            >
              Regenerate Password
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const InfoRow = ({
  label,
  value,
  last = false,
}) => {
  return (
    <View
      style={[
        styles.infoRow,
        !last && styles.divider,
      ]}
    >
      <AppText
        size="sm"
        color="textSecondary"
      >
        {label}
      </AppText>

      <AppText
        size="sm"
        weight="medium"
        style={styles.value}
      >
        {value || "-"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: COLORS.gold,
  },

  name: {
    marginBottom: 4,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },

  active: {
    backgroundColor: "#E3F1E9",
  },

  inactive: {
    backgroundColor: "#F8E3E1",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 16,
  },

  infoRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  value: {
    maxWidth: "60%",
    textAlign: "right",
  },

  actionsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },

  primaryButton: {
    height: 48,
    backgroundColor: COLORS.navy,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  primaryText: {
    color: COLORS.white,
  },

  secondaryButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default UserDetailsScreen;
