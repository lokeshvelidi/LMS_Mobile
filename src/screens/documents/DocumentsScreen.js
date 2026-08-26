import React, { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";
import AppButton from "../../components/common/AppButton";
import DocumentCard from "../../components/documents/DocumentCard";
import DocumentSearch from "../../components/documents/DocumentSearch";
import { getDocuments } from "../../services/api/documentsService";
import { getApiErrorMessage } from "../../services/api/authService";
import theme from "../../theme/theme";

const DocumentsScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState([]); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(() => { setLoading(true); setError(""); getDocuments().then(setDocuments).catch((e) => { setDocuments([]); setError(getApiErrorMessage(e, "Unable to load documents.")); }).finally(() => setLoading(false)); }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  const filtered = useMemo(() => { const q = search.trim().toLowerCase(); return documents.filter((item) => !q || [item.name, item.type, item.caseNumber].filter(Boolean).some((value) => String(value).toLowerCase().includes(q))); }, [documents, search]);
  return <AppScreen><AppHeader title="Documents" subtitle="Manage your documents" showNotification={false} /><View style={styles.container}><View style={styles.topRow}><AppText size="lg" weight="semiBold">Documents</AppText><AppButton title="Upload Document" onPress={() => navigation.navigate("UploadDocument")} /></View><DocumentSearch value={search} onChangeText={setSearch} /><FlatList data={filtered} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => <DocumentCard document={item} onPress={() => navigation.navigate("DocumentDetails", { documentId: item.id })} />} contentContainerStyle={styles.list} ListEmptyComponent={<View style={styles.empty}><AppText size="lg" weight="semiBold">{loading ? "Loading documents..." : error || "No documents found"}</AppText>{error ? <Pressable onPress={load}><AppText style={styles.retry}>Retry</AppText></Pressable> : null}</View>} /></View></AppScreen>;
};
const styles = StyleSheet.create({ container: { flex: 1, padding: theme.spacing.lg }, topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: theme.spacing.lg }, list: { paddingBottom: theme.spacing.xxl }, empty: { alignItems: "center", padding: theme.spacing.xxxl }, retry: { color: theme.colors.primary, marginTop: 12 } });
export default DocumentsScreen;
