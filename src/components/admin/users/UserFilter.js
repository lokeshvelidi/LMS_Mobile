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

const UserFilter = ({
  visible,
  onClose,
  role,
  status,
  sortOrder,
  onRoleChange,
  onStatusChange,
  onSortChange,
  onClear,
}) => {
  const roles = [
    "All",
    "Client",
    "Advocate",
    "Clerk",
    "Administrator",
  ];

  const statuses = [
    "All",
    "Active",
    "Inactive",
  ];

  const sortOptions = [
    "Newest first",
    "Oldest first",
  ];

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
              Filter Users
            </AppText>

            <Pressable onPress={onClose}>
              <AppText
                size="md"
                weight="semiBold"
                style={styles.closeText}
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
            Role
          </AppText>

          <View style={styles.options}>
            {roles.map((item) => {
              const active = role === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => onRoleChange(item)}
                  style={[
                    styles.option,
                    active && styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={active ? "semiBold" : "medium"}
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

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Status
          </AppText>

          <View style={styles.options}>
            {statuses.map((item) => {
              const active = status === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => onStatusChange(item)}
                  style={[
                    styles.option,
                    active && styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={active ? "semiBold" : "medium"}
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

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Sort
          </AppText>

          <View style={styles.options}>
            {sortOptions.map((item) => {
              const active = sortOrder === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => onSortChange(item)}
                  style={[
                    styles.option,
                    active && styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={active ? "semiBold" : "medium"}
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
    backgroundColor: "rgba(7, 29, 43, 0.45)",
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
    marginBottom: 24,
  },

  closeText: {
    color: COLORS.secondary,
  },

  label: {
    marginBottom: 10,
    color: COLORS.navy,
  },

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
    marginBottom: 8,
  },

  activeOption: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  footer: {
    flexDirection: "row",
    marginTop: 8,
  },

  clearButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  applyText: {
    color: COLORS.white,
  },
});

export default UserFilter;