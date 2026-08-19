import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const PRIORITY_STYLES = {
  Low: {
    background: "#DCEFD9",
    text: "#27733A",
  },

  Medium: {
    background: "#F7EAC5",
    text: "#8A6818",
  },

  High: {
    background: "#FBE0DD",
    text: "#C13B34",
  },

  Urgent: {
    background: "#F7D5D2",
    text: "#B82D26",
  },
};

const CasePriorityBadge = ({
  priority,
}) => {
  const colors =
    PRIORITY_STYLES[priority] ||
    PRIORITY_STYLES.Medium;

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
        {priority}
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

export default CasePriorityBadge;