import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../components/common/AppText";
import AppInput from "../../components/common/AppInput";
import AppButton from "../../components/common/AppButton";
import theme from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../services/api/authService";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(email.trim().toLowerCase(), password);
    } catch (error) {
      setPasswordError(getApiErrorMessage(error, "Unable to sign in. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
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
          <View style={styles.brandContainer}>
            <View style={styles.logoContainer}>
              <AppText
                size="xxl"
                weight="bold"
                color="textWhite"
              >
                V
              </AppText>
            </View>

            <AppText
              size="xxxl"
              weight="bold"
              style={styles.brandName}
            >
              LMS
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.subtitle}
            >
              Lawyer Case Tracking System
            </AppText>
          </View>

          <View style={styles.formContainer}>
            <AppText
              size="xxl"
              weight="bold"
              style={styles.welcomeTitle}
            >
              Welcome Back
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.welcomeSubtitle}
            >
              Sign in to continue to your account
            </AppText>

            <View style={styles.form}>
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
                textContentType="emailAddress"
                error={emailError}
              />

              <View>
                <AppInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  error={passwordError}
                />

                <Pressable
                  onPress={() =>
                    setShowPassword((previous) => !previous)
                  }
                  style={styles.passwordToggle}
                  hitSlop={10}
                >
                  <AppText
                    size="sm"
                    color="primary"
                    weight="medium"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </AppText>
                </Pressable>
              </View>

              <Pressable
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
                hitSlop={8}
              >
                <AppText
                  size="sm"
                  color="primary"
                  weight="medium"
                >
                  Forgot Password?
                </AppText>
              </Pressable>

              <AppButton
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.loginButton}
              />
            </View>
          </View>
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
    paddingVertical: theme.spacing.xxxl,
  },

  brandContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.xxxl,
  },

  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },

  brandName: {
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    textAlign: "center",
  },

  formContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    ...theme.shadows.medium,
  },

  welcomeTitle: {
    marginBottom: theme.spacing.xs,
  },

  welcomeSubtitle: {
    marginBottom: theme.spacing.xxl,
  },

  form: {
    width: "100%",
  },

  passwordToggle: {
    position: "absolute",
    right: theme.spacing.lg,
    top: 43,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },

  loginButton: {
    width: "100%",
  },
});

export default LoginScreen;
