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
import { createAdminCase } from "../../../services/api/adminCasesService";
import { getAdminAdvocates, getAdminClients, getAdminCourts, getAdminMasterValues } from "../../../services/api/adminReferenceService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const AddCaseScreen = ({
  navigation,
}) => {
  const [caseNumber, setCaseNumber] =
    useState("");

  const [client, setClient] =
    useState("");
  const [clientId, setClientId] = useState(null);
  const [advocateId, setAdvocateId] = useState(null);
  const [courtId, setCourtId] = useState(null);
  const [clients, setClients] = useState([]);
  const [advocates, setAdvocates] = useState([]);
  const [courts, setCourts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { Promise.all([getAdminClients(), getAdminAdvocates(), getAdminCourts()]).then(([a,b,c]) => { setClients(a); setAdvocates(b); setCourts(c); }).catch((e) => Alert.alert("Reference data unavailable", e.response?.data?.message || "Unable to load clients, advocates, or courts.")); }, []);

  const [stage, setStage] =
    useState("");

  const [nextHearing, setNextHearing] =
    useState("");

  const [type, setType] =
    useState("Civil");

  const [priority, setPriority] =
    useState("Medium");

  const [types, setTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [stages, setStages] = useState([]);
  const [masterError, setMasterError] = useState("");
  useEffect(() => { Promise.all([getAdminMasterValues("/api/master/case-types"), getAdminMasterValues("/api/master/priorities")]).then(([a,b]) => { setTypes(a.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)); setPriorities(b.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)); }).catch(() => setMasterError("Unable to load case types or priorities.")); }, []);
  useEffect(() => { if (!type) return; const path = type.toLowerCase() === "criminal" ? "/api/master/criminal-stages" : "/api/master/civil-stages"; getAdminMasterValues(path).then((a) => setStages(a.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean))).catch(() => setStages([])); }, [type]);

  const handleCreate = () => {
    if (!caseNumber.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the case number."
      );
      return;
    }

    if (!clientId) {
      Alert.alert(
        "Validation",
        "Please select a client."
      );
      return;
    }

    setSubmitting(true);
    createAdminCase({ caseNumber, caseType: type, clientId: Number(clientId), advocateId: advocateId ? Number(advocateId) : undefined, courtId: courtId ? Number(courtId) : undefined, caseStage: stage || undefined, priority, nextHearingDate: nextHearing || undefined })
      .then(() => Alert.alert("Case Created", "The case has been created successfully.", [{ text: "OK", onPress: () => navigation.goBack() }]))
      .catch((e) => Alert.alert("Create failed", e.response?.data?.message || "Unable to create case."))
      .finally(() => setSubmitting(false));
  };

  return (
    <AppScreen>
      <AppHeader
        title="Add Case"
        subtitle="Create a new case record."
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
            Case Information
          </AppText>

          <SelectGroup label="Client" options={clients.map((item) => ({ id: item.clientId, label: item.name }))} selected={clientId} onSelect={(id) => { setClientId(id); setClient(clients.find((item) => item.clientId === id)?.name || ""); }} />
          <SelectGroup label="Advocate" options={advocates.map((item) => ({ id: item.advocateId, label: item.name }))} selected={advocateId} onSelect={setAdvocateId} />
          <SelectGroup label="Court" options={courts.map((item) => ({ id: item.courtId, label: item.courtName }))} selected={courtId} onSelect={setCourtId} />
          <Field
            label="Case Number"
            value={caseNumber}
            onChangeText={setCaseNumber}
            placeholder="Enter case number"
            autoCapitalize="characters"
          />

          <OptionGroup label="Stage" values={stages} selected={stage} onSelect={setStage} />

          <Field
            label="Next Hearing"
            value={nextHearing}
            onChangeText={setNextHearing}
            placeholder="DD MMM YYYY"
          />

          {masterError ? <AppText size="xs" color="textSecondary">{masterError}</AppText> : null}
          <OptionGroup
            label="Case Type"
            values={types}
            selected={type}
            onSelect={setType}
          />

          <OptionGroup
            label="Priority"
            values={priorities}
            selected={priority}
            onSelect={setPriority}
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
            Create Case
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
      placeholderTextColor={COLORS.secondary}
      autoCapitalize={
        autoCapitalize || "words"
      }
      style={styles.input}
    />
  </View>
);

const OptionGroup = ({
  label,
  values,
  selected,
  onSelect,
}) => (
  <View style={styles.group}>
    <AppText
      size="sm"
      weight="semiBold"
      style={styles.label}
    >
      {label}
    </AppText>

    <View style={styles.options}>
      {values.map((item) => {
        const active = selected === item;

        return (
          <Pressable
            key={item}
            onPress={() =>
              onSelect(item)
            }
            style={[
              styles.option,
              active && styles.activeOption,
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
);

const SelectGroup = ({ label, options, selected, onSelect }) => (
  <View style={styles.group}>
    <AppText size="sm" weight="semiBold" style={styles.label}>{label}</AppText>
    <View style={styles.options}>
      {options.length === 0 ? <AppText size="xs" color="textSecondary">No options loaded</AppText> : options.map((item) => (
        <Pressable key={String(item.id)} onPress={() => onSelect(item.id)} style={[styles.option, selected === item.id && styles.activeOption]}>
          <AppText size="sm" style={{ color: selected === item.id ? COLORS.navy : COLORS.secondary }}>{item.label || "Unnamed"}</AppText>
        </Pressable>
      ))}
    </View>
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

  group: {
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

export default AddCaseScreen;
