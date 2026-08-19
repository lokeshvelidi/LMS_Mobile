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

import ClosureCaseSelector from "../../../components/lawyer/caseClosure/ClosureCaseSelector";

import ClosureSummary from "../../../components/lawyer/caseClosure/ClosureSummary";

import ClosureForm from "../../../components/lawyer/caseClosure/ClosureForm";
import { getLawyerCases } from "../../../services/api/lawyerService";

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
  const legacyCases = useMemo(
    () => [
      {
        caseNumber: "CIV-2026-004",
        client: "Vijay Kumar",
        type: "Civil",
        stage: "Case Work Completed",
        status: "Completed",
      },

      {
        caseNumber: "LC-2026-102",
        client: "test",
        type: "Criminal",
        stage: "Case Work Completed",
        status: "Completed",
      },

      {
        caseNumber: "CIV-2026-001",
        client: "Ramesh Kumar",
        type: "Civil",
        stage: "Case Work Completed",
        status: "Completed",
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

    Alert.alert(
      "Ready for Closure",
      "The case will be submitted for closure after API integration."
    );
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
