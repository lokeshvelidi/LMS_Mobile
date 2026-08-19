import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const SettingsRow = ({
  title,
  subtitle,
  icon,
  rightText,
  showArrow = true,
  onPress,
  danger = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          danger && styles.dangerIcon,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={[
            styles.icon,
            danger && styles.dangerText,
          ]}
        >
          {icon}
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText
          size="sm"
          weight="semiBold"
          style={
            danger
              ? styles.dangerText
              : undefined
          }
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

      {rightText ? (
        <AppText
          size="sm"
          color="textSecondary"
          style={styles.rightText}
        >
          {rightText}
        </AppText>
      ) : null}

      {showArrow ? (
        <AppText
          size="lg"
          color="textSecondary"
          style={styles.arrow}
        >
          ›
        </AppText>
      ) : null}
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

  dangerIcon: {
    backgroundColor: "#F8E3E1",
  },

  icon: {
    color: COLORS.navy,
  },

  dangerText: {
    color: "#B6423E",
  },

  content: {
    flex: 1,
  },

  subtitle: {
    marginTop: 3,
  },

  rightText: {
    marginRight: 8,
  },

  arrow: {
    marginLeft: 2,
  },
});

export default SettingsRow;