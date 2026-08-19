import React from "react";

import {
  Modal,
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
  background: "#F5F2EA",
  gold: "#F7EAC5",
};

const AssignedCaseFilter = ({
  search,
  setSearch,
  caseType,
  setCaseType,
  status,
  setStatus,
  priority,
  setPriority,
  rowsPerPage,
  setRowsPerPage,
  caseTypeOptions = [],
  statusOptions = [],
  priorityOptions = [],
  rowOptions = [],
  onSearch,
}) => {
  const filterOptions = [
    {
      label: "Case Type",
      value: caseType,
      onChange: setCaseType,
      options: ["All Types", ...caseTypeOptions],
    },
    {
      label: "Status",
      value: status,
      onChange: setStatus,
      options: ["All Statuses", ...statusOptions],
    },
    {
      label: "Priority",
      value: priority,
      onChange: setPriority,
      options: ["All Priorities", ...priorityOptions],
    },
    {
      label: "Rows",
      value: rowsPerPage,
      onChange: setRowsPerPage,
      options: rowOptions,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search case no / party / client"
          placeholderTextColor="#8A9AAC"
          style={styles.input}
        />
      </View>

      <View style={styles.filterRow}>
        {filterOptions.map((item) => (
          <FilterSelect
            key={item.label}
            label={item.label}
            value={item.value}
            options={item.options}
            onChange={item.onChange}
          />
        ))}
      </View>

      <Pressable
        onPress={onSearch}
        style={styles.searchButton}
      >
        <AppText
          size="sm"
          weight="bold"
          style={styles.searchText}
        >
          Search
        </AppText>
      </Pressable>
    </View>
  );
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.selectButton}
      >
        <AppText size="xs" color="textSecondary">
          {label}
        </AppText>
        <View style={styles.selectValueRow}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.selectValue}
          >
            {String(value)}
          </AppText>
          <AppText size="sm" style={styles.chevron}>⌄</AppText>
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
        >
          <View style={styles.menu}>
            <AppText
              size="sm"
              weight="bold"
              style={styles.menuTitle}
            >
              {label}
            </AppText>
            {options.map((option) => (
              <Pressable
                key={String(option)}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
                style={[
                  styles.option,
                  String(value) === String(option) && styles.activeOption,
                ]}
              >
                <AppText size="sm" style={styles.optionText}>
                  {String(option)}
                </AppText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  input: {
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: COLORS.navy,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  selectButton: {
    minHeight: 52,
    minWidth: "47%",
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFFFF",
  },

  selectValueRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  selectValue: {
    color: COLORS.navy,
    flex: 1,
  },

  chevron: {
    color: COLORS.secondary,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(16, 42, 67, 0.28)",
    justifyContent: "center",
    padding: 24,
  },

  menu: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
  },

  menuTitle: {
    color: COLORS.navy,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  option: {
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  activeOption: {
    backgroundColor: COLORS.gold,
  },

  optionText: {
    color: COLORS.navy,
  },

  searchButton: {
    height: 46,
    marginTop: 15,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  searchText: {
    color: "#FFFFFF",
  },
});

export default AssignedCaseFilter;
