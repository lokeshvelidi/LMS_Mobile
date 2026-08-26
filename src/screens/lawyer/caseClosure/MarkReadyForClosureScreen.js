import React, { useState } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import ClosureCaseSelector from "../../../components/lawyer/caseClosure/ClosureCaseSelector";

import ClosureSummary from "../../../components/lawyer/caseClosure/ClosureSummary";

import ClosureForm from "../../../components/lawyer/caseClosure/ClosureForm";
import { getLawyerCases, updateLawyerCaseStatus } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const MarkReadyForClosureScreen = ({
  route,
}) => {
  const [cases, setCases] = useState([]);
  React.useEffect(() => { getLawyerCases().then(setCases).catch((e) => Alert.alert("Cases unavailable", e.message)); }, []);
  const initialCase =
    route?.params?.caseData || cases[0] || null;

  const [
    selectedCase,
    setSelectedCase,
  ] = useState(initialCase);

  const [
    closureNotes,
    setClosureNotes,
  ] = useState("");

  const [
    closureReference,
    setClosureReference,
  ] = useState("");

  const handleCaseSelect = (item) => {
    setSelectedCase(item);
    setClosureNotes("");
    setClosureReference("");
  };

  const handleSubmit = () => {
    if (!closureNotes.trim()) {
      Alert.alert(
        "Closure Notes Required",
        "Please enter the final closure notes."
      );
      return;
    }

    if (!selectedCase?.id) return Alert.alert("Ready for Closure", "Select a valid assigned case.");
    updateLawyerCaseStatus(selectedCase.id, "Ready for Closure")
      .then(() => Alert.alert("Ready for Closure", "The case status was updated to Ready for Closure."))
      .catch((e) => Alert.alert("Closure submission failed", e.message || "Unable to submit the case for closure."));
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
            Ready for Closure
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Submit completed cases for the
            next closure stage.
          </AppText>
        </View>

        <ClosureCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleCaseSelect
          }
        />

        <ClosureSummary
          caseData={selectedCase}
        />

        <ClosureForm
          closureNotes={closureNotes}
          setClosureNotes={
            setClosureNotes
          }
          closureReference={
            closureReference
          }
          setClosureReference={
            setClosureReference
          }
          onSubmit={handleSubmit}
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

export default MarkReadyForClosureScreen;
