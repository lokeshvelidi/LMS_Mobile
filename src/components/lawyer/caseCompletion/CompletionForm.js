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

const CompletionForm = ({
  completionType,
  setCompletionType,
  completionNotes,
  setCompletionNotes,
  finalDocument,
  setFinalDocument,
  onComplete,
}) => {
  const types = [
    "Case Resolved",
    "Case Work Completed",
    "Court Proceedings Completed",
    "Other",
  ];

  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Complete Case
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Provide the completion details for
        this case.
      </AppText>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Completion Type
        </AppText>

        <View style={styles.options}>
          {types.map((item) => {
            const active =
              completionType === item;

            return (
              <Pressable
                key={item}
                onPress={() =>
                  setCompletionType(item)
                }
                style={[
                  styles.option,
                  active &&
                    styles.activeOption,
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

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Completion Notes
        </AppText>

        <TextInput
          value={completionNotes}
          onChangeText={setCompletionNotes}
          multiline
          textAlignVertical="top"
          placeholder="Enter the final case completion notes..."
          placeholderTextColor="#8A99A8"
          style={styles.textarea}
        />
      </View>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Final Document / Reference
        </AppText>

        <TextInput
          value={finalDocument}
          onChangeText={setFinalDocument}
          placeholder="Enter document name or reference..."
          placeholderTextColor="#8A99A8"
          style={styles.input}
        />
      </View>

      <View style={styles.warning}>
        <AppText
          size="xs"
          weight="semiBold"
          style={styles.warningText}
        >
          Marking a case completed will
          change its workflow status.
        </AppText>
      </View>

      <Pressable
        onPress={onComplete}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.buttonText}
        >
          Mark Case as Completed
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
    marginBottom: 14,
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

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  option: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  activeOption: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  textarea: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 21,
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

  warning: {
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FFF8E6",
    borderWidth: 1,
    borderColor: "#E9D28A",
  },

  warningText: {
    color: "#725A15",
    lineHeight: 17,
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
  },
});

export default CompletionForm;