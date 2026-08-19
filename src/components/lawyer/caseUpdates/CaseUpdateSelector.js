import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
  gold: "#E4BD42",
  lightGold: "#FFF8E6",
};

const CaseUpdateSelector = ({
  cases,
  selectedCase,
  onSelectCase,
}) => {
  const [search, setSearch] = useState("");

  const filteredCases = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return cases;
    }

    return cases.filter((item) => {
      const text = [
        item.caseNumber,
        item.client,
        item.type,
        item.stage,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(value);
    });
  }, [cases, search]);

  return (
    <View style={styles.card}>
      <AppText
        size="lg"
        weight="bold"
        style={styles.title}
      >
        Assigned Cases
      </AppText>

      <AppText
        size="sm"
        color="textSecondary"
        style={styles.description}
      >
        Select the case you want to update.
      </AppText>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search case no / client..."
        placeholderTextColor="#8A99A8"
        style={styles.search}
      />

      <View style={styles.list}>
        {filteredCases.map((item) => {
          const selected =
            selectedCase?.caseNumber ===
            item.caseNumber;

          return (
            <Pressable
              key={item.caseNumber}
              onPress={() => onSelectCase(item)}
              style={[
                styles.case,
                selected && styles.selectedCase,
              ]}
            >
              <View style={styles.content}>
                <AppText
                  size="sm"
                  weight="bold"
                  style={styles.caseNumber}
                >
                  {item.caseNumber}
                </AppText>

                <AppText
                  size="sm"
                  weight="semiBold"
                  style={styles.client}
                >
                  {item.client}
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                  style={styles.meta}
                >
                  {item.type}
                  {" • "}
                  {item.stage}
                </AppText>
              </View>

              {selected && (
                <View style={styles.badge}>
                  <AppText
                    size="xs"
                    weight="bold"
                    style={styles.badgeText}
                  >
                    Selected
                  </AppText>
                </View>
              )}
            </Pressable>
          );
        })}

        {filteredCases.length === 0 && (
          <View style={styles.empty}>
            <AppText
              size="sm"
              color="textSecondary"
            >
              No assigned cases found.
            </AppText>
          </View>
        )}
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
    padding: 16,
    marginBottom: 14,
  },

  title: {
    color: COLORS.navy,
  },

  description: {
    marginTop: 5,
    lineHeight: 19,
  },

  search: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    marginTop: 16,
    paddingHorizontal: 14,
    color: COLORS.navy,
    fontSize: 14,
  },

  list: {
    marginTop: 12,
  },

  case: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedCase: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.lightGold,
  },

  content: {
    flex: 1,
  },

  caseNumber: {
    color: COLORS.navy,
  },

  client: {
    color: COLORS.navy,
    marginTop: 4,
  },

  meta: {
    marginTop: 3,
  },

  badge: {
    backgroundColor: COLORS.gold,
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginLeft: 8,
  },

  badgeText: {
    color: COLORS.navy,
  },

  empty: {
    alignItems: "center",
    paddingVertical: 25,
  },
});

export default CaseUpdateSelector;