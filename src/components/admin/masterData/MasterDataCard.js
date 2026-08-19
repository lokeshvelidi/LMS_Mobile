import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const MasterDataCard = ({
  title,
  description,
  icon,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <AppText
          size="lg"
          weight="bold"
          style={styles.icon}
        >
          {icon}
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText
          size="md"
          weight="bold"
        >
          {title}
        </AppText>

        <AppText
          size="sm"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      </View>

      <AppText
        size="xl"
        style={styles.arrow}
      >
        ›
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.75,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  icon: {
    color: COLORS.navy,
  },

  content: {
    flex: 1,
  },

  description: {
    marginTop: 4,
    lineHeight: 18,
  },

  arrow: {
    color: COLORS.secondary,
    marginLeft: 8,
  },
});

export default MasterDataCard;