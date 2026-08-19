import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppCard from "../common/AppCard";
import AppText from "../common/AppText";

import HearingStatusBadge from "./HearingStatusBadge";

import theme from "../../theme/theme";

const HearingCard = ({
  hearing,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.pressed,
      ]}
    >
      <AppCard style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            {/* Date */}
            <View style={styles.dateBox}>
              <AppText
                size="xl"
                weight="bold"
                color="primary"
              >
                {hearing.day}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
              >
                {hearing.month}
              </AppText>
            </View>

            {/* Case information */}
            <View style={styles.titleContainer}>
              <AppText
                size="md"
                weight="semiBold"
                numberOfLines={2}
              >
                {hearing.caseTitle}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.caseNumber}
              >
                {hearing.caseNumber}
              </AppText>
            </View>
          </View>

          {/* Status */}
          <HearingStatusBadge
            status={hearing.status}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Time and Court */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <AppText
              size="xs"
              color="textTertiary"
            >
              Time
            </AppText>

            <AppText
              size="sm"
              weight="medium"
              style={styles.infoValue}
            >
              {hearing.time}
            </AppText>
          </View>

          <View style={styles.infoItem}>
            <AppText
              size="xs"
              color="textTertiary"
            >
              Court
            </AppText>

            <AppText
              size="sm"
              weight="medium"
              numberOfLines={1}
              style={styles.infoValue}
            >
              {hearing.court}
            </AppText>
          </View>
        </View>

        {/* Client */}
        <View style={styles.clientRow}>
          <AppText
            size="xs"
            color="textTertiary"
          >
            Client
          </AppText>

          <AppText
            size="sm"
            weight="medium"
            numberOfLines={1}
            style={styles.clientName}
          >
            {hearing.clientName}
          </AppText>
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.lg,
  },

  pressed: {
    opacity: 0.75,
  },

  card: {
    marginBottom: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  dateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.sm,
  },

  dateBox: {
    width: 54,
    height: 60,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  titleContainer: {
    flex: 1,
  },

  caseNumber: {
    marginTop: theme.spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: theme.spacing.md,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },

  infoItem: {
    flex: 1,
  },

  infoValue: {
    marginTop: theme.spacing.xs,
  },

  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },

  clientName: {
    flex: 1,
    textAlign: "right",
    marginLeft: theme.spacing.md,
  },
});

export default HearingCard;
