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
import { getClientHearings } from "../../../services/api/clientHearingsService";
import { getApiErrorMessage } from "../../../services/api/authService";

const ClientHearingScheduleScreen = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getClientHearings()
      .then((items) => active && setHearings(items))
      .catch((requestError) => {
        if (!active) return;
        setHearings([]);
        setError(getApiErrorMessage(requestError, "Unable to load hearings."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredHearings = useMemo(() => {
    let result = [...hearings];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.docketNo.toLowerCase().includes(query) ||
          item.caseName.toLowerCase().includes(query) ||
          item.lawyer.toLowerCase().includes(query) ||
          item.court.toLowerCase().includes(query)
      );
    }

    if (dateFilter !== "All") {
      result = result.filter((item) => {
        const hearingDate = item.timestamp;
        const today = Date.now();

        if (dateFilter === "Upcoming") {
          return hearingDate !== null && hearingDate >= today;
        }

        if (dateFilter === "Past") {
          return hearingDate !== null && hearingDate < today;
        }

        return true;
      });
    }

    return result;
  }, [hearings, search, dateFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHearings.length / rowsPerPage)
  );

  const visibleHearings = filteredHearings.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
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

  const handleView = (hearing) => {
    console.log("View hearing:", hearing);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE HEADER */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Hearing Schedule</Text>

        <Text style={styles.pageDescription}>
          View your upcoming hearings, court details, and hearing purposes.
        </Text>
      </View>

      {/* FILTER PANEL */}
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
            placeholder="Search docket / case / lawyer"
            placeholderTextColor="#8B9BB0"
            style={styles.searchInput}
          />
        </View>

        {/* DATE FILTER */}
        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {dateFilter}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (dateFilter === "All") {
                handleDateFilterChange("Upcoming");
              } else if (dateFilter === "Upcoming") {
                handleDateFilterChange("Past");
              } else {
                handleDateFilterChange("All");
              }
            }}
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

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() =>
              handleRowsChange(rowsPerPage === 10 ? 20 : 10)
            }
          />
        </View>
      </View>

      {/* HEARING LIST */}
      <View style={styles.hearingList}>
        {loading ? (
          <View style={styles.emptyState}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.emptyText}>Loading hearings...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>{error}</Text><Pressable style={styles.viewButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.viewButtonText}>Retry</Text></Pressable></View>
        ) : visibleHearings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No hearings found.
            </Text>
          </View>
        ) : (
          visibleHearings.map((hearing) => (
            <View
              key={hearing.id}
              style={styles.hearingCard}
            >
              {/* DATE BLOCK */}
              <View style={styles.dateBlock}>
                <Text style={styles.dateDay}>
                  {hearing.date.split(" ")[0]}
                </Text>

                <Text style={styles.dateMonth}>
                  {hearing.date.split(" ")[1]?.toUpperCase()}
                </Text>
              </View>

              {/* HEARING DETAILS */}
              <View style={styles.hearingDetails}>
                <Text style={styles.hearingTitle}>
                  {hearing.purpose}
                </Text>

                <Text style={styles.caseName}>
                  {hearing.caseName}
                </Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Docket
                  </Text>

                  <Text style={styles.detailValue}>
                    {hearing.docketNo}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Time
                  </Text>

                  <Text style={styles.detailValue}>
                    {hearing.time}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Court
                  </Text>

                  <Text style={styles.detailValue}>
                    {hearing.court} • {hearing.courtroom}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Lawyer
                  </Text>

                  <Text style={styles.detailValue}>
                    {hearing.lawyer}
                  </Text>
                </View>
              </View>

              {/* RIGHT SIDE */}
              <View style={styles.hearingRight}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {hearing.status}
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.viewButton,
                    pressed && styles.viewButtonPressed,
                  ]}
                  onPress={() => handleView(hearing)}
                >
                  <Text style={styles.viewButtonText}>
                    View
                  </Text>
                </Pressable>
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
        <Text style={styles.hearingCount}>
          {filteredHearings.length} hearings
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
    width: 250,
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
    width: 190,
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
     HEARING LIST
  ========================= */

  hearingList: {
    width: "100%",
  },

  hearingCard: {
    width: "100%",
    minHeight: 170,

    backgroundColor: "rgba(255, 253, 248, 0.97)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    padding: 22,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,

    marginBottom: 14,
  },

  /* =========================
     DATE
  ========================= */

  dateBlock: {
    width: 82,
    height: 82,
    borderRadius: 14,
    backgroundColor: "#F2E7C8",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 22,
  },

  dateDay: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "700",
    color: "#18314E",
  },

  dateMonth: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6D5B32",
    marginTop: 2,
    letterSpacing: 1,
  },

  /* =========================
     DETAILS
  ========================= */

  hearingDetails: {
    flex: 1,
    paddingRight: 20,
  },

  hearingTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  caseName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#516A84",
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },

  detailLabel: {
    width: 65,
    fontSize: 13,
    color: "#8292A5",
  },

  detailValue: {
    flex: 1,
    fontSize: 13,
    color: "#344C66",
  },

  /* =========================
     RIGHT SIDE
  ========================= */

  hearingRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    minHeight: 110,
  },

  statusBadge: {
    minWidth: 92,
    height: 34,
    paddingHorizontal: 13,

    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#6C55C7",
    backgroundColor: "#F5F0FF",

    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6650B8",
    letterSpacing: 0.4,
  },

  viewButton: {
    minWidth: 72,
    height: 38,
    paddingHorizontal: 18,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE2E8",
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
    color: "#243A52",
  },

  /* =========================
     EMPTY
  ========================= */

  emptyState: {
    width: "100%",
    minHeight: 220,

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

  hearingCount: {
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

export default ClientHearingScheduleScreen;
