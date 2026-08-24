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
import { getAdminCourts } from "../../../services/api/adminCourtsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

const CourtsScreen = ({
  navigation,
}) => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { getAdminCourts().then(setCourts).catch((e) => setError(e.response?.data?.message || "Unable to load courts.")).finally(() => setLoading(false)); }, []);
  const [search, setSearch] =
    useState("");

  const filteredCourts = useMemo(() => {
    let result = [...courts];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((court) => {
        return (
          String(court.courtName || "")
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    return result;
  }, [
    courts,
    search,
  ]);

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
                  {search.trim() ? "Search results" : "All courts"}
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
              {loading ? "Loading courts..." : error || "No courts found."}
            </AppText>
          </View>
        }
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
