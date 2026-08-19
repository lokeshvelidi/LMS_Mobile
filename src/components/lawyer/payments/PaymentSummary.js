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

const PaymentSummary = ({
  caseData,
  amount,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Payment Summary
      </AppText>

      <View style={styles.row}>
        <View>
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            CASE
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {caseData?.caseNumber || "-"}
          </AppText>
        </View>

        <View style={styles.right}>
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
            {caseData?.client || "-"}
          </AppText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.amountRow}>
        <AppText
          size="sm"
          color="textSecondary"
        >
          Requested Amount
        </AppText>

        <AppText
          size="xl"
          weight="bold"
          style={styles.amount}
        >
          ₹{amount || "0"}
        </AppText>
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  right: {
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

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 17,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    color: COLORS.navy,
  },
});

export default PaymentSummary;