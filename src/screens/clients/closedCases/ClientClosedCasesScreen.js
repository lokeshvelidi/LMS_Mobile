import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";
import { getClientCases } from "../../../services/api/clientCasesService";
import { getApiErrorMessage } from "../../../services/api/authService";

const ClientClosedCasesScreen = ({navigation}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [closedCases, setClosedCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getClientCases({ page: 1, pageSize: 100, search: "", sortBy: "docket", sortOrder: "asc" })
      .then((result) => {
        if (!active) return;
        setClosedCases(result.items.filter((item) => ["CLOSED", "COMPLETED"].includes(String(item.status).toUpperCase())));
      })
      .catch((requestError) => {
        if (!active) return;
        setClosedCases([]);
        setError(getApiErrorMessage(requestError, "Unable to load closed cases."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredCases = useMemo(() => {
    let result = [...closedCases];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.docketNo.toLowerCase().includes(query) ||
          item.caseName.toLowerCase().includes(query) ||
          item.lawyer.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date") {
        const first = new Date(a.closedDate);
        const second = new Date(b.closedDate);

        const comparison = first - second;

        return sortOrder === "asc"
          ? comparison
          : -comparison;
      }

      let first = "";
      let second = "";

      if (sortBy === "docket") {
        first = a.docketNo;
        second = b.docketNo;
      }

      if (sortBy === "case") {
        first = a.caseName;
        second = b.caseName;
      }

      const comparison = first.localeCompare(second);

      return sortOrder === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [search, sortBy, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCases.length / rowsPerPage)
  );

  const visibleCases = filteredCases.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (value) => {
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
    navigation.navigate("ClientCaseDetails", {caseId: caseItem.caseId});
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          PAGE HEADER
      ========================= */}

      <View style={styles.pageHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Closed Cases</Text>
          <SidebarMenuButton role="client" />
        </View>

        <Text style={styles.pageDescription}>
          View your previously completed and closed cases.
        </Text>
      </View>

      {/* =========================
          MAIN PANEL
      ========================= */}

      <View style={styles.panel}>
        {/* PANEL HEADER */}

        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>
              Closed Cases
            </Text>

            <Text style={styles.panelDescription}>
              Review cases that have been completed and
              closed.
            </Text>
          </View>

          <View style={styles.caseCountBadge}>
            <Text style={styles.caseCountText}>
              {filteredCases.length} cases
            </Text>
          </View>
        </View>

        {/* =========================
            FILTER
        ========================= */}

        <View
          style={[
            styles.filterPanel,
            isMobile && styles.filterPanelMobile,
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
              onChangeText={handleSearchChange}
              placeholder="Search docket, case or lawyer"
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
            <Text style={styles.selectText}>
              {sortBy === "date"
                ? "Closed Date"
                : sortBy === "docket"
                ? "Docket No."
                : "Case Name"}
            </Text>

            <Text style={styles.arrow}>
              ⌄
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => {
                if (sortBy === "date") {
                  handleSortByChange("docket");
                } else if (sortBy === "docket") {
                  handleSortByChange("case");
                } else {
                  handleSortByChange("date");
                }
              }}
            />
          </View>

          {/* SORT ORDER */}

          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectText}>
              {sortOrder === "desc"
                ? "Newest First"
                : "Oldest First"}
            </Text>

            <Text style={styles.arrow}>
              ⌄
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleSortOrderChange(
                  sortOrder === "desc"
                    ? "asc"
                    : "desc"
                )
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
            <Text style={styles.selectText}>
              {rowsPerPage} rows
            </Text>

            <Text style={styles.arrow}>
              ⌄
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleRowsChange(
                  rowsPerPage === 10 ? 20 : 10
                )
              }
            />
          </View>
        </View>

        {/* =========================
            CASE TABLE
        ========================= */}

        {loading ? (
          <View style={styles.emptyState}><Text style={styles.emptyDescription}>Loading closed cases...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={styles.emptyDescription}>{error}</Text><Pressable style={styles.mobileViewButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.mobileViewButtonText}>Retry</Text></Pressable></View>
        ) : visibleCases.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                ✓
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No closed cases found
            </Text>

            <Text style={styles.emptyDescription}>
              Try changing your search or sorting options.
            </Text>
          </View>
        ) : (
          <>
            {/* DESKTOP TABLE */}

            {!isMobile && (
              <View style={styles.table}>
                {/* TABLE HEADER */}

                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerText,
                      styles.docketColumn,
                    ]}
                  >
                    DOCKET NO.
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.caseColumn,
                    ]}
                  >
                    CASE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.lawyerColumn,
                    ]}
                  >
                    LAWYER
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.dateColumn,
                    ]}
                  >
                    CLOSED DATE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.reasonColumn,
                    ]}
                  >
                    CLOSURE REASON
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.statusColumn,
                    ]}
                  >
                    STATUS
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.actionColumn,
                    ]}
                  >
                    ACTION
                  </Text>
                </View>

                {/* TABLE ROWS */}

                {visibleCases.map((caseItem) => (
                  <View
                    key={caseItem.id}
                    style={styles.tableRow}
                  >
                    {/* DOCKET */}

                    <View
                      style={[
                        styles.docketColumn,
                        styles.docketCell,
                      ]}
                    >
                      <View style={styles.caseIcon}>
                        <Text style={styles.caseIconText}>
                          C
                        </Text>
                      </View>

                      <Text style={styles.docketText}>
                        {caseItem.docketNo}
                      </Text>
                    </View>

                    {/* CASE */}

                    <View
                      style={[
                        styles.caseColumn,
                        styles.caseCell,
                      ]}
                    >
                      <Text style={styles.caseName}>
                        {caseItem.caseName}
                      </Text>
                    </View>

                    {/* LAWYER */}

                    <Text
                      style={[
                        styles.cellText,
                        styles.lawyerColumn,
                      ]}
                    >
                      {caseItem.lawyer}
                    </Text>

                    {/* DATE */}

                    <Text
                      style={[
                        styles.cellText,
                        styles.dateColumn,
                      ]}
                    >
                      {caseItem.closedDate}
                    </Text>

                    {/* REASON */}

                    <View
                      style={[
                        styles.reasonColumn,
                        styles.reasonCell,
                      ]}
                    >
                      <View style={styles.reasonBadge}>
                        <Text style={styles.reasonText}>
                          {caseItem.closureReason}
                        </Text>
                      </View>
                    </View>

                    {/* STATUS */}

                    <View
                      style={[
                        styles.statusColumn,
                        styles.statusCell,
                      ]}
                    >
                      <View style={styles.closedBadge}>
                        <Text style={styles.closedBadgeText}>
                          {caseItem.finalStatus}
                        </Text>
                      </View>
                    </View>

                    {/* ACTION */}

                    <View
                      style={[
                        styles.actionColumn,
                        styles.actionCell,
                      ]}
                    >
                      <Pressable
                        style={styles.viewButton}
                        onPress={() =>
                          handleView(caseItem)
                        }
                      >
                        <Text style={styles.viewButtonText}>
                          View
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* MOBILE CARDS */}

            {isMobile &&
              visibleCases.map((caseItem) => (
                <View
                  key={caseItem.id}
                  style={styles.caseCard}
                >
                  <View style={styles.caseCardHeader}>
                    <View style={styles.caseTitleContainer}>
                      <View style={styles.caseIcon}>
                        <Text style={styles.caseIconText}>
                          C
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.docketText}>
                          {caseItem.docketNo}
                        </Text>

                        <Text style={styles.caseName}>
                          {caseItem.caseName}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.closedBadge}>
                      <Text style={styles.closedBadgeText}>
                        Closed
                      </Text>
                    </View>
                  </View>

                  <View style={styles.caseDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        Lawyer
                      </Text>

                      <Text style={styles.detailValue}>
                        {caseItem.lawyer}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        Closed Date
                      </Text>

                      <Text style={styles.detailValue}>
                        {caseItem.closedDate}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        Reason
                      </Text>

                      <Text style={styles.detailValue}>
                        {caseItem.closureReason}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={styles.mobileViewButton}
                    onPress={() =>
                      handleView(caseItem)
                    }
                  >
                    <Text style={styles.mobileViewButtonText}>
                      View Case
                    </Text>
                  </Pressable>
                </View>
              ))}
          </>
        )}

        {/* =========================
            PAGINATION
        ========================= */}

        <View
          style={[
            styles.pagination,
            isMobile && styles.paginationMobile,
          ]}
        >
          <Text style={styles.caseCount}>
            {filteredCases.length} cases
          </Text>

          <Pressable
            onPress={handlePrevious}
            disabled={page === 1}
            style={[
              styles.paginationButton,
              page === 1 &&
                styles.paginationDisabled,
            ]}
          >
            <Text
              style={[
                styles.paginationButtonText,
                page === 1 &&
                  styles.paginationDisabledText,
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
              page === totalPages &&
                styles.paginationDisabled,
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
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
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
     HEADER
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
     PANEL
  ========================= */

  panel: {
    width: "100%",

    backgroundColor: "rgba(255, 253, 248, 0.97)",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    overflow: "hidden",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  panelHeader: {
    minHeight: 85,

    paddingHorizontal: 24,
    paddingVertical: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  panelTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 4,
  },

  panelDescription: {
    fontSize: 13,
    color: "#718399",
  },

  caseCountBadge: {
    minHeight: 34,

    paddingHorizontal: 13,

    borderRadius: 17,

    backgroundColor: "#E9EFF5",

    justifyContent: "center",
    alignItems: "center",
  },

  caseCountText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#47627D",
  },

  /* =========================
     FILTER
  ========================= */

  filterPanel: {
    minHeight: 88,

    marginHorizontal: 20,
    marginBottom: 18,

    padding: 18,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E2DA",

    backgroundColor: "#F9F7F1",

    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  filterPanelMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  searchContainer: {
    width: 260,
    height: 44,

    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
  },

  searchInput: {
    height: 42,

    paddingHorizontal: 14,

    fontSize: 14,
    color: "#263C54",
  },

  selectContainer: {
    width: 175,
    height: 44,

    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    paddingHorizontal: 14,
  },

  selectText: {
    fontSize: 14,
    color: "#344B63",
  },

  arrow: {
    position: "absolute",
    right: 13,
    top: 9,

    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     TABLE
  ========================= */

  table: {
    width: "100%",
  },

  tableHeader: {
    minHeight: 52,

    paddingHorizontal: 20,

    backgroundColor: "#F5F0E5",

    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: "#687B91",
  },

  tableRow: {
    minHeight: 86,

    paddingHorizontal: 20,

    backgroundColor: "#FFFDF9",

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  /* =========================
     COLUMNS
  ========================= */

  docketColumn: {
    flex: 1.25,
  },

  caseColumn: {
    flex: 1.7,
  },

  lawyerColumn: {
    flex: 1.15,
  },

  dateColumn: {
    flex: 0.95,
  },

  reasonColumn: {
    flex: 1.15,
  },

  statusColumn: {
    flex: 0.8,
  },

  actionColumn: {
    flex: 0.7,
  },

  /* =========================
     DOCKET
  ========================= */

  docketCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },

  caseIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#E9EFF5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  caseIconText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#47627D",
  },

  docketText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#203750",
  },

  /* =========================
     CASE
  ========================= */

  caseCell: {
    paddingRight: 15,
  },

  caseName: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
    color: "#344B63",
  },

  /* =========================
     CELLS
  ========================= */

  cellText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#40566D",
    paddingRight: 8,
  },

  reasonCell: {
    alignItems: "flex-start",
  },

  reasonBadge: {
    minHeight: 28,

    paddingHorizontal: 10,

    borderRadius: 14,

    backgroundColor: "#F1EBDA",

    alignItems: "center",
    justifyContent: "center",
  },

  reasonText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#80682F",
  },

  statusCell: {
    alignItems: "flex-start",
  },

  closedBadge: {
    minWidth: 62,
    height: 28,

    paddingHorizontal: 10,

    borderRadius: 14,

    backgroundColor: "#E7F4EB",

    alignItems: "center",
    justifyContent: "center",
  },

  closedBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#287D4B",
  },

  /* =========================
     ACTION
  ========================= */

  actionCell: {
    alignItems: "flex-start",
  },

  viewButton: {
    height: 34,

    paddingHorizontal: 13,

    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  viewButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334960",
  },

  /* =========================
     MOBILE CASE CARD
  ========================= */

  caseCard: {
    padding: 18,

    backgroundColor: "#FFFDF9",

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  caseCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  caseTitleContainer: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    marginRight: 10,
  },

  caseDetails: {
    marginTop: 16,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: "#ECEAE4",
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  detailLabel: {
    width: 95,

    fontSize: 12,
    color: "#8292A4",
  },

  detailValue: {
    flex: 1,

    fontSize: 13,
    color: "#344B63",
  },

  mobileViewButton: {
    height: 40,

    marginTop: 8,

    borderRadius: 20,

    backgroundColor: "#16324F",

    alignItems: "center",
    justifyContent: "center",
  },

  mobileViewButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* =========================
     EMPTY STATE
  ========================= */

  emptyState: {
    minHeight: 250,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  emptyIcon: {
    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor: "#E7F4EB",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  emptyIconText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#287D4B",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263C54",
    marginBottom: 5,
  },

  emptyDescription: {
    fontSize: 13,
    color: "#8292A4",
    textAlign: "center",
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    minHeight: 64,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 12,
  },

  paginationMobile: {
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 12,
  },

  caseCount: {
    fontSize: 13,
    color: "#667B91",
    marginRight: 4,
  },

  paginationButton: {
    minWidth: 58,
    height: 36,

    paddingHorizontal: 13,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334960",
  },

  paginationDisabled: {
    backgroundColor: "#F7F7F6",
    borderColor: "#E6E5E2",
  },

  paginationDisabledText: {
    color: "#A4ACB4",
  },

  pageNumber: {
    fontSize: 13,
    color: "#334960",
  },
});

export default ClientClosedCasesScreen;
