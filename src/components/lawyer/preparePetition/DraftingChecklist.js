import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
  green: "#278449",
};

const DraftingChecklist = ({
  items,
  onToggle,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Drafting Checklist
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Complete the required preparation
        before finalizing the petition.
      </AppText>

      <View style={styles.list}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              onToggle(item.id)
            }
            style={styles.item}
          >
            <View
              style={[
                styles.checkbox,
                item.completed &&
                  styles.checked,
              ]}
            >
              {item.completed && (
                <AppText
                  size="xs"
                  weight="bold"
                  style={styles.check}
                >
                  ✓
                </AppText>
              )}
            </View>

            <View
              style={styles.itemContent}
            >
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.itemTitle}
              >
                {item.title}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.itemDescription}
              >
                {item.description}
              </AppText>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  list: {
    marginTop: 16,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#B8BFC6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    marginTop: 1,
  },

  checked: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },

  check: {
    color: "#FFFFFF",
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    color: COLORS.navy,
  },

  itemDescription: {
    marginTop: 3,
    lineHeight: 17,
  },
});

export default DraftingChecklist;