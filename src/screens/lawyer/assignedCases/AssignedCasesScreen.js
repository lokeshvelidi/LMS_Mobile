import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import AssignedCaseFilter from "../../../components/lawyer/assignedCases/AssignedCaseFilter";

import AssignedCaseCard from "../../../components/lawyer/assignedCases/AssignedCaseCard";
import { getApiErrorMessage } from "../../../services/api/authService";
import {
  getLawyerCaseFilterOptions,
  getLawyerCases,
  updateLawyerCase,
} from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const ROW_OPTIONS = [5, 10, 20, 50];

const editableCaseFields = [
  "caseId",
  "caseNumber",
  "caseTitle",
  "caseType",
  "clientId",
  "courtId",
  "policeStation",
  "firNumber",
  "crimeNumber",
  "petitioner",
  "respondent",
  "advocateId",
  "filingDate",
  "nextHearingDate",
  "caseStage",
  "caseStatus",
  "priority",
  "remarks",
];

const normalize = (value) => String(value ?? "").trim().toLowerCase();

const uniqueValues = (items) => Array.from(new Set(
  items.filter((item) => typeof item === "string" && item.trim())
));

const dateInputValue = (value) => {
  const date = value ? new Date(value) : null;
  return !date || Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const datePayloadValue = (value) => {
  if (!value.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const buildCasePayload = (caseItem, form) => {
  const source = caseItem.raw ?? {};
  const payload = editableCaseFields.reduce((next, field) => {
    next[field] = source[field] ?? null;
    return next;
  }, {});
  const nextHearingDate = datePayloadValue(form.nextHearingDate);

  if (nextHearingDate === undefined) return null;

  return {
    ...payload,
    caseId: caseItem.id,
    caseNumber: form.caseNumber.trim(),
    caseTitle: form.caseTitle.trim() || null,
    caseType: form.caseType.trim() || null,
    caseStage: form.caseStage.trim() || null,
    caseStatus: form.caseStatus.trim() || null,
    priority: form.priority.trim() || null,
    nextHearingDate,
    remarks: form.remarks.trim() || null,
  };
};

const AssignedCasesScreen = ({
  navigation,
}) => {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    caseType,
    setCaseType,
  ] = useState("All Types");

  const [
    status,
    setStatus,
  ] = useState("All Statuses");

  const [
    priority,
    setPriority,
  ] = useState("All Priorities");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [cases, setCases] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    caseTypes: [],
    statuses: [],
    priorities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [editingCase, setEditingCase] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getLawyerCases()
      .then((items) => active && setCases(items))
      .catch((requestError) => {
        if (!active) return;
        setCases([]);
        setError(getApiErrorMessage(requestError, "Unable to load assigned cases."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  useEffect(() => {
    let active = true;
    getLawyerCaseFilterOptions()
      .then((options) => active && setFilterOptions(options))
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, caseType, status, priority, rowsPerPage]);

  const optionValues = useMemo(() => ({
    caseTypes: filterOptions.caseTypes.length
      ? filterOptions.caseTypes
      : uniqueValues(cases.map((item) => item.type).filter((item) => item !== "Unavailable")),
    statuses: filterOptions.statuses.length
      ? filterOptions.statuses
      : uniqueValues(cases.map((item) => item.status).filter((item) => item !== "Unavailable")),
    priorities: filterOptions.priorities.length
      ? filterOptions.priorities
      : uniqueValues(cases.map((item) => item.priority).filter((item) => item !== "Unavailable")),
  }), [cases, filterOptions]);

  const filteredCases =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return cases.filter(
        (item) => {
          const matchesSearch =
            !searchValue ||
            normalize(item.caseNumber)
              .includes(searchValue) ||
            normalize(item.client)
              .includes(searchValue) ||
            normalize(item.type)
              .includes(searchValue) ||
            normalize(item.title)
              .includes(searchValue);

          const matchesType =
            caseType === "All Types" ||
            item.type === caseType;

          const matchesStatus =
            status === "All Statuses" ||
            item.status === status;

          const matchesPriority =
            priority ===
              "All Priorities" ||
            item.priority === priority;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesPriority
          );
        }
      );
    }, [
      cases,
      search,
      caseType,
      status,
      priority,
    ]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const pagedCases = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return filteredCases.slice(start, start + rowsPerPage);
  }, [filteredCases, rowsPerPage, safePage]);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  const handleCasePress = (
    item
  ) => {
    navigation
      ?.getParent()
      ?.navigate(
        "LawyerCaseDetails",
        {
          caseData: item,
        }
      );
  };

  const handleEditPress = (item) => {
    setEditingCase(item);
    setEditForm({
      caseNumber: item.caseNumber === "Unavailable" ? "" : item.caseNumber,
      caseTitle: item.title === "Unavailable" ? "" : item.title,
      caseType: item.type === "Unavailable" ? "" : item.type,
      caseStage: item.stage === "Unavailable" ? "" : item.stage,
      caseStatus: item.status === "Unavailable" ? "" : item.status,
      priority: item.priority === "Unavailable" ? "" : item.priority,
      nextHearingDate: dateInputValue(item.raw?.nextHearingDate),
      remarks: item.remarks === "Unavailable" ? "" : item.remarks,
    });
  };

  const updateEditField = (field, value) => {
    setEditForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editingCase || !editForm) return;
    if (!editForm.caseNumber.trim()) {
      Alert.alert("Validation", "Case number is required.");
      return;
    }

    const payload = buildCasePayload(editingCase, editForm);
    if (!payload) {
      Alert.alert("Validation", "Enter next hearing date as YYYY-MM-DD.");
      return;
    }

    try {
      setSaving(true);
      const updated = await updateLawyerCase(editingCase.id, payload);
      if (updated?.id != null) {
        setCases((current) => current.map((item) => item.id === updated.id ? updated : item));
      } else {
        setReloadKey((value) => value + 1);
      }
      setEditingCase(null);
      setEditForm(null);
      Alert.alert("Case Updated", "The case was updated successfully.");
    } catch (requestError) {
      Alert.alert("Update failed", getApiErrorMessage(requestError, "Unable to update the case."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* Header */}

        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Assigned Cases
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.description}
          >
            Open assigned cases, review
            client details and documents,
            update hearings, upload court
            orders, request payments, and
            continue case progress until
            closure.
          </AppText>
        </View>

        {/* Filters */}

        <AssignedCaseFilter
          search={search}
          setSearch={setSearch}
          caseType={caseType}
          setCaseType={setCaseType}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          rowOptions={ROW_OPTIONS}
          caseTypeOptions={optionValues.caseTypes}
          statusOptions={optionValues.statuses}
          priorityOptions={optionValues.priorities}
          onSearch={() => {}}
        />

        {/* Results */}

        <View style={styles.resultsHeader}>
          <AppText
            size="sm"
            weight="semiBold"
            style={styles.resultCount}
          >
            {filteredCases.length}{" "}
            {filteredCases.length === 1
              ? "case"
              : "cases"}
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
          >
            Page {safePage} / {totalPages}
          </AppText>
        </View>

        {loading ? (
          <View style={styles.emptyCard}>
            <ActivityIndicator size="large" color={COLORS.navy} />
            <AppText size="sm" color="textSecondary" style={styles.emptyText}>Loading assigned cases...</AppText>
          </View>
        ) : error ? (
          <View style={styles.emptyCard}>
            <AppText size="sm" color="textSecondary" style={styles.emptyText}>{error}</AppText>
            <Pressable onPress={() => setReloadKey((value) => value + 1)} style={styles.retryButton}>
              <AppText size="sm" weight="bold" style={styles.retryText}>Retry</AppText>
            </Pressable>
          </View>
        ) : pagedCases.length > 0 ? (
          pagedCases.map(
            (item) => (
              <AssignedCaseCard
                key={item.id}
                item={item}
                onPress={
                  handleCasePress
                }
                onEdit={handleEditPress}
              />
            )
          )
        ) : (
          <View
            style={styles.emptyCard}
          >
            <AppText
              size="md"
              weight="semiBold"
              style={styles.emptyTitle}
            >
              No assigned cases
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              No cases match the selected
              filters.
            </AppText>
          </View>
        )}

        {!loading && !error && filteredCases.length > 0 && (
          <View style={styles.paginationRow}>
            <Pressable
              disabled={safePage <= 1}
              onPress={() => setPage((value) => Math.max(1, value - 1))}
              style={[styles.pageButton, safePage <= 1 && styles.disabledButton]}
            >
              <AppText size="sm" weight="bold" style={styles.pageButtonText}>Previous</AppText>
            </Pressable>

            <AppText size="sm" weight="semiBold" style={styles.pageText}>
              {safePage} of {totalPages}
            </AppText>

            <Pressable
              disabled={safePage >= totalPages}
              onPress={() => setPage((value) => Math.min(totalPages, value + 1))}
              style={[styles.pageButton, safePage >= totalPages && styles.disabledButton]}
            >
              <AppText size="sm" weight="bold" style={styles.pageButtonText}>Next</AppText>
            </Pressable>
          </View>
        )}

        <View
          style={styles.bottomSpace}
        />
      </ScrollView>

      <EditCaseModal
        visible={Boolean(editingCase && editForm)}
        form={editForm}
        saving={saving}
        caseTypeOptions={optionValues.caseTypes}
        statusOptions={optionValues.statuses}
        priorityOptions={optionValues.priorities}
        onChange={updateEditField}
        onCancel={() => {
          if (saving) return;
          setEditingCase(null);
          setEditForm(null);
        }}
        onSave={handleSaveEdit}
      />
    </SafeAreaView>
  );
};

const EditCaseModal = ({
  visible,
  form,
  saving,
  caseTypeOptions,
  statusOptions,
  priorityOptions,
  onChange,
  onCancel,
  onSave,
}) => {
  if (!form) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppText size="lg" weight="bold" style={styles.modalTitle}>
              Edit Case
            </AppText>

            <EditField label="Case Number" value={form.caseNumber} onChangeText={(value) => onChange("caseNumber", value)} />
            <EditField label="Case Title" value={form.caseTitle} onChangeText={(value) => onChange("caseTitle", value)} />
            <EditSelect label="Case Type" value={form.caseType} options={caseTypeOptions} onChange={(value) => onChange("caseType", value)} />
            <EditSelect label="Status" value={form.caseStatus} options={statusOptions} onChange={(value) => onChange("caseStatus", value)} />
            <EditSelect label="Priority" value={form.priority} options={priorityOptions} onChange={(value) => onChange("priority", value)} />
            <EditField label="Stage" value={form.caseStage} onChangeText={(value) => onChange("caseStage", value)} />
            <EditField label="Next Hearing Date" value={form.nextHearingDate} onChangeText={(value) => onChange("nextHearingDate", value)} placeholder="YYYY-MM-DD" />
            <EditField label="Remarks" value={form.remarks} onChangeText={(value) => onChange("remarks", value)} multiline />

            <View style={styles.modalActions}>
              <Pressable
                disabled={saving}
                onPress={onCancel}
                style={[styles.cancelButton, saving && styles.disabledButton]}
              >
                <AppText size="sm" weight="bold" style={styles.cancelText}>Cancel</AppText>
              </Pressable>
              <Pressable
                disabled={saving}
                onPress={onSave}
                style={[styles.saveButton, saving && styles.disabledButton]}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <AppText size="sm" weight="bold" style={styles.saveText}>Save</AppText>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const EditField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}) => (
  <View style={styles.editField}>
    <AppText size="xs" weight="semiBold" style={styles.editLabel}>{label}</AppText>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#8A9AAC"
      multiline={multiline}
      style={[styles.editInput, multiline && styles.multilineInput]}
    />
  </View>
);

const EditSelect = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const selectOptions = uniqueValues([value, ...options]);

  return (
    <View style={styles.editField}>
      <AppText size="xs" weight="semiBold" style={styles.editLabel}>{label}</AppText>
      <Pressable onPress={() => setOpen(true)} style={styles.editInputButton}>
        <AppText size="sm" style={styles.editInputText}>{value || "Select"}</AppText>
        <AppText size="sm" style={styles.dropdownMark}>⌄</AppText>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.selectBackdrop} onPress={() => setOpen(false)}>
          <View style={styles.selectMenu}>
            {selectOptions.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}
                style={[styles.selectOption, item === value && styles.selectOptionActive]}
              >
                <AppText size="sm" style={styles.selectOptionText}>{item}</AppText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  description: {
    marginTop: 6,
    lineHeight: 20,
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginBottom: 10,
    paddingHorizontal: 3,
  },

  resultCount: {
    color: COLORS.navy,
  },

  emptyCard: {
    minHeight: 180,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  emptyTitle: {
    color: COLORS.navy,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 7,
  },

  retryButton: {
    marginTop: 14,
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  retryText: {
    color: "#FFFFFF",
  },

  paginationRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  pageButton: {
    minHeight: 42,
    minWidth: 100,
    borderRadius: 12,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  disabledButton: {
    opacity: 0.45,
  },

  pageButtonText: {
    color: "#FFFFFF",
  },

  pageText: {
    color: COLORS.navy,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16, 42, 67, 0.32)",
    justifyContent: "center",
    padding: 18,
  },

  modalCard: {
    width: "100%",
    maxHeight: "88%",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    padding: 18,
  },

  modalTitle: {
    color: COLORS.navy,
    marginBottom: 6,
  },

  editField: {
    marginTop: 12,
  },

  editLabel: {
    color: COLORS.secondary,
    marginBottom: 7,
    fontSize: 10,
    letterSpacing: 1,
  },

  editInput: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    color: COLORS.navy,
    fontSize: 14,
  },

  multilineInput: {
    minHeight: 84,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  editInputButton: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  editInputText: {
    color: COLORS.navy,
    flex: 1,
  },

  dropdownMark: {
    color: COLORS.secondary,
    marginLeft: 10,
  },

  selectBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16, 42, 67, 0.28)",
    justifyContent: "center",
    padding: 24,
  },

  selectMenu: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
  },

  selectOption: {
    minHeight: 44,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  selectOptionActive: {
    backgroundColor: "#F7EAC5",
  },

  selectOptionText: {
    color: COLORS.navy,
  },

  modalActions: {
    marginTop: 18,
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  cancelText: {
    color: COLORS.navy,
  },

  saveButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.navy,
  },

  saveText: {
    color: "#FFFFFF",
  },

  bottomSpace: {
    height: 30,
  },
});

export default AssignedCasesScreen;
