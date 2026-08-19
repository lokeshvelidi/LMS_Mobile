import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import AppCard from "../../components/common/AppCard";
import AppButton from "../../components/common/AppButton";

import DocumentTypeBadge from "../../components/documents/DocumentTypeBadge";

import theme from "../../theme/theme";

const DocumentDetailsScreen = ({ route }) => {
  const { document } = route.params;

  return (
    <AppScreen>
      <AppHeader
        title="Document Details"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.filePreview}>
          <View style={styles.fileIcon}>
            <View style={styles.fileShape} />
          </View>

          <AppText
            size="xl"
            weight="bold"
            style={styles.fileName}
          >
            {document.name}
          </AppText>

          <DocumentTypeBadge type={document.type} />
        </View>

        <AppCard style={styles.card}>
          <AppText size="lg" weight="semiBold">
            File Information
          </AppText>

          <View style={styles.infoList}>
            <InfoRow
              label="File Name"
              value={document.name}
            />

            <InfoRow
              label="Type"
              value={document.type.toUpperCase()}
            />

            <InfoRow
              label="Size"
              value={document.size}
            />

            <InfoRow
              label="Uploaded"
              value={document.date}
            />

            <InfoRow
              label="Case"
              value={document.caseNumber}
              last
            />
          </View>
        </AppCard>

        <AppButton
          title="Open Document"
          onPress={() => {}}
          style={styles.button}
        />

        <AppButton
          title="Download Document"
          variant="outline"
          onPress={() => {}}
        />
      </ScrollView>
    </AppScreen>
  );
};

const InfoRow = ({ label, value, last }) => (
  <View
    style={[
      styles.infoRow,
      !last && styles.border,
    ]}
  >
    <AppText size="sm" color="textSecondary">
      {label}
    </AppText>

    <AppText
      size="sm"
      weight="medium"
      style={styles.value}
    >
      {value}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  filePreview: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },

  fileIcon: {
    width: 82,
    height: 82,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },

  fileShape: {
    width: 32,
    height: 40,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 5,
  },

  fileName: {
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },

  card: {
    marginBottom: theme.spacing.lg,
  },

  infoList: {
    marginTop: theme.spacing.md,
  },

  infoRow: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  value: {
    maxWidth: "60%",
    textAlign: "right",
  },

  button: {
    marginBottom: theme.spacing.md,
  },
});

export default DocumentDetailsScreen;