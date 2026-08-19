import React, { useEffect, useState } from "react";

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
import { getAdminCourt, updateAdminCourt } from "../../../services/api/adminCourtsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const EditCourtScreen = ({
  navigation,
  route,
}) => {
  const court = route?.params?.court;
  const courtId = court?.courtId ?? court?.id;
  const [loadingCourt, setLoadingCourt] = useState(true);
  useEffect(() => { if (courtId) getAdminCourt(courtId).then((item) => setName(item.courtName || "")).finally(() => setLoadingCourt(false)); }, [courtId]);
  const [name, setName] =
    useState(court?.name || "");

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the court name."
      );
      return;
    }

    updateAdminCourt(courtId, { courtId: Number(courtId), courtName: name }).then(() => Alert.alert("Court Updated", "The court details have been updated successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])).catch((e) => Alert.alert("Update failed", e.response?.data?.message || "Unable to update court."));
  };

  if (!court) {
    return (
      <AppScreen>
        <AppHeader
          title="Edit Court"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Court information unavailable
          </AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader
        title="Edit Court"
        subtitle="Update the court record."
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
          onPress={handleSave}
          style={styles.button}
        >
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.buttonText}
          >
            Save Changes
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

  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 8,
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

export default EditCourtScreen;
