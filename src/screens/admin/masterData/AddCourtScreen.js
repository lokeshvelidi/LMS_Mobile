import React, { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";
import { createAdminCourt } from "../../../services/api/adminCourtsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const AddCourtScreen = ({
  navigation,
}) => {
  const [name, setName] =
    useState("");


  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the court name."
      );
      return;
    }

    createAdminCourt({ courtName: name }).then(() => Alert.alert("Court Created", "The court has been created successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])).catch((e) => Alert.alert("Create failed", e.response?.data?.message || "Unable to create court."));
  };

  return (
    <AppScreen>
      <AppHeader
        title="Add Court"
        subtitle="Create a new court record."
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            Court Information
          </AppText>

          <Field
            label="Court Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter court name"
          />

        </View>

        <Pressable
          onPress={handleCreate}
          style={styles.button}
        >
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.buttonText}
          >
            Create Court
          </AppText>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
};

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
}) => {
  return (
    <View style={styles.field}>
      <AppText
        size="sm"
        weight="semiBold"
        style={styles.label}
      >
        {label}
      </AppText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          COLORS.secondary
        }
        autoCapitalize={
          autoCapitalize || "words"
        }
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 14,
  },

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
    marginBottom: 8,
  },

  activeOption: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  buttonText: {
    color: COLORS.white,
  },
});

export default AddCourtScreen;
