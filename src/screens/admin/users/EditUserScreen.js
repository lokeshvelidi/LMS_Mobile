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
};

const EditUserScreen = ({
  navigation,
  route,
}) => {
  const user = route?.params?.user;

  const [name, setName] =
    useState(user?.name || "");

  const [username, setUsername] =
    useState(user?.username || "");

  const [email, setEmail] =
    useState(user?.email || "");

  const [mobile, setMobile] =
    useState(user?.mobile || "");

  const [role, setRole] =
    useState(user?.role || "Client");

  const [status, setStatus] =
    useState(user?.status || "Active");

  const roles = [
    "Client",
    "Advocate",
    "Clerk",
    "Administrator",
  ];

  const statuses = [
    "Active",
    "Inactive",
  ];

  const handleSave = () => {
    Alert.alert("Unavailable", "The backend does not expose an AppUser update endpoint.");
  };

  if (!user) {
    return (
      <AppScreen>
        <AppHeader
          title="Edit User"
          showNotification={false}
        />

        <View style={styles.error}>
          <AppText
            size="lg"
            weight="semiBold"
          >
            User information unavailable
          </AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader
        title="Edit User"
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

          <View style={styles.options}>
            {roles.map((item) => {
              const active = role === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setRole(item)
                  }
                  style={[
                    styles.option,
                    active &&
                      styles.activeOption,
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

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Status
          </AppText>

          <View style={styles.options}>
            {statuses.map((item) => {
              const active =
                status === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setStatus(item)
                  }
                  style={[
                    styles.option,
                    active &&
                      styles.activeOption,
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
          onPress={handleSave}
          style={styles.saveButton}
        >
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.saveText}
          >
            Save Changes (Unavailable)
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

  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
    marginBottom: 8,
  },

  activeOption: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  saveText: {
    color: COLORS.white,
  },
});

export default EditUserScreen;
