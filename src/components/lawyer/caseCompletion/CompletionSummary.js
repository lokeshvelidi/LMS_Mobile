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

const CompletionSummary = ({
  caseData,
}) => {
  const details = [
    {
      label: "CASE NUMBER",
      value: caseData?.caseNumber || "-",
    },
    {
      label: "CLIENT",
      value: caseData?.client || "-",
    },
    {
      label: "CASE TYPE",
      value: caseData?.type || "-",
    },
    {
      label: "CURRENT STAGE",
      value: caseData?.stage || "-",
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <AppText
            size="md"
            weight="bold"
            style={styles.title}
          >
            Case Summary
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.subtitle}
          >
            Review the case information
            before marking it completed.
          </AppText>
        </View>

        <View style={styles.statusBadge}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.statusText}
          >
            In Progress
          </AppText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.grid}>
        {details.map((item) => (
          <View
            key={item.label}
            style={styles.info}
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerContent: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 4,
    lineHeight: 18,
  },

  statusBadge: {
    backgroundColor: "#E4EEF9",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },

  statusText: {
    color: "#2563A8",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 17,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    width: "50%",
    marginBottom: 16,
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

export default CompletionSummary;