import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getClientCaseDetails } from "../../../services/api/clientCasesService";
import { getApiErrorMessage } from "../../../services/api/authService";

const ClientCaseDetailsScreen = ({ navigation, route }) => {
  const caseId = route.params?.caseId;
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCase = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setCaseDetails(await getClientCaseDetails(caseId));
    } catch (requestError) {
      setCaseDetails(null);
      setError(getApiErrorMessage(requestError, "Unable to load case details."));
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    loadCase();
  }, [loadCase]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <Text style={styles.pageTitle}>Case Details</Text>
      <Text style={styles.pageDescription}>
        View the latest information available for your case.
      </Text>

      {loading ? (
        <StateContainer>
          <ActivityIndicator size="large" color="#172F4D" />
          <Text style={styles.stateText}>Loading case details...</Text>
        </StateContainer>
      ) : error ? (
        <StateContainer>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadCase}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </StateContainer>
      ) : !caseDetails ? (
        <StateContainer>
          <Text style={styles.stateText}>Case details were not found.</Text>
        </StateContainer>
      ) : (
        <>
          <View style={styles.heroCard}>
            <View style={styles.heroText}>
              <Text style={styles.caseNumber}>{caseDetails.caseNumber}</Text>
              <Text style={styles.caseTitle}>{caseDetails.caseTitle}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{caseDetails.status}</Text>
            </View>
          </View>

          <DetailCard title="Case Information">
            <InfoRow label="Case Type" value={caseDetails.caseType} />
            <InfoRow label="Stage" value={caseDetails.stage} />
            <InfoRow label="Priority" value={caseDetails.priority} />
            <InfoRow label="Filing Date" value={caseDetails.filingDate} />
            <InfoRow label="Next Hearing" value={caseDetails.nextHearingDate} last />
          </DetailCard>

          <DetailCard title="Lawyer and Court">
            <InfoRow label="Lawyer" value={caseDetails.lawyerName} />
            <InfoRow label="Lawyer Mobile" value={caseDetails.lawyerMobile} />
            <InfoRow label="Court" value={caseDetails.courtName} />
            <InfoRow label="Judge" value={caseDetails.judgeName} last />
          </DetailCard>

          <DetailCard title="Activity Timeline">
            {caseDetails.timeline.length ? caseDetails.timeline.map((event, index) => (
              <View
                key={event.id}
                style={[styles.timelineItem, index < caseDetails.timeline.length - 1 && styles.rowBorder]}
              >
                <View style={styles.timelineTop}>
                  <Text style={styles.timelineTitle}>{event.title}</Text>
                  <Text style={styles.timelineType}>{event.type}</Text>
                </View>
                <Text style={styles.timelineDate}>{event.date}</Text>
                <Text style={styles.timelineDescription}>{event.description}</Text>
              </View>
            )) : (
              <Text style={styles.stateText}>No case activity is available.</Text>
            )}
          </DetailCard>

          <View style={styles.summaryRow}>
            <SummaryCard label="Hearings" value={caseDetails.hearings.length} />
            <SummaryCard label="Documents" value={caseDetails.documents.length} />
            <SummaryCard label="Invoices" value={caseDetails.invoices.length} />
            <SummaryCard label="Payments" value={caseDetails.payments.length} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const StateContainer = ({ children }) => <View style={styles.stateContainer}>{children}</View>;

const DetailCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

const InfoRow = ({ label, value, last = false }) => (
  <View style={[styles.infoRow, !last && styles.rowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const SummaryCard = ({ label, value }) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#D9DEE0" },
  content: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 110 },
  backButton: { alignSelf: "flex-start", marginBottom: 14 },
  backText: { fontSize: 15, fontWeight: "600", color: "#172F4D" },
  pageTitle: { fontSize: 32, lineHeight: 48, fontWeight: "700", color: "#172F4D" },
  pageDescription: { fontSize: 16, lineHeight: 24, color: "#627A96", marginBottom: 24 },
  heroCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 14, backgroundColor: "#FFFDF8", borderWidth: 1, borderColor: "#EEE9DE", borderRadius: 20, padding: 22, marginBottom: 18 },
  heroText: { flex: 1 },
  caseNumber: { fontSize: 13, fontWeight: "700", color: "#2F66E5" },
  caseTitle: { marginTop: 5, fontSize: 21, lineHeight: 28, fontWeight: "700", color: "#172E49" },
  statusBadge: { minHeight: 36, paddingHorizontal: 15, borderRadius: 8, borderWidth: 2, borderColor: "#6C50D9", backgroundColor: "#FBF9FF", alignItems: "center", justifyContent: "center" },
  statusText: { fontSize: 12, fontWeight: "700", color: "#654CC4" },
  card: { backgroundColor: "#FFFDF8", borderWidth: 1, borderColor: "#EEE9DE", borderRadius: 20, padding: 22, marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#18324D" },
  cardContent: { marginTop: 14 },
  infoRow: { minHeight: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#ECE7DE" },
  infoLabel: { fontSize: 14, color: "#627A96" },
  infoValue: { maxWidth: "58%", fontSize: 14, fontWeight: "600", color: "#263A50", textAlign: "right" },
  timelineItem: { paddingVertical: 14 },
  timelineTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  timelineTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#263A50" },
  timelineType: { fontSize: 11, fontWeight: "700", color: "#654CC4" },
  timelineDate: { marginTop: 5, fontSize: 12, color: "#71839A" },
  timelineDescription: { marginTop: 5, fontSize: 13, lineHeight: 19, color: "#435971" },
  summaryRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  summaryCard: { flexGrow: 1, flexBasis: 130, minHeight: 88, borderRadius: 16, borderWidth: 1, borderColor: "#EEE9DE", backgroundColor: "#FFFDF8", padding: 16 },
  summaryLabel: { fontSize: 11, fontWeight: "700", color: "#71839A", textTransform: "uppercase" },
  summaryValue: { marginTop: 8, fontSize: 24, fontWeight: "700", color: "#19324D" },
  stateContainer: { minHeight: 240, borderRadius: 20, borderWidth: 1, borderColor: "#EEE9DE", backgroundColor: "#FFFDF8", alignItems: "center", justifyContent: "center", gap: 12, padding: 28 },
  stateText: { fontSize: 15, color: "#74879C", textAlign: "center" },
  errorText: { fontSize: 15, color: "#B33A3A", textAlign: "center" },
  retryButton: { minWidth: 72, height: 38, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: "#DDE2E7", backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  retryText: { fontSize: 14, fontWeight: "600", color: "#172E49" },
});

export default ClientCaseDetailsScreen;
