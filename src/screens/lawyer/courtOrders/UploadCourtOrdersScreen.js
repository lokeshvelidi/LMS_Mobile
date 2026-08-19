import React, { useEffect, useState } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../../components/common/AppText";

import CourtOrderCaseSelector from "../../../components/lawyer/courtOrders/CourtOrderCaseSelector";

import CourtOrderList from "../../../components/lawyer/courtOrders/CourtOrderList";

import CourtOrderUpload from "../../../components/lawyer/courtOrders/CourtOrderUpload";
import { getApiErrorMessage } from "../../../services/api/authService";
import { getLawyerCaseDocuments, getLawyerCases, uploadLawyerCourtOrder } from "../../../services/api/lawyerService";

const COLORS = {
  background: "#F3F0E8",
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const UploadCourtOrdersScreen = ({
  route,
}) => {
  const [cases, setCases] = useState([]);

  const initialCase =
    route?.params?.caseData ||
    null;

  const [
    selectedCase,
    setSelectedCase,
  ] = useState(initialCase);

  const [orders, setOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  useEffect(() => { getLawyerCases().then((items) => { setCases(items); setSelectedCase((current) => current ?? route?.params?.caseData ?? items[0] ?? null); }).catch((e) => Alert.alert("Cases unavailable", getApiErrorMessage(e))); }, []);
  useEffect(() => { if (selectedCase?.id) getLawyerCaseDocuments(selectedCase.id).then(setOrders).catch((e) => Alert.alert("Documents unavailable", getApiErrorMessage(e))); }, [selectedCase?.id]);

  const handleCaseSelect = (item) => {
    setSelectedCase(item);
  };

  const handleUpload = async ({ file, description }) => {
    if (!selectedCase?.id || !file?.uri) return Alert.alert("Upload unavailable", "Select a case and document first.");
    setUploading(true);
    try { await uploadLawyerCourtOrder({ caseId: selectedCase.id, orderType: "Court Order", orderDate: new Date().toISOString(), remarks: description, file }); Alert.alert("Court Order", "Court order uploaded successfully."); setOrders(await getLawyerCaseDocuments(selectedCase.id)); }
    catch (e) { Alert.alert("Upload failed", getApiErrorMessage(e, "Unable to upload court order.")); }
    finally { setUploading(false); }
  };

  const handleOrderPress = (
    order
  ) => {
    Alert.alert(order.name, "Download this document from the Lawyer Documents screen.");
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          COLORS.background
        }
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.header}>
          <AppText
            size="xxl"
            weight="bold"
            style={styles.title}
          >
            Upload Court Orders
          </AppText>

          <AppText
            size="sm"
            color="textSecondary"
            style={styles.subtitle}
          >
            Upload and manage court orders
            for your assigned cases.
          </AppText>
        </View>

        <CourtOrderCaseSelector
          cases={cases}
          selectedCase={selectedCase}
          onSelectCase={
            handleCaseSelect
          }
        />

        {selectedCase && (
          <View style={styles.selectedCase}>
            <AppText
              size="xs"
              weight="semiBold"
              style={styles.label}
            >
              SELECTED CASE
            </AppText>

            <AppText
              size="md"
              weight="bold"
              style={styles.caseNumber}
            >
              {selectedCase.caseNumber}
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.client}
            >
              {selectedCase.client}
            </AppText>
          </View>
        )}

        <CourtOrderUpload
          onUpload={handleUpload}
        />

        <CourtOrderList
          orders={orders}
          onOrderPress={
            handleOrderPress
          }
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 37,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    color: COLORS.navy,
    fontSize: 30,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },

  selectedCase: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 1,
  },

  caseNumber: {
    color: COLORS.navy,
    marginTop: 5,
  },

  client: {
    marginTop: 3,
  },

  bottomSpace: {
    height: 30,
  },
});

export default UploadCourtOrdersScreen;
