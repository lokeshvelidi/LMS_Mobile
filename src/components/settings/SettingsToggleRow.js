import React from "react";

import {
  Pressable,
  StyleSheet,
  Switch,
  View,
} from "react-native";

import AppText from "../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E5B93F",
};

const SettingsToggleRow = ({
  title,
  subtitle,
  icon,
  value,
  onValueChange,
}) => {
  return (
    <Pressable
      onPress={() =>
        onValueChange(!value)
      }
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <AppText
          size="sm"
          weight="bold"
          style={styles.icon}
        >
          {icon}
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText
          size="sm"
          weight="semiBold"
        >
          {title}
        </AppText>

        {subtitle ? (
          <AppText
            size="xs"
            color="textSecondary"
            style={styles.subtitle}
          >
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D8D5CD",
          true: COLORS.gold,
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D8D5CD"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
  },

  pressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  icon: {
    color: COLORS.navy,
  },

  content: {
    flex: 1,
    marginRight: 8,
  },

  subtitle: {
    marginTop: 3,
  },
});

export default SettingsToggleRow;