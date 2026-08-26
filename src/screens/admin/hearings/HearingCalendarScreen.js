import React, { useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import HearingCard from "../../../components/admin/hearings/HearingCard";
import HearingDateHeader from "../../../components/admin/hearings/HearingDateHeader";
import HearingFilter from "../../../components/admin/hearings/HearingFilter";
import { getAdminHearings } from "../../../services/api/adminHearingsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

/* Legacy sample records intentionally disabled. This screen uses API data only.
const HEARINGS = [
  {
    id: "1",
    date: "05 Jul 2026",
    dateNumber: "05",
    month: "JUL",
    day: "Sunday",
    time: "10:30 AM",
    duration: "1 hr",
    title: "Evidence Hearing",
    caseNumber: "CRL-2026-001",
    client: "Ramesh Kumar",
    court: "High Court",
    judge: "Justice Rao",
    type: "Court Hearing",
    status: "Scheduled",
  },

  {
    id: "2",
    date: "05 Jul 2026",
    dateNumber: "05",
    month: "JUL",
    day: "Sunday",
    time: "02:00 PM",
    duration: "45 min",
    title: "Client Meeting",
    caseNumber: "CIV-2026-014",
    client: "Suresh Rao",
    court: "Office",
    judge: "-",
    type: "Client Meeting",
    status: "Scheduled",
  },

  {
    id: "3",
    date: "06 Jul 2026",
    dateNumber: "06",
    month: "JUL",
    day: "Monday",
    time: "11:00 AM",
    duration: "1 hr",
    title: "Arguments",
    caseNumber: "CIV-2026-014",
    client: "Suresh Rao",
    court: "District Court",
    judge: "Justice Kumar",
    type: "Court Hearing",
    status: "Scheduled",
  },

  {
    id: "4",
    date: "08 Jul 2026",
    dateNumber: "08",
    month: "JUL",
    day: "Wednesday",
    time: "03:00 PM",
    duration: "1 hr",
    title: "Mediation Session",
    caseNumber: "FAM-2026-008",
    client: "Priya Sharma",
    court: "Family Court",
    judge: "Justice Priya",
    type: "Mediation",
    status: "Postponed",
  },

  {
    id: "5",
    date: "10 Jul 2026",
    dateNumber: "10",
    month: "JUL",
    day: "Friday",
    time: "10:00 AM",
    duration: "1 hr",
    title: "Final Hearing",
    caseNumber: "CON-2026-003",
    client: "Anil Kumar",
    court: "Consumer Court",
    judge: "Justice Reddy",
    type: "Court Hearing",
    status: "Scheduled",
  },
]; */

const HearingCalendarScreen = ({
  navigation,
}) => {
  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadHearings = React.useCallback(() => {
    setLoading(true);
    getAdminHearings().then(setHearings).catch(() => setHearings([])).finally(() => setLoading(false));
  }, []);
  useFocusEffect(React.useCallback(() => { loadHearings(); }, [loadHearings]));
  const [filterVisible, setFilterVisible] =
    useState(false);

  const [status, setStatus] =
    useState("All");

  const [type, setType] =
    useState("All");

  const filteredHearings = useMemo(() => {
    return hearings.filter((item) => {
      const statusMatch =
        status === "All" ||
        item.status === status;

      const typeMatch =
        type === "All" ||
        item.purpose === type;

      return (
        statusMatch && typeMatch
      );
    });
    }, [hearings, status, type]);

  const groupedHearings = useMemo(() => {
    const groups = {};

    filteredHearings.forEach(
      (hearing) => {
        const date = hearing.hearingDate ? new Date(hearing.hearingDate).toISOString().slice(0, 10) : "unknown";
        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(
          hearing
        );
      }
    );

    return Object.entries(groups);
  }, [filteredHearings]);

  const clearFilters = () => {
    setStatus("All");
    setType("All");
  };

  return (
    <AppScreen>
      <FlatList
        data={groupedHearings}
        keyExtractor={([date]) => date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Hearing Calendar"
              subtitle="View and manage upcoming hearings."
              showNotification={false}
            />

            <View style={styles.toolbar}>
              <View style={styles.summary}>
                <AppText
                  size="sm"
                  color="textSecondary"
                >
                  {filteredHearings.length} hearings
                </AppText>
              </View>

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
                  Filter
                </AppText>
              </Pressable>

              <Pressable
                onPress={() =>
                  navigation.navigate(
                    "AddHearing"
                  )
                }
                style={styles.addButton}
              >
                <AppText
                  size="sm"
                  weight="semiBold"
                  style={styles.addText}
                >
                  + Add
                </AppText>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const [
            date,
            hearings,
          ] = item;

          const first = hearings[0];

          return (
            <View>
              <HearingDateHeader
                hearingDate={first.hearingDate}
                count={hearings.length}
              />

              {hearings.map(
                (hearing) => (
                  <HearingCard
                    key={String(hearing.hearingId)}
                    hearing={hearing}
                    onPress={() =>
                      navigation.navigate(
                        "HearingDetails",
                        {
                          hearing,
                        }
                      )
                    }
                  />
                )
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText
              size="lg"
              weight="semiBold"
            >
              No hearings found
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              {loading ? "Loading hearings..." : "Try changing your filters."}
            </AppText>
          </View>
        }
      />

      <HearingFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        status={status}
        type={type}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onClear={clearFilters}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 30,
    backgroundColor:
      COLORS.background,
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  summary: {
    flex: 1,
  },

  filterButton: {
    height: 42,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  addButton: {
    height: 42,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: COLORS.white,
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

export default HearingCalendarScreen;
