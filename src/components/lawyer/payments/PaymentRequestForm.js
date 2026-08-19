import React from "react";

import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const PaymentRequestForm = ({
  amount,
  setAmount,
  description,
  setDescription,
  onSubmit,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Request Payment
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Enter the payment amount and reason
        for your request.
      </AppText>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Amount
        </AppText>

        <View style={styles.amountInput}>
          <AppText
            size="md"
            weight="bold"
            style={styles.currency}
          >
            ₹
          </AppText>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor="#8A99A8"
            style={styles.amountTextInput}
          />
        </View>
      </View>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Payment Description
        </AppText>

        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          placeholder="Explain the reason for this payment request..."
          placeholderTextColor="#8A99A8"
          style={styles.textarea}
        />
      </View>

      <Pressable
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.buttonText}
        >
          Submit Payment Request
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
    marginBottom: 14,
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 8,
  },

  amountInput: {
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  currency: {
    color: COLORS.navy,
    marginRight: 8,
  },

  amountTextInput: {
    flex: 1,
    height: "100%",
    color: COLORS.navy,
    fontSize: 16,
  },

  textarea: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 20,
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
  },
});

export default PaymentRequestForm;