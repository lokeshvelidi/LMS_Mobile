import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";
import CaseStatusBadge from "./CaseStatusBadge";
import CasePriorityBadge from "./CasePriorityBadge";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
};

const CaseCard = ({
  caseItem,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.caseIdentity}>
          <AppText
            size="md"
            weight="bold"
            numberOfLines={1}
          >
            {caseItem.caseNumber}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.type}
          >
            {caseItem.type}
          </AppText>
        </View>

        <CaseStatusBadge
          status={caseItem.status}
        />
      </View>

      <View style={styles.divider} />

      <InfoRow
        label="Client"
        value={caseItem.client}
      />

      <InfoRow
        label="Stage"
        value={caseItem.stage}
      />

      <InfoRow
        label="Next Hearing"
        value={caseItem.nextHearing}
      />

      <View style={styles.bottomRow}>
        <View>
          <AppText
            size="xs"
            color="textSecondary"
            style={styles.priorityLabel}
          >
            Priority
          </AppText>

          <CasePriorityBadge
            priority={caseItem.priority}
          />
        </View>

        <AppText
          size="sm"
          weight="semiBold"
          style={styles.viewText}
        >
          View Details ›
        </AppText>
      </View>
    </Pressable>
  );
};

const InfoRow = ({
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <AppText
      size="xs"
      color="textSecondary"
    >
      {label}
    </AppText>

    <AppText
      size="sm"
      weight="medium"
      numberOfLines={1}
      style={styles.value}
    >
      {value || "-"}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.75,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  caseIdentity: {
    flex: 1,
    marginRight: 8,
  },

  type: {
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },

  infoRow: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    maxWidth: "65%",
    textAlign: "right",
  },

  bottomRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  priorityLabel: {
    marginBottom: 5,
  },

  viewText: {
    color: COLORS.navy,
    marginBottom: 4,
  },
});

export default CaseCard;