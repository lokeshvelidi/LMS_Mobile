import React from "react";

import {
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

const CaseNotesInput = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Case Notes
      </AppText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        placeholder="Enter case notes..."
        placeholderTextColor="#8A99A8"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },

  title: {
    color: COLORS.navy,
    marginBottom: 14,
  },

  input: {
    minHeight: 280,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    color: COLORS.navy,
    fontSize: 15,
    lineHeight: 22,
    backgroundColor: "#FFFFFF",
  },
});

export default CaseNotesInput;