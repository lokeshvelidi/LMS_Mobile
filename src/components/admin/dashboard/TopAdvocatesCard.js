import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#E6E0D4",
  gold: "#E5B93F",
  track: "#EDE9E0",
};

/* Legacy chart records disabled; dashboard data must come from API. */
const ADVOCATES = [];
/*
const LEGACY_ADVOCATES = [
  {
    id: "1",
    name: "Arun Kumar",
    cases: 12,
  },
  {
    id: "2",
    name: "Mahesh",
    cases: 9,
  },
  {
    id: "3",
    name: "Priya",
    cases: 7,
  },
  {
    id: "4",
    name: "Sathish",
    cases: 5,
  },
]; */

const TopAdvocatesCard = ({ data = [] }) => {
  const rows = data.length ? data : ADVOCATES;
  const maximum = Math.max(
    ...rows.map(
      (item) => item.cases
    )
  );

  return (
    <View style={styles.card}>
      <AppText
        size="lg"
        weight="bold"
      >
        Top Advocates
      </AppText>

      <AppText
        size="sm"
        color="textSecondary"
        style={styles.subtitle}
      >
        Advocates with the highest active case count
      </AppText>

      <View style={styles.list}>
        {rows.map(
          (advocate, index) => {
            const width =
              maximum === 0
                ? 0
                : (advocate.cases /
                    maximum) *
                  100;

            return (
              <View
                key={String(
                  advocate.raw?.advocateId ??
                  advocate.advocateId ??
                  advocate.id ??
                  advocate.label
                )}
                style={styles.item}
              >
                <View
                  style={styles.nameRow}
                >
                  <View
                    style={
                      styles.rankCircle
                    }
                  >
                    <AppText
                      size="xs"
                      weight="bold"
                      style={
                        styles.rankText
                      }
                    >
                      {index + 1}
                    </AppText>
                  </View>

                  <AppText
                    size="sm"
                    weight="semiBold"
                    style={styles.name}
                  >
                    {advocate.name}
                  </AppText>

                  <AppText
                    size="sm"
                    weight="bold"
                  >
                    {advocate.cases}
                  </AppText>
                </View>

                <View
                  style={styles.track}
                >
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${width}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          }
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
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  subtitle: {
    marginTop: 4,
  },

  list: {
    marginTop: 20,
  },

  item: {
    marginBottom: 17,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rankCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  rankText: {
    color: COLORS.navy,
  },

  name: {
    flex: 1,
  },

  track: {
    height: 7,
    backgroundColor: COLORS.track,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 36,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: 5,
  },
});

export default TopAdvocatesCard;
