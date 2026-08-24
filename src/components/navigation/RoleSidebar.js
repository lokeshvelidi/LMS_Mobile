import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

const MENU = {
  client: [
    ["ClientClosedCases", "Closed Cases", "archive-outline"],
    ["ClientHearingSchedule", "Hearing Schedule", "calendar-outline"],
    ["ClientDocuments", "Documents", "document-text-outline"],
    ["ClientBilling", "Billing", "card-outline"],
  ],
  lawyer: [
    ["HearingCalendar", "Hearing Calendar", "calendar-outline"],
    ["Documents", "Documents", "document-text-outline"],
    ["RequestPayment", "Request Payment", "card-outline"],
  ],
  clerk: [
    ["ClerkHearingCalendar", "Hearing Calendar", "calendar-outline"],
    ["ClerkPaymentDesk", "Payment Desk", "card-outline"],
    ["ClerkReports", "Reports", "bar-chart-outline"],
    ["ClerkDocuments", "Documents", "document-text-outline"],
  ],
  admin: [
    ["Hearings", "Hearing Calendar", "calendar-outline"],
    ["Documents", "Documents", "document-text-outline"],
    ["Reports", "Reports", "bar-chart-outline"],
    ["Settings", "Settings", "settings-outline"],
    ["Master", "Master Data", "layers-outline"],
    ["Courts", "Courts", "business-outline"],
  ],
};

const RoleSidebar = ({ role, visible, onClose }) => {
  const navigation = require("@react-navigation/native").useNavigation();
  const { logout } = useAuth();
  const items = MENU[role] || [];

  const open = (route) => {
    onClose?.();
    navigation.navigate(route);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>More screens</Text>
            <Pressable onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={25} color="#18324D" />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.list}>
            {items.map(([route, label, icon]) => (
              <Pressable key={route} style={styles.item} onPress={() => open(route)}>
                <Ionicons name={icon} size={21} color="#18324D" />
                <Text style={styles.itemText}>{label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#718198" />
              </Pressable>
            ))}
          </ScrollView>
          <Pressable
            style={styles.logoutItem}
            onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: logout },
            ])}
          >
            <Ionicons name="log-out-outline" size={21} color="#D9534F" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
};

export const SidebarMenuButton = ({ role }) => {
  const [visible, setVisible] = React.useState(false);
  return <><Pressable onPress={() => setVisible(true)} style={buttonStyles.button} hitSlop={8}><Ionicons name="menu-outline" size={26} color="#18324D" /></Pressable><RoleSidebar role={role} visible={visible} onClose={() => setVisible(false)} /></>;
};

export default RoleSidebar;

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: "row" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  drawer: { width: 285, backgroundColor: "#FFFDF8", paddingTop: 55, paddingHorizontal: 18 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#E5DED0" },
  title: { fontSize: 21, fontWeight: "700", color: "#18324D" },
  list: { paddingTop: 12 },
  item: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 13, paddingHorizontal: 10, borderRadius: 12 },
  itemText: { flex: 1, fontSize: 14, color: "#263B52" },
  logoutItem: { minHeight: 54, flexDirection: "row", alignItems: "center", gap: 13, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: "#E5DED0", marginBottom: 20 },
  logoutText: { flex: 1, fontSize: 14, fontWeight: "600", color: "#D9534F" },
});

const buttonStyles = StyleSheet.create({ button: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#FFFDF8", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E5DED0" } });
