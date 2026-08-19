import React, {
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import AppHeader from "../../components/layout/AppHeader";
import AppScreen from "../../components/layout/AppScreen";
import AppText from "../../components/common/AppText";

import CaseCard from "../../components/cases/CaseCard";
import CaseSearch from "../../components/cases/CaseSearch";
import CaseFilter from "../../components/cases/CaseFilter";

import theme from "../../theme/theme";

const CasesScreen = ({
  navigation,
}) => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("all");

  const cases = [
    {
      id: "1",
      title: "Property Dispute",
      caseNumber: "CASE-001",
      clientName: "Client Name",
      court: "District Court",
      status: "active",
      nextHearing: "20 Aug 2026",
    },
    {
      id: "2",
      title: "Civil Matter",
      caseNumber: "CASE-002",
      clientName: "Client Name",
      court: "High Court",
      status: "pending",
      nextHearing: "25 Aug 2026",
    },
    {
      id: "3",
      title: "Contract Dispute",
      caseNumber: "CASE-003",
      clientName: "Client Name",
      court: "District Court",
      status: "closed",
      nextHearing: null,
    },
  ];

  const filteredCases = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return cases.filter((caseItem) => {
      const matchesSearch =
        !searchValue ||
        caseItem.title
          .toLowerCase()
          .includes(searchValue) ||
        caseItem.caseNumber
          .toLowerCase()
          .includes(searchValue) ||
        caseItem.clientName
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        selectedFilter === "all" ||
        caseItem.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  return (
    <AppScreen>
      <AppHeader
        title="Cases"
        subtitle="Manage your cases"
        showNotification={false}
      />

      <View style={styles.container}>
        <CaseSearch
          value={search}
          onChangeText={setSearch}
        />

        <CaseFilter
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />

        <View style={styles.resultHeader}>
          <AppText
            size="sm"
            color="textSecondary"
          >
            {filteredCases.length}{" "}
            {filteredCases.length === 1
              ? "case"
              : "cases"}
          </AppText>
        </View>

        <FlatList
          data={filteredCases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CaseCard
              caseItem={item}
              onPress={() =>
                navigation.navigate(
                  "CaseDetails",
                  {
                    caseId: item.id,
                    caseItem: item,
                  }
                )
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredCases.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText
                size="lg"
                weight="semiBold"
              >
                No cases found
              </AppText>

              <AppText
                size="sm"
                color="textSecondary"
                style={styles.emptyText}
              >
                Try changing your search or filter.
              </AppText>
            </View>
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },

  resultHeader: {
    marginBottom: theme.spacing.md,
  },

  list: {
    paddingBottom: theme.spacing.xxl,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    padding: theme.spacing.xxl,
  },

  emptyText: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});

export default CasesScreen;