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
};

const CaseProgressCard = ({
  caseData,
}) => {
  const progress = [
    {
      title: "Case Assigned",
      completed: true,
    },
    {
      title: "Case Review",
      completed: true,
    },
    {
      title: caseData?.stage || "Current Stage",
      completed: true,
    },
    {
      title: "Next Case Update",
      completed: false,
    },
  ];

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Case Progress
      </AppText>

      <View style={styles.caseHeader}>
        <View>
          <AppText
            size="sm"
            weight="bold"
            style={styles.caseNumber}
          >
            {caseData?.caseNumber}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.client}
          >
            {caseData?.client}
          </AppText>
        </View>

        <AppText
          size="sm"
          weight="bold"
          style={styles.status}
        >
          {caseData?.status || "In Progress"}
        </AppText>
      </View>

      <View style={styles.timeline}>
        {progress.map((item, index) => (
          <View
            key={item.title}
            style={styles.timelineItem}
          >
            <View style={styles.markerColumn}>
              <View
                style={[
                  styles.marker,
                  item.completed &&
                    styles.completedMarker,
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

              {index !==
                progress.length - 1 && (
                <View
                  style={[
                    styles.line,
                    item.completed &&
                      styles.completedLine,
                  ]}
                />
              )}
            </View>

            <View style={styles.itemContent}>
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
                style={styles.itemStatus}
              >
                {item.completed
                  ? "Completed"
                  : "Pending update"}
              </AppText>
            </View>
          </View>
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
    marginBottom: 17,
  },

  caseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE9DE",
  },

  caseNumber: {
    color: COLORS.navy,
  },

  client: {
    marginTop: 4,
  },

  status: {
    color: COLORS.navy,
  },

  timeline: {
    marginTop: 17,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 62,
  },

  markerColumn: {
    width: 24,
    alignItems: "center",
  },

  marker: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#C4CBD1",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  completedMarker: {
    backgroundColor: "#2C7A45",
    borderColor: "#2C7A45",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 9,
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#DDD8CD",
    marginTop: 3,
    marginBottom: -3,
  },

  completedLine: {
    backgroundColor: "#A7C8B0",
  },

  itemContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 15,
  },

  itemTitle: {
    color: COLORS.navy,
  },

  itemStatus: {
    marginTop: 3,
  },
});

export default CaseProgressCard;