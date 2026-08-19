import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import PaymentCaseSelector from "../../../components/lawyer/payments/PaymentCaseSelector";

import PaymentSummary from "../../../components/lawyer/payments/PaymentSummary";

import PaymentRequestForm from "../../../components/lawyer/payments/PaymentRequestForm";
import { getApiErrorMessage } from "../../../services/api/authService";
import { createLawyerPaymentRequest, getLawyerCases } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
};

const RequestPaymentScreen = ({
  route,
}) => {
  const [cases, setCases] = useState([]);

  const initialCase =
    route?.params?.caseData ?? null;

  const [
    selectedCase,
    setSelectedCase,
  ] = useState(initialCase);

  useEffect(() => {
    let active = true;
    getLawyerCases()
      .then((items) => {
        if (!active) return;
        setCases(items);
        setSelectedCase((current) => current ?? items[0] ?? null);
      })
      .catch((requestError) => Alert.alert("Cases unavailable", getApiErrorMessage(requestError)));
    return () => { active = false; };
  }, []);

  const [amount, setAmount] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!amount.trim()) {
      Alert.alert(
        "Amount Required",
        "Please enter the payment amount."
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Description Required",
        "Please enter the payment description."
      );
      return;
    }

    if (!selectedCase?.id) return Alert.alert("Payment Request", "Select a valid assigned case.");
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) return Alert.alert("Invalid Amount", "Enter a valid positive amount.");
    setSubmitting(true);
    try {
      await createLawyerPaymentRequest({ caseId: Number(selectedCase.id), amount: numericAmount, description, submitForApproval: true });
      Alert.alert("Payment Request", "Payment request submitted successfully.");
      setAmount(""); setDescription("");
    } catch (error) {
      Alert.alert("Payment Request Failed", getApiErrorMessage(error, "Unable to submit payment request."));
    } finally { setSubmitting(false); }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Request Payment
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Submit a payment request for an
            assigned case.
          </AppText>
        </View>

        <PaymentCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            setSelectedCase
          }
        />

        <PaymentSummary
          caseData={selectedCase}
          amount={amount}
        />

        <PaymentRequestForm
          amount={amount}
          setAmount={setAmount}
          description={description}
          setDescription={setDescription}
          onSubmit={handleSubmit}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  bottomSpace: {
    height: 30,
  },
});

export default RequestPaymentScreen;
