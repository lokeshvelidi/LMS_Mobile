import React from "react";

import {
  Pressable,
  StyleSheet,
} from "react-native";

import AppText from "../../common/AppText";

const CaseActionButton = ({
  title,
  onPress,
  secondary = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        secondary
          ? styles.secondaryButton
          : styles.primaryButton,

        pressed &&
          styles.pressed,
      ]}
    >
      <AppText
        size="sm"
        weight="bold"
        style={
          secondary
            ? styles.secondaryText
            : styles.primaryText
        }
      >
        {title}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  primaryButton: {
    backgroundColor: "#102A43",
  },

  secondaryButton: {
    backgroundColor: "#FFFDF8",
    borderWidth: 1,
    borderColor: "#DED9CE",
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: "#102A43",
  },

  pressed: {
    opacity: 0.7,
  },
});

export default CaseActionButton;