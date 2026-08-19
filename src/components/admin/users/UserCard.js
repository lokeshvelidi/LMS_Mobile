import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";
import UserRoleBadge from "./UserRoleBadge";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  border: "#E6E0D4",
  white: "#FFFDF8",
  gold: "#E5B93F",
  danger: "#D9534F",
};

const UserCard = ({
  user,
  onPress,
  onRegeneratePassword,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <AppText
            size="md"
            weight="bold"
            style={styles.avatarText}
          >
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </AppText>
        </View>

        <View style={styles.identity}>
          <AppText
            size="md"
            weight="bold"
            numberOfLines={1}
          >
            {user.name}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.username}
            numberOfLines={1}
          >
            @{user.username}
          </AppText>
        </View>

        <View
          style={[
            styles.status,
            user.status === "Active"
              ? styles.activeStatus
              : styles.inactiveStatus,
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

      <View style={styles.divider} />

      <InfoRow
        label="Email"
        value={user.email}
      />

      <InfoRow
        label="Mobile"
        value={user.mobile}
      />

      <View style={styles.infoRow}>
        <AppText
          size="xs"
          color="textSecondary"
        >
          Role
        </AppText>

        <UserRoleBadge role={user.role} />
      </View>

      <InfoRow
        label="Created"
        value={user.created}
      />

      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          onRegeneratePassword(user);
        }}
        style={styles.passwordButton}
      >
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.passwordText}
        >
          Regenerate password
        </AppText>
      </Pressable>
    </Pressable>
  );
};

const InfoRow = ({
  label,
  value,
}) => {
  return (
    <View style={styles.infoRow}>
      <AppText
        size="xs"
        color="textSecondary"
      >
        {label}
      </AppText>

      <AppText
        size="sm"
        weight="medium"
        numberOfLines={1}
        style={styles.value}
      >
        {value || "-"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },

  pressed: {
    opacity: 0.75,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: COLORS.gold,
  },

  identity: {
    flex: 1,
    marginRight: 8,
  },

  username: {
    marginTop: 3,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 14,
  },

  activeStatus: {
    backgroundColor: "#E3F1E9",
  },

  inactiveStatus: {
    backgroundColor: "#F8E3E1",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  infoRow: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    maxWidth: "65%",
    textAlign: "right",
  },

  passwordButton: {
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },

  passwordText: {
    color: COLORS.navy,
  },
});

export default UserCard;