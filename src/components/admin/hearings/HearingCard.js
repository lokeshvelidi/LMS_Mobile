import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../../common/AppText";
import HearingStatusBadge from "./HearingStatusBadge";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

const Field = ({ label, value }) => value == null || value === "" ? null : <View style={styles.field}><AppText size="xs" color="textSecondary">{label}</AppText><AppText size="sm" weight="medium" style={styles.value}>{String(value)}</AppText></View>;

const HearingCard = ({ hearing, onPress }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    <View style={styles.icon}><Ionicons name="calendar-outline" size={24} color="#FFFFFF" /></View>
    <View style={styles.content}>
      <View style={styles.header}>
        <AppText size="md" weight="bold" style={styles.purpose}>{hearing.purpose || "Hearing"}</AppText>
        {hearing.status ? <HearingStatusBadge status={hearing.status} /> : null}
      </View>
      <Field label="Hearing date" value={formatDate(hearing.hearingDate)} />
      <Field label="Case number" value={hearing.caseNumber} />
      <Field label="Court / Hall" value={hearing.courtHall} />
      <View style={styles.footer}><AppText size="sm" weight="semiBold" style={styles.view}>View Details ›</AppText></View>
    </View>
  </Pressable>
);

export default HearingCard;

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#FFFDF8", borderWidth: 1, borderColor: "#E6E0D4", borderRadius: 18, padding: 14, marginBottom: 10 },
  pressed: { opacity: 0.75 },
  icon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#102A43", alignItems: "center", justifyContent: "center", marginRight: 14 },
  content: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 },
  purpose: { flex: 1 },
  field: { minHeight: 28, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  value: { maxWidth: "68%", textAlign: "right" },
  footer: { borderTopWidth: 1, borderTopColor: "#E6E0D4", marginTop: 8, paddingTop: 9, alignItems: "flex-end" },
  view: { color: "#102A43" },
});
