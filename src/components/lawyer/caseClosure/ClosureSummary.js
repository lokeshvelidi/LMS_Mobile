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

const ClosureSummary = ({
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
            Closure Summary
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.subtitle}
          >
            Review the case before submitting
            it for closure.
          </AppText>
        </View>

        <View style={styles.completedBadge}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.completedText}
          >
            Completed
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

      <View style={styles.checklist}>
        <AppText
          size="sm"
          weight="bold"
          style={styles.checklistTitle}
        >
          Closure Checklist
        </AppText>

        <ChecklistItem
          text="Case work completed"
        />

        <ChecklistItem
          text="Required documents uploaded"
        />

        <ChecklistItem
          text="Hearing activities completed"
        />

        <ChecklistItem
          text="Final case update recorded"
        />
      </View>
    </View>
  );
};

const ChecklistItem = ({
  text,
}) => {
  return (
    <View style={styles.checkItem}>
      <View style={styles.checkCircle}>
        <AppText
          size="xs"
          weight="bold"
          style={styles.check}
        >
          ✓
        </AppText>
      </View>

      <AppText
        size="sm"
        color="textSecondary"
        style={styles.checkText}
      >
        {text}
      </AppText>
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

  completedBadge: {
    backgroundColor: "#DDEFD9",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },

  completedText: {
    color: "#27733A",
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

  checklist: {
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    paddingTop: 16,
    marginTop: 2,
  },

  checklistTitle: {
    color: COLORS.navy,
    marginBottom: 12,
  },

  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DDEFD9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  check: {
    color: "#27733A",
    fontSize: 10,
  },

  checkText: {
    flex: 1,
  },
});

export default ClosureSummary;