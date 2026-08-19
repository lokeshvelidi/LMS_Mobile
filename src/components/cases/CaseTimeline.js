import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppText from "../common/AppText";
import theme from "../../theme/theme";

const CaseTimeline = ({
  events = [],
}) => {
  return (
    <View style={styles.container}>
      {events.map((event, index) => {
        const isLast =
          index === events.length - 1;

        return (
          <View
            key={event.id || index}
            style={styles.event}
          >
            <View style={styles.timeline}>
              <View style={styles.dot} />

              {!isLast && (
                <View style={styles.line} />
              )}
            </View>

            <View style={styles.content}>
              <AppText
                size="sm"
                weight="semiBold"
              >
                {event.title}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.date}
              >
                {event.date}
              </AppText>

              {event.description ? (
                <AppText
                  size="sm"
                  color="textSecondary"
                  style={styles.description}
                >
                  {event.description}
                </AppText>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.sm,
  },

  event: {
    flexDirection: "row",
    minHeight: 80,
  },

  timeline: {
    width: 28,
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginTop: 4,
  },

  line: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.border,
    marginTop: 4,
  },

  content: {
    flex: 1,
    paddingLeft: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },

  date: {
    marginTop: 2,
  },

  description: {
    marginTop: theme.spacing.xs,
  },
});

export default CaseTimeline;