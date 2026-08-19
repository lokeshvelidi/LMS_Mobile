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
  gold: "#E4BD42",
};

const LawyerProfileHeader = ({
  profile,
}) => {
  const name =
    profile?.name || "Lawyer";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) =>
      item.charAt(0).toUpperCase()
    )
    .join("");

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <AppText
          size="xxl"
          weight="bold"
          style={styles.initials}
        >
          {initials || "L"}
        </AppText>
      </View>

      <View style={styles.info}>
        <AppText
          size="xl"
          weight="bold"
          style={styles.name}
        >
          {name}
        </AppText>

        <AppText
          size="sm"
          color="textSecondary"
          style={styles.role}
        >
          {profile?.role || "Lawyer"}
        </AppText>

        <View style={styles.status}>
          <View style={styles.dot} />

          <AppText
            size="xs"
            weight="semiBold"
            style={styles.statusText}
          >
            Active
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  initials: {
    color: COLORS.gold,
  },

  info: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    color: COLORS.navy,
  },

  role: {
    marginTop: 4,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2C7A45",
    marginRight: 6,
  },

  statusText: {
    color: "#2C7A45",
  },
});

export default LawyerProfileHeader;