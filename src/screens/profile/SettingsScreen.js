import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppCard from "../../components/common/AppCard";
import AppText from "../../components/common/AppText";

import theme from "../../theme/theme";

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [hearingReminders, setHearingReminders] =
    useState(true);

  return (
    <AppScreen>
      <AppHeader
        title="Settings"
        subtitle="Manage preferences"
        showNotification={false}
      />

      <View style={styles.container}>
        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
            style={styles.title}
          >
            Notifications
          </AppText>

          <SettingRow
            title="Push Notifications"
            description="Receive notifications from the LMS"
            value={notifications}
            onValueChange={setNotifications}
          />

          <SettingRow
            title="Hearing Reminders"
            description="Get reminders for upcoming hearings"
            value={hearingReminders}
            onValueChange={setHearingReminders}
            last
          />
        </AppCard>

        <AppCard style={styles.card}>
          <AppText
            size="lg"
            weight="semiBold"
            style={styles.title}
          >
            App Information
          </AppText>

          <InfoRow
            label="Application"
            value="LMS"
          />

          <InfoRow
            label="Version"
            value="1.0.0"
            last
          />
        </AppCard>
      </View>
    </AppScreen>
  );
};

const SettingRow = ({
  title,
  description,
  value,
  onValueChange,
  last,
}) => {
  return (
    <View
      style={[
        styles.settingRow,
        !last && styles.border,
      ]}
    >
      <View style={styles.settingContent}>
        <AppText
          size="md"
          weight="medium"
        >
          {title}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primaryLight,
        }}
        thumbColor={
          value
            ? theme.colors.primary
            : theme.colors.textTertiary
        }
      />
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  last,
}) => {
  return (
    <View
      style={[
        styles.infoRow,
        !last && styles.border,
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
      >
        {value}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },

  card: {
    marginBottom: theme.spacing.lg,
  },

  title: {
    marginBottom: theme.spacing.sm,
  },

  settingRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingContent: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },

  description: {
    marginTop: 3,
  },

  infoRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
});

export default SettingsScreen;
