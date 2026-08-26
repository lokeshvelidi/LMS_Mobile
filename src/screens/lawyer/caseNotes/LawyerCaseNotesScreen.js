import React, { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import AssignedCaseSelector from "../../../components/lawyer/caseNotes/AssignedCaseSelector";

import SelectedCaseInfo from "../../../components/lawyer/caseNotes/SelectedCaseInfo";

import CaseNotesInput from "../../../components/lawyer/caseNotes/CaseNotesInput";
import { getLawyerCases } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
};

const LawyerCaseNotesScreen = ({
  navigation,
  route,
}) => {
  const [cases, setCases] = useState([]);
  useEffect(() => {
    getLawyerCases()
      .then((items) => {
        setCases(items);
        setSelectedCase((current) => current ?? route?.params?.caseData ?? items[0] ?? null);
      })
      .catch((e) => Alert.alert("Cases unavailable", e.message));
  }, [route?.params?.caseData]);

  const initialCase =
    route?.params?.caseData ||
    cases[0] || null;

  const [selectedCase, setSelectedCase] =
    useState(initialCase);

  const [notes, setNotes] =
    useState("");

  const handleSelectCase = (item) => {
    setSelectedCase(item);

    setNotes("");
  };

  const handleSave = () => {
    Alert.alert("Case Notes", "Saving case notes is unavailable because the backend exposes no case-notes endpoint.");
  };

  const handleOpenDetails = () => {
    navigation
      ?.getParent()
      ?.navigate(
        "LawyerCaseDetails",
        {
          caseData: selectedCase,
        }
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
        {/* Page Header */}

        <View style={styles.pageHeader}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Add Case Notes
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Record advocate observations,
            hearing preparation, and internal
            updates without leaving your
            assigned case workflow.
          </AppText>
        </View>

        {/* Assigned Cases */}

        <AssignedCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleSelectCase
          }
        />

        {/* Selected Case */}

        <View style={styles.section}>
          <SelectedCaseInfo
            caseData={selectedCase}
          />
        </View>

        {/* Notes */}

        <CaseNotesInput
          value={notes}
          onChangeText={setNotes}
        />

        {/* Save */}

        <View style={styles.saveContainer}>
          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <AppText
              size="sm"
              weight="bold"
              style={styles.saveText}
            >
              Save Case Notes
            </AppText>
          </Pressable>

          <Pressable
            style={styles.detailsButton}
            onPress={handleOpenDetails}
          >
            <AppText
              size="sm"
              weight="bold"
              style={
                styles.detailsText
              }
            >
              Open Case Details
            </AppText>
          </Pressable>
        </View>

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

  pageHeader: {
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

  section: {
    marginTop: 14,
  },

  saveContainer: {
    marginTop: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: "#FFFFFF",
  },

  detailsButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  detailsText: {
    color: COLORS.navy,
  },

  bottomSpace: {
    height: 30,
  },
});

export default LawyerCaseNotesScreen;
