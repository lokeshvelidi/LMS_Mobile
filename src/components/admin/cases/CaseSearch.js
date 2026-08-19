import React from "react";

import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  border: "#DED9CE",
  white: "#FFFFFF",
};

const CaseSearch = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <View style={styles.circle} />
        <View style={styles.handle} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search case number, client..."
        placeholderTextColor={COLORS.secondary}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  searchIcon: {
    width: 21,
    height: 21,
    position: "relative",
    marginRight: 10,
  },

  circle: {
    position: "absolute",
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: 8,
    left: 1,
    top: 1,
  },

  handle: {
    position: "absolute",
    width: 7,
    height: 2,
    backgroundColor: COLORS.navy,
    left: 14,
    top: 15,
    transform: [{ rotate: "45deg" }],
  },

  input: {
    flex: 1,
    height: "100%",
    color: COLORS.navy,
    fontSize: 14,
  },
});

export default CaseSearch;