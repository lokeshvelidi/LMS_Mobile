import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppCard from "../common/AppCard";
import AppText from "../common/AppText";
import DocumentTypeBadge from "./DocumentTypeBadge";
import theme from "../../theme/theme";

const DocumentCard = ({ document, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <View style={styles.fileIcon}>
            <View style={styles.fileShape} />
          </View>

          <View style={styles.content}>
            <AppText
              size="md"
              weight="semiBold"
              numberOfLines={1}
            >
              {document.name}
            </AppText>

            <AppText
              size="xs"
              color="textSecondary"
              style={styles.case}
            >
              {document.caseNumber}
            </AppText>

            <AppText
              size="xs"
              color="textTertiary"
              style={styles.date}
            >
              {document.date} • {document.size}
            </AppText>
          </View>

          <DocumentTypeBadge type={document.type} />
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

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  fileIcon: {
    width: 46,
    height: 46,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },

  fileShape: {
    width: 19,
    height: 23,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderRadius: 3,
  },

  content: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },

  case: {
    marginTop: 2,
  },

  date: {
    marginTop: theme.spacing.xs,
  },
});

export default DocumentCard;
