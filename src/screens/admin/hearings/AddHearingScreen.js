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
import { createAdminHearing, updateAdminHearing } from "../../../services/api/adminHearingsService";
import { getAdminCases } from "../../../services/api/adminCasesService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const AddHearingScreen = ({
  navigation,
  route,
}) => {
  const existing =
    route?.params?.hearing;

  const editMode =
    route?.params?.editMode;

  const [title, setTitle] =
    useState(existing?.title || "");

  const [caseNumber, setCaseNumber] =
    useState(
      existing?.caseNumber || ""
    );
  const [caseId, setCaseId] = useState(existing?.caseId ?? null);
  const [cases, setCases] = useState([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => { (async () => { try { const pageSize = 100; let page = 1; let all = []; let total = null; do { const result = await getAdminCases({ page, pageSize }); all = all.concat(result.items); total = result.total; if (!result.items.length || all.length >= total || result.items.length < pageSize) break; page += 1; } while (total == null || all.length < total); setCases(all); } catch (e) { Alert.alert("Cases unavailable", e.response?.data?.message || "Unable to load cases."); } })(); }, []);

  const [client, setClient] =
    useState(existing?.client || "");

  const [date, setDate] =
    useState(existing?.date || "");

  const [time, setTime] =
    useState(existing?.time || "");

  const [duration, setDuration] =
    useState(
      existing?.duration || ""
    );

  const [court, setCourt] =
    useState(existing?.court || "");

  const [judge, setJudge] =
    useState(existing?.judge || "");

  const [type, setType] =
    useState(
      existing?.type ||
        "Court Hearing"
    );

  const types = [
    "Court Hearing",
    "Client Meeting",
    "Advocate Meeting",
    "Mediation",
  ];

  const handleSave = () => {
    if (!caseId) {
      Alert.alert(
        "Validation",
        "Please select a case."
      );
      return;
    }

    if (!date.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the date."
      );
      return;
    }

    setSaving(true);
    const payload = { hearingId: existing?.hearingId, caseId: Number(caseId), hearingDate: new Date(date).toISOString(), courtHall: court || undefined, purpose: type || undefined, notes: title || undefined };
    const request = editMode ? updateAdminHearing(existing.hearingId, payload) : createAdminHearing(payload);
    request.then(() => Alert.alert(editMode ? "Hearing Updated" : "Hearing Created", editMode ? "The hearing has been updated successfully." : "The hearing has been created successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])).catch((e) => Alert.alert("Hearing save failed", e.response?.data?.message || "Unable to save hearing.")).finally(() => setSaving(false));
  };

  return (
    <AppScreen>
      <AppHeader
        title={
          editMode
            ? "Edit Hearing"
            : "Add Hearing"
        }
        subtitle={
          editMode
            ? "Update the hearing details."
            : "Schedule a new hearing."
        }
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
            Hearing Information
          </AppText>

          <Field
            label="Hearing Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter hearing title"
          />

          <AppText size="sm" weight="semiBold" style={styles.label}>Case</AppText>
          <View style={styles.options}>{cases.map((item) => <Pressable key={String(item.id)} onPress={() => { setCaseId(item.id); setCaseNumber(item.caseNumber); }} style={styles.option}><AppText>{item.caseNumber}</AppText></Pressable>)}</View>

          <Field
            label="Client"
            value={client}
            onChangeText={setClient}
            placeholder="Enter client name"
          />

          <Field
            label="Date"
            value={date}
            onChangeText={setDate}
            placeholder="DD MMM YYYY"
          />

          <AppText size="xs" color="textSecondary">The backend Hearing DTO provides hearingDate; separate time/duration fields are not submitted.</AppText>

          <Field
            label="Duration"
            value={duration}
            onChangeText={setDuration}
            placeholder="1 hr"
          />

          <Field
            label="Court"
            value={court}
            onChangeText={setCourt}
            placeholder="Enter court"
          />

          <Field
            label="Judge"
            value={judge}
            onChangeText={setJudge}
            placeholder="Enter judge name"
          />

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Hearing Type
          </AppText>

          <View style={styles.options}>
            {types.map((item) => {
              const active =
                type === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setType(item)
                  }
                  style={[
                    styles.option,
                    active &&
                      styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={
                      active
                        ? "semiBold"
                        : "medium"
                    }
                    style={{
                      color: active
                        ? COLORS.navy
                        : COLORS.secondary,
                    }}
                  >
                    {item}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
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
            {editMode
              ? "Save Changes"
              : "Schedule Hearing"}
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
}) => (
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

export default AddHearingScreen;
