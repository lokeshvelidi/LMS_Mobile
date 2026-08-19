import React, { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
  danger: "#D9534F",
};

const AddUserScreen = ({
  navigation,
}) => {
  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [role, setRole] =
    useState("Client");

  const roles = [
    "Client",
    "Advocate",
    "Clerk",
    "Administrator",
  ];

  const handleCreate = () => {
    Alert.alert("Unavailable", "The backend does not expose an AppUser create endpoint.");
  };

  return (
    <AppScreen>
      <AppHeader
        title="Add User"
        showNotification={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.card}>
          <AppText
            size="lg"
            weight="bold"
          >
            User Information
          </AppText>

          <Field
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
          />

          <Field
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none"
          />

          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Field
            label="Mobile"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
          />

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Role
          </AppText>

          <View style={styles.roles}>
            {roles.map((item) => {
              const active = role === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setRole(item)
                  }
                  style={[
                    styles.role,
                    active &&
                      styles.activeRole,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={
                      active
                        ? "semiBold"
                        : "medium"
                    }
                    style={{
                      color: active
                        ? COLORS.navy
                        : COLORS.secondary,
                    }}
                  >
                    {item}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={handleCreate}
          style={styles.createButton}
        >
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.createText}
          >
            Create User (Unavailable)
          </AppText>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
};

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
}) => {
  return (
    <View style={styles.field}>
      <AppText
        size="sm"
        weight="semiBold"
        style={styles.label}
      >
        {label}
      </AppText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          COLORS.secondary
        }
        keyboardType={keyboardType}
        autoCapitalize={
          autoCapitalize || "words"
        }
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 14,
  },

  roles: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  role: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
    marginBottom: 8,
  },

  activeRole: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  createButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  createText: {
    color: COLORS.white,
  },
});

export default AddUserScreen;
