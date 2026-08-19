import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";
import AppCard from "../common/AppCard";
import CaseStatusBadge from "./CaseStatusBadge";
import theme from "../../theme/theme";

const CaseCard = ({
  caseItem,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <AppCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <AppText
              size="md"
              weight="semiBold"
              numberOfLines={1}
            >
              {caseItem.title}
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.caseNumber}
            >
              {caseItem.caseNumber}
            </AppText>
          </View>

          <CaseStatusBadge
            status={caseItem.status}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.info}>
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
            >
              {caseItem.clientName}
            </AppText>
          </View>

          <View style={styles.info}>
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
            >
              {caseItem.court}
            </AppText>
          </View>
        </View>

        <View style={styles.footer}>
          <AppText
            size="xs"
            color="textSecondary"
          >
            Next Hearing
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            color="primary"
          >
            {caseItem.nextHearing || "Not scheduled"}
          </AppText>
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },

  pressed: {
    opacity: 0.75,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  titleContainer: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },

  caseNumber: {
    marginTop: theme.spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: theme.spacing.md,
  },

  row: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },

  info: {
    flex: 1,
  },

  footer: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CaseCard;