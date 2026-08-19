import React from "react";

import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  gold: "#E5B93F",
  background: "#F5F2EA",
  white: "#FFFFFF",
  border: "#DED9CE",
  secondary: "#61758A",
};

const AuditFilter = ({
  visible,
  onClose,
  action,
  module,
  role,
  onActionChange,
  onModuleChange,
  onRoleChange,
  onClear,
}) => {
  const actions = [
    "All",
    "Created",
    "Updated",
    "Deleted",
    "Login",
  ];

  const modules = [
    "All",
    "Users",
    "Cases",
    "Courts",
    "Hearings",
    "Payments",
    "Reports",
  ];

  const roles = [
    "All",
    "Admin",
    "Advocate",
    "Staff",
  ];

  const Option = ({
    value,
    selected,
    onPress,
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.option,
          selected &&
            styles.activeOption,
        ]}
      >
        <AppText
          size="sm"
          weight={
            selected
              ? "semiBold"
              : "medium"
          }
          style={{
            color: selected
              ? COLORS.navy
              : COLORS.secondary,
          }}
        >
          {value}
        </AppText>
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <AppText
              size="lg"
              weight="bold"
            >
              Filter Audit Logs
            </AppText>

            <Pressable onPress={onClose}>
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.close}
              >
                Close
              </AppText>
            </Pressable>
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Action
          </AppText>

          <View style={styles.options}>
            {actions.map((item) => (
              <Option
                key={item}
                value={item}
                selected={action === item}
                onPress={() =>
                  onActionChange(item)
                }
              />
            ))}
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Module
          </AppText>

          <View style={styles.options}>
            {modules.map((item) => (
              <Option
                key={item}
                value={item}
                selected={module === item}
                onPress={() =>
                  onModuleChange(item)
                }
              />
            ))}
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Role
          </AppText>

          <View style={styles.options}>
            {roles.map((item) => (
              <Option
                key={item}
                value={item}
                selected={role === item}
                onPress={() =>
                  onRoleChange(item)
                }
              />
            ))}
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={onClear}
              style={styles.clearButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
              >
                Clear
              </AppText>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={styles.applyButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.applyText}
              >
                Apply
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:
      "rgba(7, 29, 43, 0.45)",
  },

  sheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 22,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  close: {
    color: COLORS.secondary,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 9,
  },

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  option: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 7,
    marginBottom: 7,
  },

  activeOption: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  footer: {
    flexDirection: "row",
    marginTop: 2,
  },

  clearButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  applyText: {
    color: COLORS.white,
  },
});

export default AuditFilter;