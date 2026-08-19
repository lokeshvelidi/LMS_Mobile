import React from "react";

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
};

const HearingOutcomeForm = ({
  outcome,
  setOutcome,
  nextDate,
  setNextDate,
  notes,
  setNotes,
  onSave,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Hearing Outcome
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Record the hearing outcome and
        continue the case workflow.
      </AppText>

      {/* Outcome */}

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Outcome
        </AppText>

        <View style={styles.outcomeRow}>
          {[
            "Completed",
            "Adjourned",
            "Cancelled",
          ].map((item) => {
            const active =
              outcome === item;

            return (
              <Pressable
                key={item}
                onPress={() =>
                  setOutcome(item)
                }
                style={[
                  styles.outcomeButton,
                  active &&
                    styles.activeOutcome,
                ]}
              >
                <AppText
                  size="xs"
                  weight={
                    active
                      ? "bold"
                      : "medium"
                  }
                  style={{
                    color: active
                      ? COLORS.navy
                      : COLORS.secondary,
                  }}
                >
                  {item}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Next hearing */}

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Next Hearing Date
        </AppText>

        <TextInput
          value={nextDate}
          onChangeText={setNextDate}
          placeholder="DD MMM YYYY"
          placeholderTextColor="#8A99A8"
          style={styles.input}
        />
      </View>

      {/* Notes */}

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Hearing Notes
        </AppText>

        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
          placeholder="Enter hearing notes..."
          placeholderTextColor="#8A99A8"
          style={styles.textarea}
        />
      </View>

      <Pressable
        onPress={onSave}
        style={({ pressed }) => [
          styles.saveButton,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.saveText}
        >
          Save Hearing Outcome
        </AppText>
      </Pressable>
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
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 9,
  },

  outcomeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  outcomeButton: {
    minHeight: 38,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  activeOutcome: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 13,
    color: COLORS.navy,
    fontSize: 14,
  },

  textarea: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 21,
  },

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
  },
});

export default HearingOutcomeForm;