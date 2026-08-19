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
  background: "#F7F4EC",
};

const AssignedCaseSelector = ({
  cases = [],
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
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
            Choose a case, review the summary,
            and keep notes current.
          </AppText>
        </View>

        <Pressable style={styles.openButton}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.openButtonText}
          >
            Open Full{"\n"}Case View
          </AppText>
        </Pressable>
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search case no / client / party..."
        placeholderTextColor="#91A0AE"
        style={styles.searchInput}
      />

      <View style={styles.caseList}>
        {filteredCases.map((item) => {
          const selected =
            selectedCase?.caseNumber ===
            item.caseNumber;

          return (
            <Pressable
              key={item.caseNumber}
              onPress={() => onSelectCase(item)}
              style={[
                styles.caseItem,
                selected &&
                  styles.selectedCaseItem,
              ]}
            >
              <View style={styles.caseTopRow}>
                <AppText
                  size="sm"
                  weight="bold"
                  style={styles.caseNumber}
                >
                  {item.caseNumber}
                </AppText>

                <View style={styles.stageBadge}>
                  <AppText
                    size="xs"
                    weight="semiBold"
                    style={styles.stageText}
                  >
                    {item.stage || "Stage not set"}
                  </AppText>
                </View>
              </View>

              <AppText
                size="sm"
                weight="semiBold"
                style={styles.client}
              >
                {item.client}
              </AppText>

              <View style={styles.caseBottomRow}>
                <AppText
                  size="xs"
                  color="textSecondary"
                >
                  {item.type}
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                >
                  {item.nextHearing || "-"}
                </AppText>
              </View>
            </Pressable>
          );
        })}

        {filteredCases.length === 0 && (
          <View style={styles.emptyState}>
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
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  headerContent: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    color: COLORS.navy,
  },

  description: {
    marginTop: 5,
    lineHeight: 19,
  },

  openButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  openButtonText: {
    color: COLORS.navy,
    textAlign: "center",
    lineHeight: 15,
  },

  searchInput: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    marginTop: 18,
    color: COLORS.navy,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
  },

  caseList: {
    marginTop: 14,
  },

  caseItem: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },

  selectedCaseItem: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.lightGold,
  },

  caseTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  caseNumber: {
    color: COLORS.navy,
    flex: 1,
  },

  stageBadge: {
    backgroundColor: "#F2E7C7",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },

  stageText: {
    color: "#6C5823",
  },

  client: {
    color: COLORS.navy,
    marginTop: 9,
  },

  caseBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 30,
  },
});

export default AssignedCaseSelector;