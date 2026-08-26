import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";
import { getAdminAdvocates } from "../../../services/api/adminAdvocatesService";
import { getAdminClients } from "../../../services/api/adminClientsService";
import { registerAdminUser } from "../../../services/api/adminUsersService";
import { getApiErrorMessage } from "../../../services/api/authService";

const COLORS = { navy: "#102A43", gold: "#E5B93F", white: "#FFFDF8", secondary: "#61758A", border: "#DED9CE" };
const ROLES = ["Client", "Advocate", "Clerk", "Administrator"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddUserScreen = ({ navigation }) => {
  const [form, setForm] = useState({ appUserName: "", fullName: "", email: "", mobile: "", password: "", role: "Client", linkAdvocateId: 0, linkClientId: 0, sendCredentialsViaEmail: true, sendCredentialsViaSms: true });
  const [advocates, setAdvocates] = useState([]); const [clients, setClients] = useState([]); const [saving, setSaving] = useState(false);
  useEffect(() => { Promise.all([getAdminAdvocates(), getAdminClients()]).then(([a, c]) => { setAdvocates(a); setClients(c); }).catch(() => {}); }, []);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async () => {
    if (!form.appUserName.trim() || !form.email.trim() || !form.password || !form.role || !form.fullName.trim()) return Alert.alert("Validation", "Username, full name, email, password, and role are required.");
    if (!emailPattern.test(form.email.trim())) return Alert.alert("Validation", "Enter a valid email address.");
    if (form.mobile && !/^[0-9+()\-\s]{7,20}$/.test(form.mobile)) return Alert.alert("Validation", "Enter a valid mobile number.");
    if (saving) return; setSaving(true);
    try { await registerAdminUser({ appUserName: form.appUserName.trim(), email: form.email.trim(), password: form.password, role: form.role, fullName: form.fullName.trim(), mobile: form.mobile.trim(), linkAdvocateId: Number(form.linkAdvocateId) || 0, linkClientId: Number(form.linkClientId) || 0, sendCredentialsViaEmail: form.sendCredentialsViaEmail, sendCredentialsViaSms: form.sendCredentialsViaSms }); Alert.alert("User created", "The user was created successfully.", [{ text: "OK", onPress: () => navigation.goBack() }]); } catch (error) { Alert.alert("Create user failed", getApiErrorMessage(error, "Unable to create user.")); } finally { setSaving(false); }
  };
  return <AppScreen><AppHeader title="Add User" subtitle="Create a portal user." showNotification={false} /><ScrollView contentContainerStyle={styles.container}><View style={styles.card}><AppText size="lg" weight="bold">User Information</AppText><Field label="Username" value={form.appUserName} onChangeText={(v) => set("appUserName", v)} autoCapitalize="none" /><Field label="Full Name" value={form.fullName} onChangeText={(v) => set("fullName", v)} /><Field label="Email" value={form.email} onChangeText={(v) => set("email", v)} keyboardType="email-address" autoCapitalize="none" /><Field label="Mobile" value={form.mobile} onChangeText={(v) => set("mobile", v)} keyboardType="phone-pad" /><Field label="Password" value={form.password} onChangeText={(v) => set("password", v)} secureTextEntry autoCapitalize="none" /><Options label="Role" values={ROLES} selected={form.role} onSelect={(v) => set("role", v)} /><Options label="Advocate (optional)" values={[{ id: 0, label: "None" }, ...advocates.map((x) => ({ id: x.advocateId, label: x.name }))]} selected={form.linkAdvocateId} onSelect={(v) => set("linkAdvocateId", v)} /><Options label="Client (optional)" values={[{ id: 0, label: "None" }, ...clients.map((x) => ({ id: x.clientId, label: x.name }))]} selected={form.linkClientId} onSelect={(v) => set("linkClientId", v)} /><Toggle label="Send credentials via email" value={form.sendCredentialsViaEmail} onPress={() => set("sendCredentialsViaEmail", !form.sendCredentialsViaEmail)} /><Toggle label="Send credentials via SMS" value={form.sendCredentialsViaSms} onPress={() => set("sendCredentialsViaSms", !form.sendCredentialsViaSms)} /></View><Pressable disabled={saving} onPress={submit} style={[styles.button, saving && { opacity: 0.6 }]}><AppText style={{ color: COLORS.white }} weight="semiBold">{saving ? "Creating..." : "Create User"}</AppText></Pressable></ScrollView></AppScreen>;
};
const Field = ({ label, value, onChangeText, ...props }) => <View style={styles.field}><AppText weight="semiBold" style={styles.label}>{label}</AppText><TextInput value={value} onChangeText={onChangeText} placeholderTextColor={COLORS.secondary} style={styles.input} {...props} /></View>;
const Options = ({ label, values, selected, onSelect }) => <View style={styles.field}><AppText weight="semiBold" style={styles.label}>{label}</AppText><View style={styles.options}>{values.map((item) => { const option = typeof item === "string" ? { id: item, label: item } : item; return <Pressable key={String(option.id)} onPress={() => onSelect(option.id)} style={[styles.option, selected === option.id && styles.active]}><AppText style={{ color: selected === option.id ? COLORS.navy : COLORS.secondary }}>{option.label}</AppText></Pressable>; })}</View></View>;
const Toggle = ({ label, value, onPress }) => <Pressable onPress={onPress} style={styles.toggle}><Ionicons name={value ? "checkbox" : "square-outline"} size={22} color={value ? COLORS.navy : COLORS.secondary} /><AppText>{label}</AppText></Pressable>;
const styles = StyleSheet.create({ container: { padding: 18, paddingBottom: 35 }, card: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, padding: 18 }, field: { marginTop: 18 }, label: { color: COLORS.navy, marginBottom: 8 }, input: { height: 48, borderWidth: 1, borderColor: COLORS.border, borderRadius: 13, paddingHorizontal: 14, color: COLORS.navy }, options: { flexDirection: "row", flexWrap: "wrap" }, option: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, marginRight: 8, marginBottom: 8 }, active: { backgroundColor: COLORS.gold, borderColor: COLORS.gold }, toggle: { flexDirection: "row", gap: 10, alignItems: "center", marginTop: 16 }, button: { height: 50, borderRadius: 14, backgroundColor: COLORS.navy, alignItems: "center", justifyContent: "center", marginTop: 18 } });
export default AddUserScreen;
