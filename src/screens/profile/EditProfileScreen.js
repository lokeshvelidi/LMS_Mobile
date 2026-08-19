import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppInput from "../../components/common/AppInput";
import AppButton from "../../components/common/AppButton";

import theme from "../../theme/theme";

const EditProfileScreen = () => {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      // Profile update API will be connected later.
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      <AppHeader
        title="Edit Profile"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AppInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <AppButton
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
});

export default EditProfileScreen;