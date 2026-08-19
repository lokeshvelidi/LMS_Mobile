import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  getClientCases,
} from "../../../services/api/clientCasesService";
import { getApiErrorMessage } from "../../../services/api/authService";

const ClientMyCasesScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("docket");
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [cases, setCases] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getClientCases({
          page,
          pageSize: rowsPerPage,
          search: search.trim(),
          sortBy,
          sortOrder,
        });

        if (!active) return;
        setCases(result.items);
        setTotalCases(result.total);
      } catch (requestError) {
        if (!active) return;
        setCases([]);
        setTotalCases(0);
        setError(getApiErrorMessage(requestError, "Unable to load your cases."));
      } finally {
        if (active) setLoading(false);
      }
    }, search.trim() ? 350 : 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [page, reloadKey, rowsPerPage, search, sortBy, sortOrder]);

  const visibleCases = useMemo(() => {
    let result = [...cases];
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((item) =>
        item.docketNo.toLowerCase().includes(query) ||
        item.caseName.toLowerCase().includes(query) ||
        item.lawyer.toLowerCase().includes(query)
      );
    }

    const field = sortBy === "case"
      ? "caseName"
      : sortBy === "lawyer"
      ? "lawyer"
      : "docketNo";
    result.sort((first, second) => {
      const comparison = first[field].localeCompare(second[field]);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [cases, search, sortBy, sortOrder]);

  const completeResultSet = totalCases <= cases.length;
  const displayedTotal = completeResultSet ? visibleCases.length : totalCases;
  const totalPages = Math.max(1, Math.ceil(displayedTotal / rowsPerPage));

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortBy = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNext = () => {
    setPage((current) => Math.min(totalPages, current + 1));
  };

  const handleView = (caseItem) => {
    navigation.navigate("ClientCaseDetails", {
      caseId: caseItem.caseId,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE HEADER */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Cases</Text>

        <Text style={styles.pageDescription}>
          Cases linked to your account. You have read-only access to case
          details.
        </Text>
      </View>

      {/* MAIN PANEL */}
      <View style={styles.mainPanel}>
        {/* FILTER AREA */}
        <View
          style={[
            styles.filterRow,
            isMobile && styles.filterRowMobile,
          ]}
        >
          {/* SEARCH */}
          <View
            style={[
              styles.searchContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <TextInput
              value={search}
              onChangeText={handleSearch}
              placeholder="Search docket / case / lawyer"
              placeholderTextColor="#8B9BB0"
              style={styles.searchInput}
            />
          </View>

          {/* SORT BY */}
          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectLabel}>
              {sortBy === "docket"
                ? "Sort by Docket"
                : sortBy === "case"
                ? "Sort by Case"
                : "Sort by Lawyer"}
            </Text>

            <Text style={styles.arrow}>⌄</Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleSortBy(sortBy === "docket" ? "case" : "docket")
              }
            />
          </View>

          {/* SORT ORDER */}
          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectLabel}>
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Text>

            <Text style={styles.arrow}>⌄</Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
            />
          </View>

          {/* ROWS */}
          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectLabel}>
              {rowsPerPage} rows
            </Text>

            <Text style={styles.arrow}>⌄</Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleRowsChange(rowsPerPage === 10 ? 20 : 10)
              }
            />
          </View>
        </View>

        {/* TABLE */}
        {loading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color="#172F4D" />
            <Text style={styles.stateText}>Loading cases...</Text>
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => setReloadKey((value) => value + 1)}
            >
              <Text style={styles.viewButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : isMobile ? (
          <View style={styles.mobileList}>
            {visibleCases.length > 0 ? visibleCases.map((caseItem) => (
              <View
                key={caseItem.caseId}
                style={styles.mobileCard}
              >
                <Text style={styles.mobileLabel}>DOCKET NO.</Text>
                <Text style={styles.mobileDocket}>
                  {caseItem.docketNo}
                </Text>

                <Text style={styles.mobileLabel}>CASE</Text>
                <Text style={styles.mobileCaseName}>
                  {caseItem.caseName}
                </Text>

                <Text style={styles.mobileLabel}>LAWYER</Text>
                <Text style={styles.mobileValue}>
                  {caseItem.lawyer}
                </Text>

                <Text style={styles.mobileLabel}>STATUS</Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {caseItem.status}
                  </Text>
                </View>

                <Pressable
                  style={styles.mobileViewButton}
                  onPress={() => handleView(caseItem)}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </Pressable>
              </View>
            )) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No cases found.</Text>
              </View>
            )}
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tableScrollContent}
          >
            <View style={styles.table}>
              {/* TABLE HEADER */}
              <View style={styles.tableHeader}>
                <View style={styles.docketColumn}>
                  <Text style={styles.headerText}>
                    DOCKET NO.
                  </Text>
                </View>

                <View style={styles.caseColumn}>
                  <Text style={styles.headerText}>
                    CASE
                  </Text>
                </View>

                <View style={styles.lawyerColumn}>
                  <Text style={styles.headerText}>
                    LAWYER
                  </Text>
                </View>

                <View style={styles.statusColumn}>
                  <Text style={styles.headerText}>
                    STATUS
                  </Text>
                </View>

                <View style={styles.actionColumn}>
                  <Text style={styles.headerText}>
                    ACTION
                  </Text>
                </View>
              </View>

              {/* TABLE ROWS */}
              {visibleCases.length > 0 ? (
                visibleCases.map((caseItem, index) => (
                  <View
                    key={caseItem.caseId}
                    style={[
                      styles.tableRow,
                      index % 2 === 0 && styles.alternateRow,
                    ]}
                  >
                    {/* DOCKET */}
                    <View style={styles.docketColumn}>
                      <Text style={styles.docketText}>
                        {caseItem.docketNo}
                      </Text>
                    </View>

                    {/* CASE */}
                    <View style={styles.caseColumn}>
                      <Text style={styles.caseNameText}>
                        {caseItem.caseName}
                      </Text>
                    </View>

                    {/* LAWYER */}
                    <View style={styles.lawyerColumn}>
                      <Text style={styles.valueText}>
                        {caseItem.lawyer}
                      </Text>
                    </View>

                    {/* STATUS */}
                    <View style={styles.statusColumn}>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>
                          {caseItem.status}
                        </Text>
                      </View>
                    </View>

                    {/* ACTION */}
                    <View style={styles.actionColumn}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.viewButton,
                          pressed && styles.viewButtonPressed,
                        ]}
                        onPress={() => handleView(caseItem)}
                      >
                        <Text style={styles.viewButtonText}>
                          View
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    No cases found.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {/* PAGINATION */}
        <View
          style={[
            styles.pagination,
            isMobile && styles.paginationMobile,
          ]}
        >
          <Text style={styles.caseCount}>
            {displayedTotal} cases
          </Text>

          <Pressable
            onPress={handlePrevious}
            disabled={page === 1}
            style={[
              styles.paginationButton,
              page === 1 && styles.paginationDisabled,
            ]}
          >
            <Text
              style={[
                styles.paginationButtonText,
                page === 1 && styles.paginationDisabledText,
              ]}
            >
              Prev
            </Text>
          </Pressable>

          <Text style={styles.pageNumber}>
            Page {page} / {totalPages}
          </Text>

          <Pressable
            onPress={handleNext}
            disabled={page === totalPages}
            style={[
              styles.paginationButton,
              page === totalPages && styles.paginationDisabled,
            ]}
          >
            <Text
              style={[
                styles.paginationButtonText,
                page === totalPages &&
                  styles.paginationDisabledText,
              ]}
            >
              Next
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },

  /* =========================
     PAGE HEADER
  ========================= */

  pageHeader: {
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  pageDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#627A96",
  },

  /* =========================
     MAIN PANEL
  ========================= */

  mainPanel: {
    width: "100%",
    backgroundColor: "rgba(255, 253, 248, 0.96)",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 18,

    borderWidth: 1,
    borderColor: "#EEE9DE",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  /* =========================
     FILTERS
  ========================= */

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },

  filterRowMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  searchContainer: {
    width: 198,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  searchInput: {
    height: 42,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#243A52",
  },

  selectContainer: {
    width: 196,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  selectLabel: {
    fontSize: 14,
    color: "#253B54",
  },

  arrow: {
    position: "absolute",
    right: 14,
    top: 10,
    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     TABLE
  ========================= */

  tableScrollContent: {
    minWidth: "100%",
  },

  table: {
    minWidth: 1100,
    borderWidth: 1,
    borderColor: "#EEE9DE",
    borderRadius: 2,
    overflow: "hidden",
  },

  tableHeader: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E0D1",
  },

  tableRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDFC",
    borderBottomWidth: 1,
    borderBottomColor: "#ECE7DE",
  },

  alternateRow: {
    backgroundColor: "#FFFCF6",
  },

  docketColumn: {
    width: 250,
    paddingHorizontal: 20,
  },

  caseColumn: {
    width: 500,
    paddingHorizontal: 20,
  },

  lawyerColumn: {
    width: 300,
    paddingHorizontal: 20,
  },

  statusColumn: {
    width: 260,
    paddingHorizontal: 20,
  },

  actionColumn: {
    width: 130,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },

  headerText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#61758F",
  },

  docketText: {
    fontSize: 15,
    color: "#263A50",
    fontWeight: "400",
  },

  caseNameText: {
    fontSize: 15,
    color: "#172E49",
    fontWeight: "700",
  },

  valueText: {
    fontSize: 15,
    color: "#293D54",
  },

  /* =========================
     STATUS
  ========================= */

  statusBadge: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#6C50D9",
    backgroundColor: "#FBF9FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#654CC4",
  },

  /* =========================
     VIEW BUTTON
  ========================= */

  viewButton: {
    minWidth: 62,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDE2E7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  viewButtonPressed: {
    backgroundColor: "#F2F4F6",
  },

  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#172E49",
  },

  /* =========================
     EMPTY STATE
  ========================= */

  emptyState: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#74879C",
  },

  stateContainer: {
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  stateText: {
    fontSize: 15,
    color: "#74879C",
  },

  errorText: {
    fontSize: 15,
    color: "#B33A3A",
    textAlign: "center",
  },

  retryButton: {
    minWidth: 72,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDE2E7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 20,
  },

  paginationMobile: {
    justifyContent: "center",
    flexWrap: "wrap",
  },

  caseCount: {
    fontSize: 14,
    color: "#637891",
    marginRight: 4,
  },

  paginationButton: {
    minWidth: 58,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#243A52",
  },

  paginationDisabled: {
    backgroundColor: "#F7F7F6",
    borderColor: "#E6E5E2",
  },

  paginationDisabledText: {
    color: "#A3AAB2",
  },

  pageNumber: {
    fontSize: 14,
    color: "#334960",
  },

  /* =========================
     MOBILE
  ========================= */

  mobileList: {
    gap: 12,
  },

  mobileCard: {
    borderWidth: 1,
    borderColor: "#E8E2D8",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 18,
  },

  mobileLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: "#71839A",
    marginTop: 10,
    marginBottom: 4,
  },

  mobileDocket: {
    fontSize: 15,
    color: "#263A50",
  },

  mobileCaseName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172E49",
  },

  mobileValue: {
    fontSize: 15,
    color: "#293D54",
  },

  mobileViewButton: {
    marginTop: 18,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDE2E7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClientMyCasesScreen;
