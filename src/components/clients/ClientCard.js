import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const ClientCard = ({ client, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
  >
    <AppText size="md" weight="semiBold">
      {client.name}
    </AppText>
    <View style={styles.details}>
      <AppText size="xs" color="textSecondary">{client.email}</AppText>
      <AppText size="xs" color="textSecondary">{client.phone}</AppText>
      <AppText size="xs" color="textSecondary">
        {client.caseCount} {client.caseCount === 1 ? "case" : "cases"}
      </AppText>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  pressed: { opacity: 0.7 },
  details: { gap: theme.spacing.xs, marginTop: theme.spacing.sm },
});

export default ClientCard;
