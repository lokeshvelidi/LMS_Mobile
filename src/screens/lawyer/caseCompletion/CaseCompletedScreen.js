import React, {
  useMemo,
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

import CompletionCaseSelector from "../../../components/lawyer/caseCompletion/CompletionCaseSelector";

import CompletionSummary from "../../../components/lawyer/caseCompletion/CompletionSummary";

import CompletionForm from "../../../components/lawyer/caseCompletion/CompletionForm";
import { getLawyerCases } from "../../../services/api/lawyerService";

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
  const legacyCases = useMemo(
    () => [
      {
        caseNumber: "CIV-2026-004",
        client: "Vijay Kumar",
        type: "Civil",
        stage: "Written Statement",
        status: "In Progress",
      },

      {
        caseNumber: "LC-2026-102",
        client: "test",
        type: "Criminal",
        stage: "Stage not set",
        status: "New",
      },

      {
        caseNumber: "CIV-2026-001",
        client: "Ramesh Kumar",
        type: "Civil",
        stage: "Evidence",
        status: "In Progress",
      },
    ],
    []
  );

  const initialCase =
    route?.params?.caseData || cases[0] || legacyCases[0];

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

    Alert.alert(
      "Complete Case",
      "The case will be marked as completed after API integration."
    );
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
