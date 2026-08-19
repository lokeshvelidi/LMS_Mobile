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
import { updateAdminCase } from "../../../services/api/adminCasesService";
import { getAdminAdvocates, getAdminClients, getAdminCourts, getAdminMasterValues } from "../../../services/api/adminReferenceService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const EditCaseScreen = ({
  navigation,
  route,
}) => {
  const caseItem =
    route?.params?.caseItem;

  const [caseNumber, setCaseNumber] =
    useState(caseItem?.caseNumber || "");

  const [client, setClient] =
    useState(caseItem?.client || "");
  const [clientId, setClientId] = useState(caseItem?.clientId ?? null);
  const [advocateId, setAdvocateId] = useState(caseItem?.advocateId ?? null);
  const [courtId, setCourtId] = useState(caseItem?.courtId ?? null);
  const [clients, setClients] = useState([]); const [advocates, setAdvocates] = useState([]); const [courts, setCourts] = useState([]);
  const [types, setTypes] = useState([]); const [priorities, setPriorities] = useState([]); const [stages, setStages] = useState([]); const [statuses, setStatuses] = useState([]); const [saving, setSaving] = useState(false);
  useEffect(() => { Promise.all([getAdminClients(), getAdminAdvocates(), getAdminCourts(), getAdminMasterValues("/api/master/case-types"), getAdminMasterValues("/api/master/priorities"), getAdminMasterValues("/api/master/case-statuses")]).then(([a,b,c,d,e,f]) => { setClients(a); setAdvocates(b); setCourts(c); setTypes(d.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)); setPriorities(e.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)); setStatuses(f.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)); }).catch(() => {}); }, []);
  useEffect(() => { if (!type) return; getAdminMasterValues(type.toLowerCase() === "criminal" ? "/api/master/criminal-stages" : "/api/master/civil-stages").then((a) => setStages(a.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean))).catch(() => setStages([])); }, [type]);

  const [stage, setStage] =
    useState(caseItem?.stage || "");

  const [nextHearing, setNextHearing] =
    useState(
      caseItem?.nextHearing || ""
    );

  const [type, setType] =
    useState(caseItem?.type || "Civil");

  const [priority, setPriority] =
    useState(
      caseItem?.priority || "Medium"
    );

  const [status, setStatus] =
    useState(
      caseItem?.status || "Open"
    );


  const handleSave = () => {
    if (!caseNumber.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the case number."
      );
      return;
    }

    if (!client.trim()) {
      Alert.alert(
        "Validation",
        "Please enter the client name."
      );
      return;
    }

    if (!clientId || !caseItem?.id) return Alert.alert("Validation", "Please select a client.");
    setSaving(true);
    updateAdminCase(caseItem.id, { caseId: Number(caseItem.id), caseNumber, caseType: type, clientId: Number(clientId), advocateId: advocateId ? Number(advocateId) : undefined, courtId: courtId ? Number(courtId) : undefined, caseStage: stage || undefined, caseStatus: status || undefined, priority, nextHearingDate: nextHearing || undefined })
      .then(() => Alert.alert("Case Updated", "The case details have been updated successfully.", [{ text: "OK", onPress: () => navigation.goBack() }]))
      .catch((e) => Alert.alert("Update failed", e.response?.data?.message || "Unable to update case."))
      .finally(() => setSaving(false));
  };

  if (!caseItem) {
    return (
      <AppScreen>
        <AppHeader
          title="Edit Case"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            Case information unavailable
          </AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader
        title="Edit Case"
        subtitle="Update the case record."
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

          <Field
            label="Case Number"
            value={caseNumber}
            onChangeText={setCaseNumber}
            placeholder="Enter case number"
            autoCapitalize="characters"
          />

          <SelectGroup label="Client" options={clients.map((item) => ({ id: item.clientId, label: item.name }))} selected={clientId} onSelect={setClientId} />
          <SelectGroup label="Advocate" options={advocates.map((item) => ({ id: item.advocateId, label: item.name }))} selected={advocateId} onSelect={setAdvocateId} />
          <SelectGroup label="Court" options={courts.map((item) => ({ id: item.courtId, label: item.courtName }))} selected={courtId} onSelect={setCourtId} />

          <OptionGroup label="Stage" values={stages} selected={stage} onSelect={setStage} />

          <Field
            label="Next Hearing"
            value={nextHearing}
            onChangeText={setNextHearing}
            placeholder="DD MMM YYYY"
          />

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

          <OptionGroup
            label="Status"
            values={statuses}
            selected={status}
            onSelect={setStatus}
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

export default EditCaseScreen;
