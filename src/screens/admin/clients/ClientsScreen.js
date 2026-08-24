import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, TextInput, View } from "react-native";
import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";
import { getAdminClients } from "../../../services/api/adminClientsService";

const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const load = useCallback(() => { setLoading(true); getAdminClients().then(setClients).catch((e) => Alert.alert("Clients unavailable", e.response?.data?.message || "Unable to load clients.")).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  const filtered = useMemo(() => clients.filter((item) => `${item.name} ${item.email} ${item.mobile}`.toLowerCase().includes(search.toLowerCase())), [clients, search]);
  return <AppScreen><FlatList data={filtered} keyExtractor={(item) => String(item.clientId)} contentContainerStyle={{ padding: 18 }} ListHeaderComponent={<><AppHeader title="Clients" subtitle="Manage client records." showNotification={false} /><TextInput value={search} onChangeText={setSearch} placeholder="Search clients..." style={{ height: 46, borderWidth: 1, borderColor: "#DED9CE", borderRadius: 13, paddingHorizontal: 12, marginBottom: 14 }} /><Pressable onPress={() => navigation.navigate("AdminAddClient", { onSaved: load })} style={{ backgroundColor: "#102A43", padding: 14, borderRadius: 12, marginBottom: 14 }}><AppText style={{ color: "white", textAlign: "center" }}>+ Add Client</AppText></Pressable></>} renderItem={({ item }) => <Pressable onPress={() => navigation.navigate("AdminClientDetails", { clientId: item.clientId, onChanged: load })} style={{ backgroundColor: "#FFFDF8", borderWidth: 1, borderColor: "#DED9CE", borderRadius: 16, padding: 16, marginBottom: 10 }}><AppText weight="bold">{item.name}</AppText><AppText size="sm" color="textSecondary">{item.email}</AppText><AppText size="sm" color="textSecondary">{item.mobile}</AppText></Pressable>} ListEmptyComponent={<AppText color="textSecondary">{loading ? "Loading clients..." : "No clients found."}</AppText>} /></AppScreen>;
};
export default ClientsScreen;
