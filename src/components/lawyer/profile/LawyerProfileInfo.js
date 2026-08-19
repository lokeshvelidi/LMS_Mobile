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

const LawyerProfileInfo = ({
  profile,
}) => {
  const fields = [
    {
      label: "FULL NAME",
      value: profile?.name || "-",
    },
    {
      label: "EMAIL",
      value: profile?.email || "-",
    },
    {
      label: "PHONE",
      value: profile?.phone || "-",
    },
    {
      label: "BAR / LICENSE NUMBER",
      value:
        profile?.licenseNumber || "-",
    },
    {
      label: "SPECIALIZATION",
      value:
        profile?.specialization || "-",
    },
    {
      label: "EXPERIENCE",
      value:
        profile?.experience || "-",
    },
  ];

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Professional Information
      </AppText>

      <View style={styles.divider} />

      {fields.map((field) => (
        <View
          key={field.label}
          style={styles.row}
        >
          <AppText
            size="xs"
            weight="semiBold"
            style={styles.label}
          >
            {field.label}
          </AppText>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.value}
          >
            {field.value}
          </AppText>
        </View>
      ))}
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

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 16,
  },

  row: {
    marginBottom: 16,
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
});

export default LawyerProfileInfo;