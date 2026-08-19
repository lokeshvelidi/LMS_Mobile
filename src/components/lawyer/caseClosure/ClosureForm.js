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
};

const ClosureForm = ({
  closureNotes,
  setClosureNotes,
  closureReference,
  setClosureReference,
  onSubmit,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Ready for Closure
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Add the final information before
        sending the case for closure.
      </AppText>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Final Closure Notes
        </AppText>

        <TextInput
          value={closureNotes}
          onChangeText={setClosureNotes}
          multiline
          textAlignVertical="top"
          placeholder="Enter final closure notes..."
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
          Closure Reference
        </AppText>

        <TextInput
          value={closureReference}
          onChangeText={setClosureReference}
          placeholder="Enter reference number / document..."
          placeholderTextColor="#8A99A8"
          style={styles.input}
        />
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoIcon}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.infoIconText}
          >
            i
          </AppText>
        </View>

        <AppText
          size="xs"
          style={styles.infoText}
        >
          Submitting this case as ready for
          closure will move it to the next
          workflow stage.
        </AppText>
      </View>

      <Pressable
        onPress={onSubmit}
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
          Mark Ready for Closure
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
    marginBottom: 8,
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

  infoBox: {
    marginTop: 18,
    padding: 13,
    borderRadius: 13,
    backgroundColor: "#F1F5F8",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  infoIconText: {
    color: "#FFFFFF",
  },

  infoText: {
    flex: 1,
    color: COLORS.secondary,
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

export default ClosureForm;