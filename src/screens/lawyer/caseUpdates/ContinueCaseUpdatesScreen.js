import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import CaseUpdateSelector from "../../../components/lawyer/caseUpdates/CaseUpdateSelector";

import CaseProgressCard from "../../../components/lawyer/caseUpdates/CaseProgressCard";

import CaseUpdateForm from "../../../components/lawyer/caseUpdates/CaseUpdateForm";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerCases, updateLawyerCaseStatus } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const ContinueCaseUpdatesScreen = ({
  route,
}) => {
  const [cases, setCases] = useState([]);

  const initialCase =
    route?.params?.caseData ?? null;

  const [
    selectedCase,
    setSelectedCase,
  ] = useState(initialCase);

  useEffect(() => {
    let active = true;
    getLawyerCases()
      .then((items) => {
        if (!active) return;
        setCases(items);
        setSelectedCase((current) => current ?? items[0] ?? null);
      })
      .catch((requestError) => Alert.alert("Cases unavailable", getApiErrorMessage(requestError)));
    return () => { active = false; };
  }, []);

  const [
    updateType,
    setUpdateType,
  ] = useState("General Update");

  const [status, setStatus] =
    useState("In Progress");

  const [update, setUpdate] =
    useState("");

  const [nextAction, setNextAction] =
    useState("");

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    if (!update.trim()) {
      Alert.alert(
        "Case Update Required",
        "Please enter the latest case update."
      );
      return;
    }

    if (!selectedCase?.id) return Alert.alert("Case Update", "Select a valid assigned case.");
    setSaving(true);
    try {
      await updateLawyerCaseStatus(selectedCase.id, status);
      Alert.alert("Case Update", "Case status updated successfully.");
      setCases((items) => items.map((item) => item.id === selectedCase.id ? { ...item, status } : item));
      setSelectedCase((item) => item ? { ...item, status } : item);
    } catch (error) {
      Alert.alert("Case Update Failed", getApiErrorMessage(error, "Unable to update case status."));
    } finally { setSaving(false); }
  };

  const handleCaseSelect = (item) => {
    setSelectedCase(item);
    setStatus(
      item.status || "In Progress"
    );
    setUpdate("");
    setNextAction("");
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Continue Case Updates
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Keep your assigned cases updated
            with the latest progress and next
            actions.
          </AppText>
        </View>

        <CaseUpdateSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleCaseSelect
          }
        />

        <CaseProgressCard
          caseData={selectedCase}
        />

        <CaseUpdateForm
          updateType={updateType}
          setUpdateType={setUpdateType}
          status={status}
          setStatus={setStatus}
          update={update}
          setUpdate={setUpdate}
          nextAction={nextAction}
          setNextAction={setNextAction}
          onSave={handleSave}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  bottomSpace: {
    height: 30,
  },
});

export default ContinueCaseUpdatesScreen;
