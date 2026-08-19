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

const CourtFilter = ({
  visible,
  onClose,
  type,
  status,
  onTypeChange,
  onStatusChange,
  onClear,
}) => {
  const types = [
    "All",
    "High Court",
    "District Court",
    "Family Court",
    "Consumer Court",
  ];

  const statuses = [
    "All",
    "Active",
    "Inactive",
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
              Filter Courts
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
            Court Type
          </AppText>

          <View style={styles.options}>
            {types.map((item) => {
              const active =
                type === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    onTypeChange(item)
                  }
                  style={[
                    styles.option,
                    active &&
                      styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={
                      active
                        ? "semiBold"
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

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Status
          </AppText>

          <View style={styles.options}>
            {statuses.map((item) => {
              const active =
                status === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    onStatusChange(item)
                  }
                  style={[
                    styles.option,
                    active &&
                      styles.activeOption,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={
                      active
                        ? "semiBold"
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

          <View style={styles.footer}>
            <Pressable
              onPress={onClear}
              style={styles.clear}
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
              style={styles.apply}
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
    marginBottom: 24,
  },

  close: {
    color: COLORS.secondary,
  },

  label: {
    color: COLORS.navy,
    marginBottom: 10,
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
    marginTop: 5,
  },

  clear: {
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

  apply: {
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

export default CourtFilter;