import React, {
  useState,
} from "react";
import * as DocumentPicker from "expo-document-picker";

import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
};

const CourtOrderUpload = ({
  onUpload,
}) => {
  const [fileName, setFileName] =
    useState("");

  const [description, setDescription] =
    useState("");
  const [file, setFile] = useState(null);

  const handleChooseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
    if (!result.canceled && result.assets?.[0]) {
      setFile(result.assets[0]);
      setFileName(result.assets[0].name);
    }
  };

  const handleUpload = () => {
    if (!fileName) {
      Alert.alert(
        "Select Document",
        "Please select a court order document first."
      );
      return;
    }

    onUpload?.({
      fileName,
      description,
      file,
    });
  };

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Upload Court Order
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Upload the latest court order
        document for the selected case.
      </AppText>

      <Pressable
        onPress={handleChooseFile}
        style={({ pressed }) => [
          styles.uploadArea,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.uploadIcon}>
          <AppText
            size="lg"
            weight="bold"
            style={styles.uploadIconText}
          >
            ↑
          </AppText>
        </View>

        <AppText
          size="sm"
          weight="bold"
          style={styles.chooseText}
        >
          {fileName
            ? fileName
            : "Choose Court Order"}
        </AppText>

        <AppText
          size="xs"
          color="textSecondary"
          style={styles.helper}
        >
          PDF document
        </AppText>
      </Pressable>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Description
        </AppText>

        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          placeholder="Add a short description..."
          placeholderTextColor="#8A99A8"
          style={styles.textarea}
        />
      </View>

      <Pressable
        onPress={handleUpload}
        style={({ pressed }) => [
          styles.uploadButton,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.buttonText}
        >
          Upload Court Order
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  uploadArea: {
    minHeight: 135,
    marginTop: 17,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#C8C1B4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  pressed: {
    opacity: 0.7,
  },

  uploadIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
  },

  uploadIconText: {
    color: COLORS.navy,
  },

  chooseText: {
    color: COLORS.navy,
    marginTop: 9,
    textAlign: "center",
  },

  helper: {
    marginTop: 4,
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 8,
  },

  textarea: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 20,
  },

  uploadButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
  },
});

export default CourtOrderUpload;
