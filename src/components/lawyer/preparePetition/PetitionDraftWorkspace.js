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

const PetitionDraftWorkspace = ({
  facts,
  setFacts,
  relief,
  setRelief,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Petition Draft Workspace
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Prepare the petition content using
        the information available for the
        selected case.
      </AppText>

      <View style={styles.field}>
        <AppText
          size="sm"
          weight="semiBold"
          style={styles.label}
        >
          Facts Summary
        </AppText>

        <TextInput
          value={facts}
          onChangeText={setFacts}
          multiline
          textAlignVertical="top"
          placeholder="Enter facts summary..."
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
          Relief Sought
        </AppText>

        <TextInput
          value={relief}
          onChangeText={setRelief}
          multiline
          textAlignVertical="top"
          placeholder="Enter relief sought..."
          placeholderTextColor="#8A99A8"
          style={styles.textarea}
        />
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
    minHeight: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 21,
    backgroundColor: "#FFFFFF",
  },
});

export default PetitionDraftWorkspace;