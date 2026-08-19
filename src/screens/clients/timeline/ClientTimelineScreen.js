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
import { getClientTimelineCases } from "../../../services/api/clientCasesService";
import { getApiErrorMessage } from "../../../services/api/authService";

const ClientTimelineScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [timelineCases, setTimelineCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getClientTimelineCases()
      .then((items) => active && setTimelineCases(items))
      .catch((requestError) => {
        if (!active) return;
        setTimelineCases([]);
        setError(getApiErrorMessage(requestError, "Unable to load case timelines."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredCases = useMemo(() => {
    let result = [...timelineCases];

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
      const firstDate = new Date(a.filingDate);
      const secondDate = new Date(b.filingDate);

      if (sortOrder === "oldest") {
        return firstDate - secondDate;
      }

      return secondDate - firstDate;
    });

    return result;
  }, [cases, search, sortOrder]);

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

  const handleSortChange = (value) => {
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

  const handleOpenCase = (caseItem) => {
    navigation.navigate("ClientCaseDetails", { caseId: caseItem.caseId });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE HEADER */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Case Timeline</Text>

        <Text style={styles.pageDescription}>
          Review the latest status, hearing movement, and payment progress for
          each case.
        </Text>
      </View>

      {/* FILTER PANEL */}
      <View
        style={[
          styles.filterPanel,
          isMobile && styles.filterPanelMobile,
        ]}
      >
        <View
          style={[
            styles.searchContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search docket / case / lawyer"
            placeholderTextColor="#8B9BB0"
            style={styles.searchInput}
          />
        </View>

        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {sortOrder === "oldest" ? "Oldest first" : "Newest first"}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() =>
              handleSortChange(
                sortOrder === "oldest" ? "newest" : "oldest"
              )
            }
          />
        </View>

        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
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

      {/* TIMELINE LIST */}
      <View style={styles.timelineList}>
        {loading ? (
          <View style={styles.emptyState}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.emptyText}>Loading timelines...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>{error}</Text><Pressable style={styles.openCaseButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.openCaseText}>Retry</Text></Pressable></View>
        ) : visibleCases.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No cases linked yet.
            </Text>
          </View>
        ) : (
          visibleCases.map((caseItem) => (
            <View
              key={caseItem.docketNo}
              style={styles.timelineCard}
            >
              {/* CARD HEADER */}
              <View
                style={[
                  styles.cardHeader,
                  isMobile && styles.cardHeaderMobile,
                ]}
              >
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.docketText}>
                    {caseItem.docketNo}
                  </Text>

                  <Text style={styles.caseNameText}>
                    {caseItem.caseName}
                  </Text>

                  <Text style={styles.lawyerText}>
                    Advocate: {caseItem.lawyer}
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.openCaseButton,
                    pressed && styles.openCaseButtonPressed,
                  ]}
                  onPress={() => handleOpenCase(caseItem)}
                >
                  <Text style={styles.openCaseText}>
                    Open Case
                  </Text>
                </Pressable>
              </View>

              {/* INFORMATION CARDS */}
              <View
                style={[
                  styles.infoGrid,
                  isMobile && styles.infoGridMobile,
                ]}
              >
                {/* LATEST STATUS */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Latest Status
                  </Text>

                  <Text style={styles.infoValue}>
                    {caseItem.latestStatus}
                  </Text>
                </View>

                {/* LATEST EVENT */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Latest Event
                  </Text>

                  <Text style={styles.infoValue}>
                    {caseItem.latestEvent}
                  </Text>
                </View>

                {/* NEXT HEARING */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Next Hearing
                  </Text>

                  <Text style={styles.infoValue}>
                    {caseItem.nextHearing}
                  </Text>
                </View>

                {/* PAYMENT */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Payment
                  </Text>

                  <Text style={styles.infoValue}>
                    {caseItem.payment}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* PAGINATION */}
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
     FILTER PANEL
  ========================= */

  filterPanel: {
    minHeight: 98,
    width: "100%",
    backgroundColor: "rgba(255, 253, 248, 0.96)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    paddingHorizontal: 24,
    paddingVertical: 25,

    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,

    marginBottom: 20,
  },

  filterPanelMobile: {
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
    width: 198,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  selectText: {
    fontSize: 14,
    color: "#253B54",
  },

  arrow: {
    position: "absolute",
    right: 14,
    top: 9,
    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     TIMELINE LIST
  ========================= */

  timelineList: {
    width: "100%",
  },

  timelineCard: {
    width: "100%",
    backgroundColor: "rgba(255, 253, 248, 0.97)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",
    padding: 24,

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,

    marginBottom: 18,
  },

  /* =========================
     CARD HEADER
  ========================= */

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  cardHeaderMobile: {
    flexDirection: "column",
  },

  cardHeaderLeft: {
    flex: 1,
  },

  docketText: {
    fontSize: 14,
    color: "#72869E",
    marginBottom: 8,
    letterSpacing: 0.3,
  },

  caseNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172E49",
    marginBottom: 7,
  },

  lawyerText: {
    fontSize: 15,
    color: "#647B95",
  },

  /* =========================
     OPEN CASE
  ========================= */

  openCaseButton: {
    minWidth: 96,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  openCaseButtonPressed: {
    backgroundColor: "#F2F4F6",
  },

  openCaseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#172E49",
  },

  /* =========================
     INFO GRID
  ========================= */

  infoGrid: {
    flexDirection: "row",
    gap: 14,
  },

  infoGridMobile: {
    flexDirection: "column",
  },

  infoBox: {
    flex: 1,
    minHeight: 82,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FCFCFC",
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
  },

  infoLabel: {
    fontSize: 13,
    color: "#74879F",
    marginBottom: 9,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B2F48",
  },

  /* =========================
     EMPTY
  ========================= */

  emptyState: {
    width: "100%",
    minHeight: 180,
    borderRadius: 20,
    backgroundColor: "rgba(255, 253, 248, 0.97)",
    borderWidth: 1,
    borderColor: "#EEE9DE",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#74879C",
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 4,
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
});

export default ClientTimelineScreen;
