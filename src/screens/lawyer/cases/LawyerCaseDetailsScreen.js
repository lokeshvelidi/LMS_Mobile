import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import CaseDetailsHeader from "../../../components/lawyer/cases/CaseDetailsHeader";

import CaseInformationCard from "../../../components/lawyer/cases/CaseInformationCard";

import CasePartiesCard from "../../../components/lawyer/cases/CasePartiesCard";

import CaseTimeline from "../../../components/lawyer/cases/CaseTimeline";

import CaseActionButton from "../../../components/lawyer/cases/CaseActionButton";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerCaseDetail } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const LawyerCaseDetailsScreen = ({
  navigation,
  route,
}) => {
  const initialCase = route?.params?.caseData ?? null;
  const [caseData, setCaseData] = useState(initialCase);
  const [loading, setLoading] = useState(Boolean(initialCase?.id));
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (initialCase?.id == null) return;
    let active = true;
    setLoading(true);
    setError("");
    getLawyerCaseDetail(initialCase.id)
      .then((item) => active && setCaseData(item))
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, "Unable to load case details."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [initialCase?.id, reloadKey]);

  const handleCaseNotes = () => {
    navigation
      ?.getParent()
      ?.navigate("CaseNotes", {
        caseData,
      });
  };

  const handleHearing = () => {
    navigation
      ?.getParent()
      ?.navigate("HearingDesk");
  };

  const handleDocuments = () => {
    navigation
      ?.getParent()
      ?.navigate("Documents", {
        caseData,
      });
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
        {/* Header */}

        <View style={styles.pageHeader}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Case Details
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Review the assigned case,
            client information, documents
            and current progress.
          </AppText>
        </View>

        {loading ? (
          <View style={styles.stateCard}><ActivityIndicator size="large" color={COLORS.navy} /></View>
        ) : error ? (
          <View style={styles.stateCard}>
            <AppText size="sm" color="textSecondary">{error}</AppText>
            <Pressable style={styles.retryButton} onPress={() => setReloadKey((value) => value + 1)}>
              <AppText size="sm" weight="bold" style={styles.retryText}>Retry</AppText>
            </Pressable>
          </View>
        ) : caseData ? (<>

        {/* Case Header */}

        <CaseDetailsHeader
          caseData={caseData}
        />

        {/* Information */}

        <CaseInformationCard
          caseData={caseData}
        />

        {/* Parties */}

        <CasePartiesCard
          caseData={caseData}
        />

        {/* Timeline */}

        <CaseTimeline
          caseData={caseData}
        />

        {/* Actions */}

        <View style={styles.actionCard}>
          <AppText
            size="md"
            weight="bold"
            style={styles.actionTitle}
          >
            Case Actions
          </AppText>

          <CaseActionButton
            title="Add Case Notes"
            onPress={handleCaseNotes}
          />

          <View style={styles.gap} />

          <CaseActionButton
            title="View Documents"
            secondary
            onPress={
              handleDocuments
            }
          />

          <View style={styles.gap} />

          <CaseActionButton
            title="Open Hearing Desk"
            secondary
            onPress={handleHearing}
          />
        </View>
        </>) : (
          <View style={styles.stateCard}><AppText size="sm" color="textSecondary">Case details are unavailable.</AppText></View>
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

  actionCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#DED9CE",
  },

  stateCard: {
    minHeight: 160,
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  retryButton: {
    marginTop: 14,
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  retryText: { color: "#FFFFFF" },

  actionTitle: {
    color: COLORS.navy,
    marginBottom: 15,
  },

  gap: {
    height: 10,
  },

  bottomSpace: {
    height: 25,
  },
});

export default LawyerCaseDetailsScreen;
