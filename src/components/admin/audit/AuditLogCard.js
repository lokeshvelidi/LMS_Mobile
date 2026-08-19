import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";
import AuditActionBadge from "./AuditActionBadge";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
};

const AuditLogCard = ({
  log,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <AppText
              size="sm"
              weight="bold"
              style={styles.avatarText}
            >
              {getInitials(log.user)}
            </AppText>
          </View>

          <View style={styles.userInfo}>
            <AppText
              size="sm"
              weight="bold"
              numberOfLines={1}
            >
              {log.user}
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.role}
            >
              {log.role}
            </AppText>
          </View>
        </View>

        <AuditActionBadge
          action={log.action}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <InfoRow
          label="Activity"
          value={log.activity}
        />

        <InfoRow
          label="Module"
          value={log.module}
        />

        <InfoRow
          label="Date & Time"
          value={log.dateTime}
        />

        <InfoRow
          label="IP Address"
          value={log.ipAddress}
          last
        />
      </View>
    </View>
  );
};

const getInitials = (name) => {
  if (!name) {
    return "?";
  }

  const parts = name
    .trim()
    .split(" ")
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
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
        !last && styles.rowDivider,
      ]}
    >
      <AppText
        size="xs"
        color="textSecondary"
      >
        {label}
      </AppText>

      <AppText
        size="sm"
        weight="medium"
        numberOfLines={2}
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
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.navy,
  },

  userInfo: {
    flex: 1,
    marginLeft: 10,
  },

  role: {
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },

  details: {
    width: "100%",
  },

  infoRow: {
    minHeight: 37,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  value: {
    maxWidth: "67%",
    textAlign: "right",
  },
});

export default AuditLogCard;