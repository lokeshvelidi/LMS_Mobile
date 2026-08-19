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
  border: "#DED9CE",
  gold: "#DDB52F",
};

const AssignedCaseCard = ({
  item,
  onPress,
  onEdit,
}) => {
  return (
    <Pressable
      onPress={() =>
        onPress?.(item)
      }
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      {/* Top */}

      <View style={styles.topRow}>
        <View style={styles.caseNumberWrapper}>
          <AppText
            size="md"
            weight="bold"
            style={styles.caseNumber}
          >
            {item.caseNumber}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.type}
          >
            {item.type}
          </AppText>
        </View>

        <CaseStatusBadge
          status={item.status}
        />
      </View>

      {/* Client */}

      <View style={styles.infoSection}>
        <AppText
          size="xs"
          weight="semiBold"
          style={styles.label}
        >
          CLIENT
        </AppText>

        <AppText
          size="md"
          weight="semiBold"
          style={styles.value}
        >
          {item.client}
        </AppText>
      </View>

      {/* Stage */}

      <View style={styles.infoSection}>
        <AppText
          size="xs"
          weight="semiBold"
          style={styles.label}
        >
          STAGE
        </AppText>

        <AppText
          size="sm"
          style={styles.value}
        >
          {item.stage || "-"}
        </AppText>
      </View>

      {/* Bottom information */}

      <View style={styles.bottomRow}>
        <View>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            PRIORITY
          </AppText>

          <View style={styles.badgeSpacing}>
            <CasePriorityBadge
              priority={item.priority}
            />
          </View>
        </View>

        <View style={styles.hearing}>
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
            {item.nextHearing || "-"}
          </AppText>
        </View>
      </View>

      {/* Action */}

      <View style={styles.actionRow}>
        <Pressable
          onPress={(event) => {
            event?.stopPropagation?.();
            onEdit?.(item);
          }}
          style={styles.editButton}
        >
          <AppText
            size="sm"
            weight="bold"
            style={styles.editText}
          >
            Edit
          </AppText>
        </Pressable>

        <View style={styles.viewAction}>
          <AppText
            size="sm"
            weight="bold"
            style={styles.actionText}
          >
            View Case
          </AppText>

          <AppText
            size="lg"
            weight="bold"
            style={styles.arrow}
          >
            →
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.75,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  caseNumberWrapper: {
    flex: 1,
    paddingRight: 10,
  },

  caseNumber: {
    color: "#2563C7",
  },

  type: {
    marginTop: 4,
  },

  infoSection: {
    marginTop: 16,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
  },

  badgeSpacing: {
    marginTop: 6,
  },

  hearing: {
    alignItems: "flex-end",
  },

  actionRow: {
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EEE9DE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  editButton: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  editText: {
    color: COLORS.navy,
  },

  viewAction: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    color: COLORS.navy,
  },

  arrow: {
    color: COLORS.navy,
    marginLeft: 7,
  },
});

export default AssignedCaseCard;
