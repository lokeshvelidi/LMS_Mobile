import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

const ClientHearingDetailsScreen = ({route}) => {
  const hearing = route?.params?.hearing || {};
  const rows = [
    ["Hearing ID", hearing.id],
    ["Case ID", hearing.caseId],
    ["Case Number", hearing.docketNo],
    ["Hearing Date", hearing.date],
    ["Hearing Time", hearing.time],
    ["Purpose", hearing.purpose],
    ["Court Hall", hearing.courtroom],
    ["Status", hearing.status],
  ].filter(([, value]) => value != null && value !== "");

  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Hearing Details</Text>
    {rows.map(([label, value]) => <View key={label} style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{String(value)}</Text></View>)}
    {!rows.length && <Text style={styles.empty}>No hearing details are available.</Text>}
  </ScrollView>;
};

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: "#F5F2EA", flexGrow: 1},
  title: {fontSize: 28, fontWeight: "700", color: "#19324D", marginBottom: 18},
  row: {padding: 15, borderBottomWidth: 1, borderBottomColor: "#DED9CE", backgroundColor: "#FFFDF8"},
  label: {fontSize: 11, color: "#718198", fontWeight: "700", textTransform: "uppercase"},
  value: {marginTop: 5, fontSize: 15, color: "#263A50"},
  empty: {color: "#718198"},
});

export default ClientHearingDetailsScreen;
