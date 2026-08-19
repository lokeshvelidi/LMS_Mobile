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
  border: "#DED9CE",
  gold: "#DDB52F",
};

const CaseTimeline = ({
  caseData,
}) => {
  const hearingEvents = (caseData?.hearings ?? []).map((hearing) => ({
    title: hearing.purpose || "Hearing",
    description: hearing.result || hearing.notes || "-",
    date: hearing.hearingDate
      ? new Date(hearing.hearingDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-",
  }));

  const timeline = hearingEvents.length ? hearingEvents : [{
    title: caseData?.stage || "Current Case Stage",
    description: caseData?.remarks || "No hearing history is available.",
    date: caseData?.nextHearing || "-",
  }];

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Case Timeline
      </AppText>

      {timeline.map(
        (item, index) => (
          <View
            key={`${item.title}-${index}`}
            style={styles.timelineItem}
          >
            <View style={styles.markerColumn}>
              <View style={styles.marker} />

              {index !==
                timeline.length - 1 && (
                <View
                  style={styles.line}
                />
              )}
            </View>

            <View
              style={
                styles.timelineContent
              }
            >
              <AppText
                size="sm"
                weight="bold"
                style={styles.itemTitle}
              >
                {item.title}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.description}
              >
                {item.description}
              </AppText>

              <AppText
                size="xs"
                style={styles.date}
              >
                {item.date}
              </AppText>
            </View>
          </View>
        )
      )}
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
    marginBottom: 20,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 78,
  },

  markerColumn: {
    width: 22,
    alignItems: "center",
  },

  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.gold,
    borderWidth: 2,
    borderColor: "#FFF7DF",
  },

  line: {
    flex: 1,
    width: 1,
    backgroundColor: "#DDD7CA",
    marginTop: 3,
    marginBottom: -3,
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
  },

  itemTitle: {
    color: COLORS.navy,
  },

  description: {
    marginTop: 4,
    lineHeight: 17,
  },

  date: {
    color: COLORS.secondary,
    marginTop: 6,
  },
});

export default CaseTimeline;
