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

import CompletionCaseSelector from "../../../components/lawyer/caseCompletion/CompletionCaseSelector";

import CompletionSummary from "../../../components/lawyer/caseCompletion/CompletionSummary";

import CompletionForm from "../../../components/lawyer/caseCompletion/CompletionForm";
import { getLawyerCases, updateLawyerCaseStatus } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const CaseCompletedScreen = ({
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
    completionType,
    setCompletionType,
  ] = useState("Case Work Completed");

  const [
    completionNotes,
    setCompletionNotes,
  ] = useState("");

  const [
    finalDocument,
    setFinalDocument,
  ] = useState("");

  const handleComplete = () => {
    if (!completionNotes.trim()) {
      Alert.alert(
        "Completion Notes Required",
        "Please enter the final completion notes."
      );
      return;
    }

    if (!selectedCase?.id) return Alert.alert("Complete Case", "Select a valid assigned case.");
    updateLawyerCaseStatus(selectedCase.id, "Completed")
      .then(() => Alert.alert("Complete Case", "The case status was updated to Completed."))
      .catch((e) => Alert.alert("Complete Case failed", e.message || "Unable to complete the case."));
  };

  const handleCaseSelect = (item) => {
    setSelectedCase(item);
    setCompletionNotes("");
    setFinalDocument("");
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
            Case Completed
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Complete the case after all
            required work has been finished.
          </AppText>
        </View>

        <CompletionCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleCaseSelect
          }
        />

        <CompletionSummary
          caseData={selectedCase}
        />

        <CompletionForm
          completionType={
            completionType
          }
          setCompletionType={
            setCompletionType
          }
          completionNotes={
            completionNotes
          }
          setCompletionNotes={
            setCompletionNotes
          }
          finalDocument={
            finalDocument
          }
          setFinalDocument={
            setFinalDocument
          }
          onComplete={
            handleComplete
          }
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

export default CaseCompletedScreen;
