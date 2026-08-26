import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
            <MaterialCommunityIcons name="file-document-outline" size={25} color={theme.colors.accent} />
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
              {document.caseNumber || ""}
            </AppText>

            <AppText
              size="xs"
              color="textTertiary"
              style={styles.date}
            >
              {[document.uploadedDate, document.status, document.version ? `v${document.version}` : null].filter(Boolean).join(" • ")}
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
