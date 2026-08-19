import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../components/common/AppText";
import AppInput from "../../components/common/AppInput";
import AppButton from "../../components/common/AppButton";
import theme from "../../theme/theme";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      /*
       * Password reset API will be connected here.
       */
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Forgot Password
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.description}
          >
            Enter your registered email address and we will
            send you instructions to reset your password.
          </AppText>

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);

              if (emailError) {
                setEmailError("");
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
          />

          <AppButton
            title="Continue"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          />

          <AppButton
            title="Back to Login"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  content: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: theme.spacing.xxl,
  },

  title: {
    marginBottom: theme.spacing.sm,
  },

  description: {
    marginBottom: theme.spacing.xxl,
    lineHeight: 22,
  },

  button: {
    marginBottom: theme.spacing.md,
  },
});

export default ForgotPasswordScreen;