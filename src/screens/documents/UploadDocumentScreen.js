import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import AppInput from "../../components/common/AppInput";
import AppButton from "../../components/common/AppButton";
import AppCard from "../../components/common/AppCard";

import theme from "../../theme/theme";

const UploadDocumentScreen = () => {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.length) {
      const selectedFile = result.assets[0];

      setFile(selectedFile);

      if (!documentName) {
        setDocumentName(selectedFile.name);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !documentName || !caseNumber) {
      return;
    }

    setLoading(true);

    try {
      // Backend upload will be connected here later.
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      <AppHeader
        title="Upload Document"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AppCard style={styles.card}>
          <Pressable
            onPress={pickDocument}
            style={styles.dropZone}
          >
            <View style={styles.uploadIcon}>
              <View style={styles.uploadShape} />
            </View>

            <AppText
              size="md"
              weight="semiBold"
            >
              {file
                ? file.name
                : "Select a document"}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.helpText}
            >
              Tap to select a file from your device
            </AppText>
          </Pressable>
        </AppCard>

        <AppInput
          label="Document Name"
          placeholder="Enter document name"
          value={documentName}
          onChangeText={setDocumentName}
        />

        <AppInput
          label="Case Number"
          placeholder="Enter related case number"
          value={caseNumber}
          onChangeText={setCaseNumber}
          autoCapitalize="characters"
        />

        <AppButton
          title="Upload Document"
          onPress={handleUpload}
          loading={loading}
          disabled={
            loading ||
            !file ||
            !documentName ||
            !caseNumber
          }
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  card: {
    marginBottom: theme.spacing.xl,
  },

  dropZone: {
    minHeight: 190,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xxl,
  },

  uploadIcon: {
    width: 54,
    height: 54,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  uploadShape: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
  },

  helpText: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});

export default UploadDocumentScreen;