
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Pressable,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
  gold: "#E5B93F",
};

const AdminStatCard = ({
  title,
  value,
  icon,
  description,
  accent = COLORS.gold,
  onPress,
}) => {
  const content = (
    <>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              `${accent}20`,
          },
        ]}
      >
        <Ionicons name={icon} size={22} color={accent} />
      </View>

      <AppText
        size="sm"
        color="textSecondary"
        style={styles.title}
        numberOfLines={2}
      >
        {title}
      </AppText>

      <AppText
        size="xl"
        weight="bold"
        style={styles.value}
      >
        {value}
      </AppText>

      {description ? (
        <AppText
          size="xs"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      ) : null}
    </>
  );
  return onPress ? <Pressable onPress={onPress} style={styles.card}>{content}</Pressable> : <View style={styles.card}>{content}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 145,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  title: {
    minHeight: 20,
  },

  value: {
    marginTop: 5,
  },

  description: {
    marginTop: 4,
  },
});

export default AdminStatCard;
