import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const HearingActionCard = ({
  onManage,
  onCaseDetails,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Hearing Actions
      </AppText>

      <Pressable
        onPress={onManage}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.primaryText}
        >
          Manage Hearing
        </AppText>
      </Pressable>

      <Pressable
        onPress={onCaseDetails}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.secondaryText}
        >
          Open Case Details
        </AppText>
      </Pressable>
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
  },

  title: {
    color: COLORS.navy,
    marginBottom: 14,
  },

  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: COLORS.navy,
  },

  pressed: {
    opacity: 0.7,
  },
});

export default HearingActionCard;