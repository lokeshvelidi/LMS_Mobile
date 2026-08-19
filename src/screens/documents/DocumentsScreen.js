import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import AppButton from "../../components/common/AppButton";

import DocumentCard from "../../components/documents/DocumentCard";
import DocumentSearch from "../../components/documents/DocumentSearch";

import theme from "../../theme/theme";

const DocumentsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const documents = [
    {
      id: "1",
      name: "Property Agreement.pdf",
      type: "pdf",
      caseNumber: "CASE-001",
      date: "12 Aug 2026",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Client Documents.doc",
      type: "word",
      caseNumber: "CASE-002",
      date: "10 Aug 2026",
      size: "1.2 MB",
    },
    {
      id: "3",
      name: "Court Notice.pdf",
      type: "pdf",
      caseNumber: "CASE-003",
      date: "08 Aug 2026",
      size: "890 KB",
    },
  ];

  const filteredDocuments = useMemo(() => {
    const value = search.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesSearch =
        !value ||
        document.name.toLowerCase().includes(value) ||
        document.caseNumber.toLowerCase().includes(value);

      const matchesType =
        selectedType === "all" ||
        document.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [search, selectedType]);

  return (
    <AppScreen>
      <AppHeader
        title="Documents"
        subtitle="Manage your documents"
        showNotification={false}
      />

      <View style={styles.container}>
        <View style={styles.topRow}>
          <AppText size="lg" weight="semiBold">
            Documents
          </AppText>

          <AppButton
            title="Upload"
            onPress={() =>
              navigation.navigate("UploadDocument")
            }
            style={styles.uploadButton}
          />
        </View>

        <DocumentSearch
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filters}>
          {[
            ["all", "All"],
            ["pdf", "PDF"],
            ["word", "DOC"],
            ["image", "Images"],
          ].map(([key, label]) => {
            const active = selectedType === key;

            return (
              <Pressable
                key={key}
                onPress={() => setSelectedType(key)}
                style={[
                  styles.filter,
                  active && styles.activeFilter,
                ]}
              >
                <AppText
                  size="sm"
                  weight={active ? "semiBold" : "medium"}
                  color={active ? "textWhite" : "textSecondary"}
                >
                  {label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <FlatList
          data={filteredDocuments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DocumentCard
              document={item}
              onPress={() =>
                navigation.navigate("DocumentDetails", {
                  document: item,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <AppText size="lg" weight="semiBold">
                No documents found
              </AppText>

              <AppText
                size="sm"
                color="textSecondary"
                style={styles.emptyText}
              >
                Try a different search or filter.
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

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },

  uploadButton: {
    minHeight: 42,
    paddingHorizontal: theme.spacing.lg,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.md,
  },

  filter: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },

  activeFilter: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  list: {
    paddingBottom: theme.spacing.xxl,
  },

  empty: {
    alignItems: "center",
    padding: theme.spacing.xxxl,
  },

  emptyText: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});

export default DocumentsScreen;