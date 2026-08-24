import React from "react";
import {
  StyleSheet,
  Text,
} from "react-native";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFFFF",
};

const AppText = ({
  children,
  size = "md",
  weight = "regular",
  color,
  style,
  numberOfLines,
  ...props
}) => {
  const colorValue =
    color === "textSecondary"
      ? COLORS.secondary
      : color === "white" || color === "textWhite"
        ? COLORS.white
      : COLORS.navy;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        styles[size],
        styles[weight],
        { color: colorValue },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "System",
  },

  xs: {
    fontSize: 11,
    lineHeight: 16,
  },

  sm: {
    fontSize: 13,
    lineHeight: 19,
  },

  md: {
    fontSize: 15,
    lineHeight: 21,
  },

  lg: {
    fontSize: 18,
    lineHeight: 24,
  },

  xl: {
    fontSize: 22,
    lineHeight: 28,
  },

  xxl: {
    fontSize: 30,
    lineHeight: 36,
  },

  regular: {
    fontWeight: "400",
  },

  medium: {
    fontWeight: "500",
  },

  semiBold: {
    fontWeight: "600",
  },

  bold: {
    fontWeight: "700",
  },
});

export default AppText;
