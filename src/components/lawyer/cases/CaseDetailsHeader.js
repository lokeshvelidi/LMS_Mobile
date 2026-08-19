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
  gold: "#E7C45A",
};

const CaseDetailsHeader = ({
  caseData,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.caseInfo}>
          <AppText
            size="lg"
            weight="bold"
            style={styles.caseNumber}
          >
            {caseData?.caseNumber ||
              "Case"}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.parties}
          >
            {caseData?.client ||
              "Client"}
          </AppText>
        </View>

        <View style={styles.typeBadge}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.typeText}
          >
            {caseData?.type ||
              "Case"}
          </AppText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statusRow}>
        <View>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            STATUS
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData?.status ||
              "-"}
          </AppText>
        </View>

        <View style={styles.rightValue}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            PRIORITY
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData?.priority ||
              "-"}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  caseInfo: {
    flex: 1,
    paddingRight: 12,
  },

  caseNumber: {
    color: COLORS.navy,
  },

  parties: {
    marginTop: 5,
  },

  typeBadge: {
    backgroundColor: "#F7EAC5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  typeText: {
    color: COLORS.navy,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 16,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rightValue: {
    alignItems: "flex-end",
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 5,
  },
});

export default CaseDetailsHeader;