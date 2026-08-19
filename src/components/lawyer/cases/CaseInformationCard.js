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

const CaseInformationCard = ({
  caseData,
}) => {
  const information = [
    {
      label: "CASE NUMBER",
      value:
        caseData?.caseNumber || "-",
    },

    {
      label: "CASE TYPE",
      value: caseData?.type || "-",
    },

    {
      label: "CLIENT",
      value: caseData?.client || "-",
    },

    {
      label: "CASE STAGE",
      value: caseData?.stage || "-",
    },

    {
      label: "NEXT HEARING",
      value:
        caseData?.nextHearing || "-",
    },

    {
      label: "PRIORITY",
      value:
        caseData?.priority || "-",
    },
  ];

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Case Information
      </AppText>

      <View style={styles.grid}>
        {information.map((item) => (
          <View
            key={item.label}
            style={styles.item}
          >
            <AppText
              size="xs"
              weight="semiBold"
              style={styles.label}
            >
              {item.label}
            </AppText>

            <AppText
              size="sm"
              weight="semiBold"
              style={styles.value}
            >
              {item.value}
            </AppText>
          </View>
        ))}
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

  title: {
    color: COLORS.navy,
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    width: "50%",
    paddingRight: 12,
    marginBottom: 18,
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

export default CaseInformationCard;