import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  navy: "#102A43",
  textSecondary: "#61758A",
  border: "#DED9CE",
  white: "#FFFFFF",
};

const UserSearch = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <View style={styles.searchCircle} />
        <View style={styles.searchHandle} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search name / username / email"
        placeholderTextColor={COLORS.textSecondary}
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
    width: 22,
    height: 22,
    marginRight: 10,
    position: "relative",
  },

  searchCircle: {
    position: "absolute",
    left: 1,
    top: 1,
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: 8,
  },

  searchHandle: {
    position: "absolute",
    left: 14,
    top: 15,
    width: 7,
    height: 2,
    backgroundColor: COLORS.navy,
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },

  input: {
    flex: 1,
    height: "100%",
    color: COLORS.navy,
    fontSize: 14,
  },
});

export default UserSearch;