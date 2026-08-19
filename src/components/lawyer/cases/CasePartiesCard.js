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

const CasePartiesCard = ({
  caseData,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Parties
      </AppText>

      <View style={styles.party}>
        <View style={styles.avatar}>
          <AppText
            size="sm"
            weight="bold"
            style={styles.avatarText}
          >
            C
          </AppText>
        </View>

        <View style={styles.partyContent}>
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
            {caseData?.client ||
              "-"}
          </AppText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.party}>
        <View
          style={[
            styles.avatar,
            styles.respondentAvatar,
          ]}
        >
          <AppText
            size="sm"
            weight="bold"
            style={styles.avatarText}
          >
            O
          </AppText>
        </View>

        <View style={styles.partyContent}>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            OTHER PARTY
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData?.respondent || "-"}
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

  title: {
    color: COLORS.navy,
    marginBottom: 18,
  },

  party: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E4EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  respondentAvatar: {
    backgroundColor: "#F7EAC5",
  },

  avatarText: {
    color: COLORS.navy,
  },

  partyContent: {
    flex: 1,
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

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 16,
  },
});

export default CasePartiesCard;
