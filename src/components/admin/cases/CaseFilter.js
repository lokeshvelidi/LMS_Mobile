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

const CaseFilter = ({
  visible,
  onClose,
  caseType,
  status,
  priority,
  sortOrder,
  onCaseTypeChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onClear,
  caseTypeOptions = [],
  statusOptions = [],
  priorityOptions = [],
}) => {
  const caseTypes = ["All", ...caseTypeOptions.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)];
  const statuses = ["All", ...statusOptions.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)];
  const priorities = ["All", ...priorityOptions.map((x) => typeof x === "string" ? x : x.value ?? x.name).filter(Boolean)];
  /* Local values are used only until the corresponding master response arrives. */
  const legacyCaseTypes = [
    "All",
    "Civil",
    "Criminal",
    "Family",
    "Property",
    "Consumer",
    "Corporate",
  ];

  const legacyStatuses = [
    "All",
    "Open",
    "Pending",
    "Closed",
  ];

  const legacyPriorities = [
    "All",
    "High",
    "Medium",
    "Low",
  ];

  const sortOptions = [
    "Newest first",
    "Oldest first",
  ];

  const Option = ({
    value,
    selected,
    onPress,
  }) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        selected && styles.activeOption,
      ]}
    >
      <AppText
        size="sm"
        weight={selected ? "semiBold" : "medium"}
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
              Filter Cases
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
            Case Type
          </AppText>

          <View style={styles.options}>
            {caseTypes.map((item) => (
              <Option
                key={item}
                value={item}
                selected={caseType === item}
                onPress={() =>
                  onCaseTypeChange(item)
                }
              />
            ))}
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Status
          </AppText>

          <View style={styles.options}>
            {statuses.map((item) => (
              <Option
                key={item}
                value={item}
                selected={status === item}
                onPress={() =>
                  onStatusChange(item)
                }
              />
            ))}
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Priority
          </AppText>

          <View style={styles.options}>
            {priorities.map((item) => (
              <Option
                key={item}
                value={item}
                selected={priority === item}
                onPress={() =>
                  onPriorityChange(item)
                }
              />
            ))}
          </View>

          <AppText
            size="sm"
            weight="semiBold"
            style={styles.label}
          >
            Sort
          </AppText>

          <View style={styles.options}>
            {sortOptions.map((item) => (
              <Option
                key={item}
                value={item}
                selected={sortOrder === item}
                onPress={() =>
                  onSortChange(item)
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
    marginBottom: 14,
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
    marginTop: 5,
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

export default CaseFilter;
