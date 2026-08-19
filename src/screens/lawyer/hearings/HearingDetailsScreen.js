import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import HearingDetailsCard from "../../../components/lawyer/hearings/HearingDetailsCard";

import HearingActionCard from "../../../components/lawyer/hearings/HearingActionCard";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const HearingDetailsScreen = ({
  navigation,
  route,
}) => {
  const hearing = route?.params?.hearing ?? null;

  const handleManage = () => {
    navigation
      ?.getParent()
      ?.navigate(
        "ManageHearing",
        {
          hearing,
        }
      );
  };

  const handleCaseDetails = () => {
    navigation
      ?.getParent()
      ?.navigate(
        "LawyerCaseDetails",
        {
          caseData: hearing?.caseData ?? null,
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
        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Hearing Details
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Review the hearing information
            and manage its outcome.
          </AppText>
        </View>

        {hearing ? (<>
          <HearingDetailsCard hearing={hearing} />
          <HearingActionCard onManage={handleManage} onCaseDetails={handleCaseDetails} />
        </>) : (
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

export default HearingDetailsScreen;
