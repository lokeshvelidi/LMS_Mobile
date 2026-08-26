import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { getClientCases } from "../../../services/api/clientCasesService";
import {
  downloadClientDocument,
  getClientDocuments,
  uploadClientDocument,
} from "../../../services/api/clientDocumentsService";
import { getApiErrorMessage } from "../../../services/api/authService";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";

const ClientDocumentsScreen = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([
      getClientDocuments(),
      getClientCases({ page: 1, pageSize: 100, search: "", sortBy: "docket", sortOrder: "asc" }),
    ]).then(([documentItems, caseResult]) => {
      if (!active) return;
      setDocuments(documentItems);
      setCases(caseResult.items);
    }).catch((requestError) => {
      if (!active) return;
      setDocuments([]);
      setError(getApiErrorMessage(requestError, "Unable to load documents."));
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (document) =>
          document.name.toLowerCase().includes(query) ||
          document.caseNo.toLowerCase().includes(query) ||
          document.type.toLowerCase().includes(query)
      );
    }

    if (type !== "All") {
      result = result.filter(
        (document) => document.type === type
      );
    }

    if (status !== "All") {
      result = result.filter(
        (document) => document.status === status
      );
    }

    return result;
  }, [documents, search, type, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocuments.length / rowsPerPage)
  );

  const visibleDocuments = filteredDocuments.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNext = () => {
    setPage((current) => Math.min(totalPages, current + 1));
  };

  const handleView = async (document) => {
    try {
      const result = await downloadClientDocument(document.id);
      if (!(await Linking.canOpenURL(result.uri))) throw new Error("No app can open this document.");
      await Linking.openURL(result.uri);
    } catch (requestError) {
      Alert.alert("Unable to open document", getApiErrorMessage(requestError));
    }
  };

  const handleDownload = async (document) => {
    try {
      const result = await downloadClientDocument(document.id);
      Alert.alert("Download complete", `Document saved to ${result.uri}`);
    } catch (requestError) {
      Alert.alert("Download failed", getApiErrorMessage(requestError));
    }
  };

  const handleChooseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (!result.canceled) setSelectedFile(result.assets[0]);
  };

  const handleUpload = async () => {
    if (!cases[0]?.caseId || !selectedFile) {
      Alert.alert("Missing information", "Select a file before uploading.");
      return;
    }
    setUploading(true);
    try {
      await uploadClientDocument({
        caseId: cases[0].caseId,
        documentType: "Supporting Document",
        remarks: "",
        file: selectedFile,
      });
      setSelectedFile(null);
      setShowUpload(false);
      setPage(1);
      setReloadKey((value) => value + 1);
    } catch (requestError) {
      Alert.alert("Upload failed", getApiErrorMessage(requestError));
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE HEADER */}
      <View
        style={[
          styles.pageHeader,
          isMobile && styles.pageHeaderMobile,
        ]}
      >
        <View style={styles.headingContent}>
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>Documents</Text>
            <SidebarMenuButton role="client" />
          </View>

          <Text style={styles.pageDescription}>
            View and manage documents associated with your cases.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.uploadButton,
            pressed && styles.uploadButtonPressed,
            isMobile && styles.uploadButtonMobile,
          ]}
          onPress={() => setShowUpload(true)}
        >
          <Text style={styles.uploadButtonText}>
            + Upload Document
          </Text>
        </Pressable>
      </View>

      {/* FILTER PANEL */}
      <View
        style={[
          styles.filterPanel,
          isMobile && styles.filterPanelMobile,
        ]}
      >
        {/* SEARCH */}
        <View
          style={[
            styles.searchContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search documents..."
            placeholderTextColor="#8B9BB0"
            style={styles.searchInput}
          />
        </View>

        {/* TYPE */}
        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {type === "All" ? "All Types" : type}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (type === "All") {
                handleTypeChange("Petition");
              } else if (type === "Petition") {
                handleTypeChange("Identity");
              } else if (type === "Identity") {
                handleTypeChange("Supporting");
              } else {
                handleTypeChange("All");
              }
            }}
          />
        </View>

        {/* STATUS */}
        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {status === "All" ? "All Statuses" : status}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (status === "All") {
                handleStatusChange("Approved");
              } else if (status === "Approved") {
                handleStatusChange("Pending");
              } else {
                handleStatusChange("All");
              }
            }}
          />
        </View>

        {/* ROWS */}
        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {rowsPerPage} rows
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() =>
              handleRowsChange(rowsPerPage === 10 ? 20 : 10)
            }
          />
        </View>
      </View>

      {/* DOCUMENT LIST */}
      <View style={styles.documentsPanel}>
        {loading ? (
          <View style={styles.emptyState}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.emptyText}>Loading documents...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>{error}</Text><Pressable style={styles.actionButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.actionButtonText}>Retry</Text></Pressable></View>
        ) : visibleDocuments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No documents found.
            </Text>
          </View>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            {!isMobile && (
              <View style={styles.table}>
                {/* HEADER */}
                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.documentColumn,
                    ]}
                  >
                    DOCUMENT
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.caseColumn,
                    ]}
                  >
                    CASE
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.typeColumn,
                    ]}
                  >
                    TYPE
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.uploadedColumn,
                    ]}
                  >
                    UPLOADED
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.sizeColumn,
                    ]}
                  >
                    SIZE
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.statusColumn,
                    ]}
                  >
                    STATUS
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderText,
                      styles.actionsColumn,
                    ]}
                  >
                    ACTIONS
                  </Text>
                </View>

                {/* ROWS */}
                {visibleDocuments.map((document) => (
                  <View
                    key={document.id}
                    style={styles.tableRow}
                  >
                    <View
                      style={[
                        styles.documentColumn,
                        styles.documentCell,
                      ]}
                    >
                      <View style={styles.fileIcon}>
                        <Text style={styles.fileIconText}>
                          PDF
                        </Text>
                      </View>

                      <View style={styles.documentInfo}>
                        <Text
                          style={styles.documentName}
                          numberOfLines={1}
                        >
                          {document.name}
                        </Text>

                        <Text style={styles.documentId}>
                          {document.id}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.cellText,
                        styles.caseColumn,
                      ]}
                    >
                      {document.caseNo}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.typeColumn,
                      ]}
                    >
                      {document.type}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.uploadedColumn,
                      ]}
                    >
                      {document.uploaded}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.sizeColumn,
                      ]}
                    >
                      {document.size}
                    </Text>

                    <View
                      style={[
                        styles.statusColumn,
                        styles.statusCell,
                      ]}
                    >
                      <View
                        style={[
                          styles.statusBadge,
                          document.status === "Approved"
                            ? styles.approvedBadge
                            : styles.pendingBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            document.status === "Approved"
                              ? styles.approvedText
                              : styles.pendingText,
                          ]}
                        >
                          {document.status}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.actionsColumn,
                        styles.actionsCell,
                      ]}
                    >
                      <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                          handleView(document)
                        }
                      >
                        <Text style={styles.actionText}>
                          View
                        </Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                          handleDownload(document)
                        }
                      >
                        <Text style={styles.actionText}>
                          Download
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* MOBILE CARDS */}
            {isMobile &&
              visibleDocuments.map((document) => (
                <View
                  key={document.id}
                  style={styles.documentCard}
                >
                  <View style={styles.mobileDocumentTop}>
                    <View style={styles.mobileDocumentTitle}>
                      <View style={styles.fileIcon}>
                        <Text style={styles.fileIconText}>
                          PDF
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.documentName}>
                          {document.name}
                        </Text>

                        <Text style={styles.documentId}>
                          {document.id}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        document.status === "Approved"
                          ? styles.approvedBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          document.status === "Approved"
                            ? styles.approvedText
                            : styles.pendingText,
                        ]}
                      >
                        {document.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mobileDetails}>
                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Case
                      </Text>
                      <Text style={styles.mobileValue}>
                        {document.caseNo}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Type
                      </Text>
                      <Text style={styles.mobileValue}>
                        {document.type}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Uploaded
                      </Text>
                      <Text style={styles.mobileValue}>
                        {document.uploaded}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Size
                      </Text>
                      <Text style={styles.mobileValue}>
                        {document.size}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mobileActions}>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() => handleView(document)}
                    >
                      <Text style={styles.actionText}>
                        View
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.actionButton}
                      onPress={() =>
                        handleDownload(document)
                      }
                    >
                      <Text style={styles.actionText}>
                        Download
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
          </>
        )}
      </View>

      {/* PAGINATION */}
      <View
        style={[
          styles.pagination,
          isMobile && styles.paginationMobile,
        ]}
      >
        <Text style={styles.documentCount}>
          {filteredDocuments.length} documents
        </Text>

        <Pressable
          onPress={handlePrevious}
          disabled={page === 1}
          style={[
            styles.paginationButton,
            page === 1 && styles.paginationDisabled,
          ]}
        >
          <Text
            style={[
              styles.paginationButtonText,
              page === 1 && styles.paginationDisabledText,
            ]}
          >
            Prev
          </Text>
        </Pressable>

        <Text style={styles.pageNumber}>
          Page {page} / {totalPages}
        </Text>

        <Pressable
          onPress={handleNext}
          disabled={page === totalPages}
          style={[
            styles.paginationButton,
            page === totalPages && styles.paginationDisabled,
          ]}
        >
          <Text
            style={[
              styles.paginationButtonText,
              page === totalPages &&
                styles.paginationDisabledText,
            ]}
          >
            Next
          </Text>
        </Pressable>
      </View>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <View style={styles.overlay}>
          <View
            style={[
              styles.uploadModal,
              isMobile && styles.uploadModalMobile,
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Upload Document
                </Text>

                <Text style={styles.modalDescription}>
                  Upload a document and associate it with one
                  of your cases.
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setShowUpload(false)}
              >
                <Text style={styles.closeButtonText}>
                  ×
                </Text>
              </Pressable>
            </View>

            {/* CASE */}
            <Text style={styles.formLabel}>
              CASE
            </Text>

            <View style={styles.formSelect}>
              <Text style={styles.formSelectText}>
                {cases[0]?.docketNo || "No case available"}
              </Text>

              <Text style={styles.formArrow}>
                ⌄
              </Text>
            </View>

            {/* TYPE */}
            <Text style={styles.formLabel}>
              TYPE
            </Text>

            <View style={styles.formSelect}>
              <Text style={styles.formSelectText}>
                Supporting Document
              </Text>

              <Text style={styles.formArrow}>
                ⌄
              </Text>
            </View>

            {/* FILE */}
            <Text style={styles.formLabel}>
              FILE
            </Text>

            <Pressable style={styles.fileUploadBox} onPress={handleChooseFile}>
              <Text style={styles.fileUploadIcon}>
                +
              </Text>

              <View>
                <Text style={styles.fileUploadTitle}>
                  {selectedFile?.name || "Choose a file"}
                </Text>

                <Text style={styles.fileUploadDescription}>
                  PDF, JPG, PNG or DOCX • Maximum 10 MB
                </Text>
              </View>
            </Pressable>

            {/* BUTTONS */}
            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowUpload(false)}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalUploadButton}
                onPress={handleUpload}
                disabled={uploading}
              >
                <Text style={styles.modalUploadButtonText}>
                  {uploading ? "Uploading..." : "Upload Document"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },

  /* =========================
     HEADER
  ========================= */

  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },

  pageHeaderMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  headingContent: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  pageDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#627A96",
  },

  /* =========================
     UPLOAD BUTTON
  ========================= */

  uploadButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 23,
    backgroundColor: "#16324F",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#102940",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },

  uploadButtonMobile: {
    alignSelf: "flex-start",
    marginTop: 16,
  },

  uploadButtonPressed: {
    backgroundColor: "#244665",
  },

  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  /* =========================
     FILTER
  ========================= */

  filterPanel: {
    minHeight: 98,
    width: "100%",

    backgroundColor: "rgba(255, 253, 248, 0.96)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    paddingHorizontal: 24,
    paddingVertical: 25,

    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,

    marginBottom: 20,
  },

  filterPanelMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  searchContainer: {
    width: 245,
    height: 44,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
  },

  searchInput: {
    height: 42,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#243A52",
  },

  selectContainer: {
    width: 175,
    height: 44,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    paddingHorizontal: 15,
  },

  selectText: {
    fontSize: 14,
    color: "#253B54",
  },

  arrow: {
    position: "absolute",
    right: 14,
    top: 9,
    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     DOCUMENT PANEL
  ========================= */

  documentsPanel: {
    width: "100%",

    backgroundColor: "rgba(255, 253, 248, 0.97)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    padding: 0,

    overflow: "hidden",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,

    marginBottom: 14,
  },

  /* =========================
     TABLE
  ========================= */

  table: {
    width: "100%",
  },

  tableHeader: {
    minHeight: 54,
    backgroundColor: "#F5F0E5",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#637791",
    letterSpacing: 0.8,
  },

  tableRow: {
    minHeight: 82,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
    backgroundColor: "#FFFDF9",
  },

  documentColumn: {
    flex: 2.2,
  },

  caseColumn: {
    flex: 1.15,
  },

  typeColumn: {
    flex: 0.9,
  },

  uploadedColumn: {
    flex: 1.15,
  },

  sizeColumn: {
    flex: 0.7,
  },

  statusColumn: {
    flex: 1,
  },

  actionsColumn: {
    flex: 1.5,
  },

  documentCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },

  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  documentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D344E",
    marginBottom: 4,
  },

  documentId: {
    fontSize: 12,
    color: "#8292A4",
  },

  fileIcon: {
    width: 42,
    height: 46,

    borderRadius: 8,
    backgroundColor: "#F4E9CB",

    alignItems: "center",
    justifyContent: "center",
  },

  fileIconText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#795F27",
  },

  cellText: {
    fontSize: 13,
    color: "#3E536A",
  },

  statusCell: {
    alignItems: "flex-start",
  },

  statusBadge: {
    minWidth: 74,
    height: 30,

    paddingHorizontal: 10,
    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",
  },

  approvedBadge: {
    backgroundColor: "#E8F5EC",
  },

  pendingBadge: {
    backgroundColor: "#FFF2D6",
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  approvedText: {
    color: "#25834A",
  },

  pendingText: {
    color: "#9A701D",
  },

  actionsCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  actionButton: {
    height: 36,
    paddingHorizontal: 12,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#253B54",
  },

  /* =========================
     MOBILE
  ========================= */

  documentCard: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  mobileDocumentTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  mobileDocumentTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  mobileDetails: {
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ECEAE4",
  },

  mobileDetail: {
    flexDirection: "row",
    marginBottom: 7,
  },

  mobileLabel: {
    width: 80,
    fontSize: 12,
    color: "#8292A4",
  },

  mobileValue: {
    flex: 1,
    fontSize: 13,
    color: "#344B63",
  },

  mobileActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },

  /* =========================
     EMPTY
  ========================= */

  emptyState: {
    minHeight: 220,

    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#74879C",
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 12,
    paddingTop: 4,
  },

  paginationMobile: {
    justifyContent: "center",
    flexWrap: "wrap",
  },

  documentCount: {
    fontSize: 14,
    color: "#637891",
    marginRight: 4,
  },

  paginationButton: {
    minWidth: 58,
    height: 38,
    paddingHorizontal: 14,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#243A52",
  },

  paginationDisabled: {
    backgroundColor: "#F7F7F6",
    borderColor: "#E6E5E2",
  },

  paginationDisabledText: {
    color: "#A3AAB2",
  },

  pageNumber: {
    fontSize: 14,
    color: "#334960",
  },

  /* =========================
     UPLOAD OVERLAY
  ========================= */

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(12, 29, 47, 0.48)",

    alignItems: "center",
    justifyContent: "center",

    padding: 24,
  },

  uploadModal: {
    width: "min(600px, 100%)",

    backgroundColor: "#FFFDF9",
    borderRadius: 22,

    padding: 28,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 10,
  },

  uploadModalMobile: {
    width: "100%",
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginBottom: 24,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  modalDescription: {
    maxWidth: 470,
    fontSize: 14,
    lineHeight: 21,
    color: "#657A92",
  },

  closeButton: {
    width: 36,
    height: 36,

    borderRadius: 18,
    backgroundColor: "#F1F1EF",

    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    fontSize: 25,
    lineHeight: 28,
    color: "#33495F",
  },

  /* =========================
     FORM
  ========================= */

  formLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#687D95",
    letterSpacing: 0.8,

    marginBottom: 7,
    marginTop: 8,
  },

  formSelect: {
    width: "100%",
    minHeight: 48,

    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    paddingHorizontal: 14,

    marginBottom: 12,
  },

  formSelectText: {
    fontSize: 14,
    color: "#263C54",
  },

  formArrow: {
    position: "absolute",
    right: 14,
    top: 11,
    fontSize: 18,
    color: "#1C314A",
  },

  fileUploadBox: {
    minHeight: 82,

    borderRadius: 13,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BFC9D4",

    backgroundColor: "#FBFBF9",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    gap: 14,
  },

  fileUploadIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,
    backgroundColor: "#F2E7C8",

    textAlign: "center",
    lineHeight: 40,

    fontSize: 24,
    color: "#6E592A",
  },

  fileUploadTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#253B54",
    marginBottom: 4,
  },

  fileUploadDescription: {
    fontSize: 12,
    color: "#8292A4",
  },

  /* =========================
     MODAL BUTTONS
  ========================= */

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,

    marginTop: 24,
  },

  cancelButton: {
    height: 44,
    paddingHorizontal: 18,

    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334960",
  },

  modalUploadButton: {
    height: 44,
    paddingHorizontal: 20,

    borderRadius: 22,
    backgroundColor: "#16324F",

    alignItems: "center",
    justifyContent: "center",
  },

  modalUploadButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default ClientDocumentsScreen;
