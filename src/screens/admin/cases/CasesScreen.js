import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";

import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import CaseCard from "../../../components/admin/cases/CaseCard";
import CaseSearch from "../../../components/admin/cases/CaseSearch";
import CaseFilter from "../../../components/admin/cases/CaseFilter";
import { getAdminCases } from "../../../services/api/adminCasesService";
import { getAdminMasterValues } from "../../../services/api/adminReferenceService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const CASES = [];
/* Legacy mock records removed; cases are loaded from the backend. */
/*
  {
    id: "1",
    caseNumber: "CRL-2026-001",
    type: "Criminal",
    client: "Ramesh Kumar",
    stage: "Evidence",
    status: "Open",
    priority: "High",
    nextHearing: "05 Jul 2026",
    created: "28 Jun 2026",
  },
  {
    id: "2",
    caseNumber: "CIV-2026-014",
    type: "Civil",
    client: "Suresh Rao",
    stage: "Arguments",
    status: "Pending",
    priority: "Medium",
    nextHearing: "06 Jul 2026",
    created: "25 Jun 2026",
  },
  {
    id: "3",
    caseNumber: "FAM-2026-008",
    type: "Family",
    client: "Priya Sharma",
    stage: "Mediation",
    status: "Open",
    priority: "Medium",
    nextHearing: "08 Jul 2026",
    created: "22 Jun 2026",
  },
  {
    id: "4",
    caseNumber: "CIV-2026-009",
    type: "Property",
    client: "Mahesh Reddy",
    stage: "Judgment",
    status: "Closed",
    priority: "Low",
    nextHearing: "-",
    created: "18 Jun 2026",
  },
  {
    id: "5",
    caseNumber: "CON-2026-003",
    type: "Consumer",
    client: "Anil Kumar",
    stage: "Hearing",
    status: "Open",
    priority: "High",
    nextHearing: "10 Jul 2026",
    created: "15 Jun 2026",
  },
]; */

const CasesScreen = ({
  navigation,
}) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [masterOptions, setMasterOptions] = useState({ caseTypes: [], statuses: [], priorities: [] });
  const loadCases = async () => {
    setLoading(true);
    try {
      const pageSize = 100;
      let page = 1;
      let allItems = [];
      let total = null;
      do {
        const result = await getAdminCases({ page, pageSize });
        allItems = allItems.concat(result.items);
        total = result.total;
        if (!result.items.length || allItems.length >= total || result.items.length < pageSize) break;
        page += 1;
      } while (total == null || allItems.length < total);
      setCases(allItems);
    } catch (e) {
      Alert.alert("Cases unavailable", e.response?.data?.message || "Unable to load cases.");
    } finally { setLoading(false); }
  };
  useEffect(() => { loadCases(); Promise.all([getAdminMasterValues("/api/master/case-types"), getAdminMasterValues("/api/master/case-statuses"), getAdminMasterValues("/api/master/priorities")]).then(([caseTypes, statuses, priorities]) => setMasterOptions({ caseTypes, statuses, priorities })).catch(() => {}); }, []);
  const [search, setSearch] = useState("");

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [caseType, setCaseType] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [priority, setPriority] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Newest first");

  const filteredCases = useMemo(() => {
    let result = [...cases];

    const query =
      search.trim().toLowerCase();

    if (query) {
      result = result.filter((item) => {
        return (
          item.caseNumber
            .toLowerCase()
            .includes(query) ||
          item.client
            .toLowerCase()
            .includes(query) ||
          item.type
            .toLowerCase()
            .includes(query)
        );
      });
    }

    if (caseType !== "All") {
      result = result.filter(
        (item) => item.type === caseType
      );
    }

    if (status !== "All") {
      result = result.filter(
        (item) => item.status === status
      );
    }

    if (priority !== "All") {
      result = result.filter(
        (item) =>
          item.priority === priority
      );
    }

    result.sort((a, b) => {
      const first =
        new Date(a.created).getTime();

      const second =
        new Date(b.created).getTime();

      return sortOrder === "Newest first"
        ? second - first
        : first - second;
    });

    return result;
  }, [
    cases,
    search,
    caseType,
    status,
    priority,
    sortOrder,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCaseType("All");
    setStatus("All");
    setPriority("All");
    setSortOrder("Newest first");
  };

  return (
    <AppScreen>
      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Cases"
              subtitle="Manage and review case records."
              showNotification={false}
            />

            <View style={styles.content}>
              <CaseSearch
                value={search}
                onChangeText={setSearch}
              />

              <View style={styles.toolbar}>
                <Pressable
                  onPress={() =>
                    setFilterVisible(true)
                  }
                  style={styles.filterButton}
                >
                  <AppText
                    size="sm"
                    weight="semiBold"
                  >
                    Filter & Sort
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={() =>
                    navigation.navigate(
                      "AddCase"
                    )
                  }
                  style={styles.addButton}
                >
                  <AppText
                    size="sm"
                    weight="semiBold"
                    style={styles.addText}
                  >
                    + Add Case
                  </AppText>
                </Pressable>
              </View>

              <View style={styles.resultRow}>
                <AppText
                  size="sm"
                  color="textSecondary"
                >
                  {filteredCases.length} cases
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                >
                  {caseType !== "All" ||
                  status !== "All" ||
                  priority !== "All"
                    ? "Filters applied"
                    : "All cases"}
                </AppText>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CaseCard
            caseItem={item}
            onPress={() =>
              navigation.navigate(
                "CaseDetails",
                {
                  caseItem: item,
                }
              )
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText
              size="lg"
              weight="semiBold"
            >
              {loading ? "Loading cases..." : "No cases found"}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              Try changing your search or
              filters.
            </AppText>
          </View>
        }
      />

      <CaseFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        caseType={caseType}
        status={status}
        priority={priority}
        sortOrder={sortOrder}
        onCaseTypeChange={setCaseType}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSortChange={setSortOrder}
        onClear={clearFilters}
        caseTypeOptions={masterOptions.caseTypes}
        statusOptions={masterOptions.statuses}
        priorityOptions={masterOptions.priorities}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 30,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
  },

  toolbar: {
    flexDirection: "row",
    marginTop: 12,
  },

  filterButton: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  addButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  addText: {
    color: COLORS.white,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 12,
  },

  empty: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 30,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
  },
});

export default CasesScreen;
