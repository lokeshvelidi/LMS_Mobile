import React, {
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

import HearingDetailsCard from "../../../components/lawyer/hearings/HearingDetailsCard";

import HearingOutcomeForm from "../../../components/lawyer/hearings/HearingOutcomeForm";
import { getApiErrorMessage } from "../../../services/api/authService";
import { updateLawyerHearing } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const ManageHearingScreen = ({
  route,
}) => {
  const hearing = route?.params?.hearing ?? null;

  const [outcome, setOutcome] =
    useState("Completed");

  const [nextDate, setNextDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const handleSave = async () => {
    if (hearing?.id == null) {
      Alert.alert("Hearing unavailable", "A valid hearing is required.");
      return;
    }

    let nextHearingDate = null;
    if (nextDate.trim()) {
      const parsedDate = new Date(nextDate);
      if (Number.isNaN(parsedDate.getTime())) {
        Alert.alert("Invalid date", "Enter a valid next hearing date.");
        return;
      }
      nextHearingDate = parsedDate.toISOString();
    }

    try {
      await updateLawyerHearing(hearing.id, {
        result: outcome,
        notes: notes.trim() || null,
        judgment: null,
        caseStatus: null,
        nextHearingDate,
      });
      Alert.alert("Hearing Outcome", "The hearing outcome was saved successfully.");
    } catch (requestError) {
      Alert.alert("Update failed", getApiErrorMessage(requestError, "Unable to save the hearing outcome."));
    }
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
            Manage Hearing
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Record the hearing outcome and
            update the next stage of the
            case.
          </AppText>
        </View>

        {hearing ? (<><HearingDetailsCard hearing={hearing} />

        <HearingOutcomeForm
          outcome={outcome}
          setOutcome={setOutcome}
          nextDate={nextDate}
          setNextDate={setNextDate}
          notes={notes}
          setNotes={setNotes}
          onSave={handleSave}
        /></>) : (
          <View style={styles.emptyCard}><AppText size="sm" color="textSecondary">Hearing details are unavailable.</AppText></View>
        )}

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

  emptyCard: {
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 20,
  },
});

export default ManageHearingScreen;
