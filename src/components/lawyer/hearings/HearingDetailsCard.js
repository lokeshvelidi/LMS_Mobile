import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

import HearingStatusBadge from "./HearingStatusBadge";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const HearingDetailsCard = ({
  hearing,
}) => {
  if (!hearing) {
    return null;
  }

  const details = [
    {
      label: "CASE NUMBER",
      value: hearing.caseNumber || "-",
    },
    {
      label: "CLIENT",
      value: hearing.client || "-",
    },
    {
      label: "HEARING DATE",
      value: hearing.date || "-",
    },
    {
      label: "TIME",
      value: hearing.time || "-",
    },
    {
      label: "COURT",
      value: hearing.court || "-",
    },
    {
      label: "PURPOSE",
      value: hearing.purpose || "-",
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <AppText
            size="lg"
            weight="bold"
            style={styles.caseNumber}
          >
            {hearing.caseNumber}
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.client}
          >
            {hearing.client}
          </AppText>
        </View>

        <HearingStatusBadge
          status={
            hearing.status ||
            "Unavailable"
          }
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.grid}>
        {details.map((item) => (
          <View
            key={item.label}
            style={styles.info}
          >
            <AppText
              size="xs"
              weight="semiBold"
              style={styles.label}
            >
              {item.label}
            </AppText>

            <AppText
              size="sm"
              weight="semiBold"
              style={styles.value}
            >
              {item.value}
            </AppText>
          </View>
        ))}
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

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  headerContent: {
    flex: 1,
    paddingRight: 10,
  },

  caseNumber: {
    color: COLORS.navy,
  },

  client: {
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE9DE",
    marginVertical: 17,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    width: "50%",
    marginBottom: 17,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  value: {
    color: COLORS.navy,
    marginTop: 5,
    paddingRight: 10,
  },
});

export default HearingDetailsCard;
