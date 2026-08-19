import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import CourtCard from "../../../components/admin/masterData/CourtCard";
import CourtSearch from "../../../components/admin/masterData/CourtSearch";
import CourtFilter from "../../../components/admin/masterData/CourtFilter";
import { getAdminCourts } from "../../../services/api/adminCourtsService";
import { Alert } from "react-native";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const COURTS = [
  {
    id: "1",
    name: "High Court of Andhra Pradesh",
    code: "HC-AP",
    location: "Amaravati",
    type: "High Court",
    status: "Active",
    caseCount: 24,
  },

  {
    id: "2",
    name: "District Court",
    code: "DC-RJY",
    location: "Rajahmundry",
    type: "District Court",
    status: "Active",
    caseCount: 18,
  },

  {
    id: "3",
    name: "Family Court",
    code: "FC-RJY",
    location: "Rajahmundry",
    type: "Family Court",
    status: "Active",
    caseCount: 9,
  },

  {
    id: "4",
    name: "Consumer Court",
    code: "CC-RJY",
    location: "Rajahmundry",
    type: "Consumer Court",
    status: "Inactive",
    caseCount: 0,
  },
];

const CourtsScreen = ({
  navigation,
}) => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAdminCourts().then((items) => setCourts(items.map((item) => ({ ...item, name: item.courtName ?? item.name ?? "-", code: item.code ?? "-", location: item.location ?? "-", type: item.type ?? "-", status: item.status ?? "-", caseCount: Array.isArray(item.cases) ? item.cases.length : 0 })))).catch((e) => Alert.alert("Courts unavailable", e.response?.data?.message || "Unable to load courts.")).finally(() => setLoading(false)); }, []);
  const [search, setSearch] =
    useState("");

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [type, setType] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const filteredCourts = useMemo(() => {
    let result = [...courts];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((court) => {
        return (
          court.name
            .toLowerCase()
            .includes(searchValue) ||
          court.code
            .toLowerCase()
            .includes(searchValue) ||
          court.location
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    if (type !== "All") {
      result = result.filter(
        (court) => court.type === type
      );
    }

    if (status !== "All") {
      result = result.filter(
        (court) =>
          court.status === status
      );
    }

    return result;
  }, [
    courts,
    search,
    type,
    status,
  ]);

  const clearFilters = () => {
    setSearch("");
    setType("All");
    setStatus("All");
  };

  return (
    <AppScreen>
      <FlatList
        data={filteredCourts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Courts"
              subtitle="Manage courts used across case records."
              showNotification={false}
            />

            <View style={styles.content}>
              <CourtSearch
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
                    Filter
                  </AppText>
                </Pressable>

                <Pressable
                  onPress={() =>
                    navigation.navigate(
                      "AddCourt"
                    )
                  }
                  style={styles.addButton}
                >
                  <AppText
                    size="sm"
                    weight="semiBold"
                    style={styles.addText}
                  >
                    + Add Court
                  </AppText>
                </Pressable>
              </View>

              <View style={styles.resultRow}>
                <AppText
                  size="sm"
                  color="textSecondary"
                >
                  {filteredCourts.length} courts
                </AppText>

                <AppText
                  size="xs"
                  color="textSecondary"
                >
                  {type !== "All" ||
                  status !== "All"
                    ? "Filters applied"
                    : "All courts"}
                </AppText>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CourtCard
            court={item}
            onPress={() =>
              navigation.navigate(
                "CourtDetails",
                {
                  court: item,
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
              No courts found
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

      <CourtFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        type={type}
        status={status}
        onTypeChange={setType}
        onStatusChange={setStatus}
        onClear={clearFilters}
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
    justifyContent: "space-between",
    alignItems: "center",
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

export default CourtsScreen;
