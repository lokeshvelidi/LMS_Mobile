import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const STATUS_STYLES = {
  New: {
    background: "#E8DEFF",
    text: "#6541B8",
  },

  "In Progress": {
    background: "#D9E9FF",
    text: "#2563B8",
  },

  Pending: {
    background: "#F8E8B9",
    text: "#8A6818",
  },

  Closed: {
    background: "#E2E6EA",
    text: "#526273",
  },

  "Ready for Closure": {
    background: "#DCEFD9",
    text: "#27733A",
  },
};

const CaseStatusBadge = ({
  status,
}) => {
  const colors =
    STATUS_STYLES[status] ||
    STATUS_STYLES.New;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <AppText
        size="xs"
        weight="semiBold"
        style={{
          color: colors.text,
        }}
      >
        {status}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },
});

export default CaseStatusBadge;