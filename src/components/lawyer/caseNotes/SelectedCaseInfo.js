import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const SelectedCaseInfo = ({
  caseData,
}) => {
  if (!caseData) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText
            size="lg"
            weight="bold"
            style={styles.caseNumber}
          >
            {caseData.caseNumber}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.parties}
          >
            {caseData.client || "-"}
          </AppText>
        </View>

        <View style={styles.actionButton}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.actionText}
          >
            Open Case Details
          </AppText>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            CLIENT
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData.client || "-"}
          </AppText>
        </View>

        <View style={styles.infoItem}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            COURT
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData.court || "-"}
          </AppText>
        </View>

        <View style={styles.infoItem}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            STAGE
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData.stage || "-"}
          </AppText>
        </View>

        <View style={styles.infoItem}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            NEXT HEARING
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData.nextHearing || "-"}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  caseNumber: {
    color: COLORS.navy,
  },

  parties: {
    marginTop: 5,
  },

  actionButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  actionText: {
    color: COLORS.navy,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
  },

  infoItem: {
    width: "50%",
    marginBottom: 17,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 5,
    paddingRight: 10,
  },
});

export default SelectedCaseInfo;