import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../common/AppText";

const STATUS = {
  Scheduled: {
    background: "#E4EEF9",
    text: "#2563A8",
  },
  Completed: {
    background: "#DDEFD9",
    text: "#27733A",
  },
  Adjourned: {
    background: "#F7EAC5",
    text: "#8A6818",
  },
  Cancelled: {
    background: "#F8DEDB",
    text: "#B53A32",
  },
};

const HearingStatusBadge = ({ status }) => {
  const colors =
    STATUS[status] || STATUS.Scheduled;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.background },
      ]}
    >
      <AppText
        size="xs"
        weight="semiBold"
        style={{ color: colors.text }}
      >
        {status}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
});

export default HearingStatusBadge;