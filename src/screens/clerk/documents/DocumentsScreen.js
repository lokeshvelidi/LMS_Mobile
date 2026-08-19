import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {getClerkCases, getClerkCaseDocuments, uploadClerkCourtOrder} from '../../../services/api/clerkService';
import * as DocumentPicker from 'expo-document-picker';

const DOCUMENTS = [
  {
    id: '1',
    name: 'Petition.pdf',
    type: 'Petition',
    caseNo: 'LC-2026-103',
    client: 'test',
    uploaded: '23 Jul 2026',
    size: '1.2 MB',
  },
  {
    id: '2',
    name: 'Identity Proof.pdf',
    type: 'Identity',
    caseNo: 'LC-2026-102',
    client: 'test',
    uploaded: '23 Jul 2026',
    size: '820 KB',
  },
  {
    id: '3',
    name: 'Court Order.pdf',
    type: 'Court Order',
    caseNo: 'LC-2026-101',
    client: 'Satish',
    uploaded: '22 Jul 2026',
    size: '2.4 MB',
  },
  {
    id: '4',
    name: 'Affidavit.pdf',
    type: 'Affidavit',
    caseNo: 'CIV-2026-006',
    client: 'Suresh Reddy',
    uploaded: '21 Jul 2026',
    size: '1.7 MB',
  },
  {
    id: '5',
    name: 'Evidence.pdf',
    type: 'Evidence',
    caseNo: 'CR-2026-004',
    client: 'Farhan Khan',
    uploaded: '20 Jul 2026',
    size: '3.1 MB',
  },
];

const DOCUMENT_TYPES = ['All Types'];

const DocumentsScreen = () => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [search, setSearch] = useState('');
  const [documentType, setDocumentType] =
    useState('All Types');

  const [typeIndex, setTypeIndex] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  useEffect(() => { getClerkCases().then((items) => { setCases(items); setSelectedCaseId(items[0]?.caseId ?? null); }).catch(() => setCases([])); }, []);
  useEffect(() => { if (selectedCaseId != null) getClerkCaseDocuments(selectedCaseId).then(setDocuments).catch(() => setDocuments([])); }, [selectedCaseId]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredDocuments = useMemo(() => {
    let result = documents.map((item) => ({...item, id: item.documentId, name: item.fileName ?? item.name ?? '-', type: item.documentType ?? item.type ?? '-', caseNo: item.caseNumber ?? '-', client: item.clientName ?? '-', uploaded: item.createdDate ?? '-', size: item.fileSize ?? '-'}));

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(item =>
        `${item.name} ${item.caseNo} ${item.client} ${item.type}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (documentType !== 'All Types') {
      result = result.filter(
        item => item.type === documentType,
      );
    }

    return result;
  }, [search, documentType, documents]);

  const cycleDocumentType = () => {
    const nextIndex =
      (typeIndex + 1) %
      DOCUMENT_TYPES.length;

    setTypeIndex(nextIndex);
    setDocumentType(
      DOCUMENT_TYPES[nextIndex],
    );
  };

  const handleUpload = async () => { if (selectedCaseId == null) return; const picked = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true}); if (picked.canceled) return; try { await uploadClerkCourtOrder({caseId: selectedCaseId, orderType: 'Court Order', orderDate: new Date().toISOString(), file: picked.assets[0]}); setDocuments(await getClerkCaseDocuments(selectedCaseId)); } catch (error) { console.warn('Document upload failed', error?.message); } };

  const handleOpen = document => {
    console.log('Open document:', document);
  };

  const handleDownload = document => {
    console.log('Download document:', document);
  };

  const handleDelete = document => {
    console.log('Delete document:', document);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}

        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>
            Documents
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage case documents and supporting
            files.
          </Text>
        </View>

        {/* MAIN CARD */}

        <View style={styles.mainCard}>
          {/* FILTERS */}

          <View
            style={[
              styles.filterContainer,
              isMobile &&
                styles.filterContainerMobile,
            ]}>
            {/* SEARCH */}

            <View
              style={[
                styles.searchBox,
                isMobile &&
                  styles.mobileField,
              ]}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search document / case / client"
                placeholderTextColor="#8797A9"
                style={styles.input}
              />
            </View>

            {/* DOCUMENT TYPE */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={cycleDocumentType}
              style={[
                styles.filterBox,
                isMobile &&
                  styles.mobileField,
              ]}>
              <Text style={styles.filterText}>
                {documentType}
              </Text>

              <Text style={styles.arrow}>
                ⌄
              </Text>
            </TouchableOpacity>

            {/* FROM DATE */}

            <View
              style={[
                styles.dateBox,
                isMobile &&
                  styles.mobileField,
              ]}>
              <TextInput
                value={fromDate}
                onChangeText={setFromDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8797A9"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>
                ▣
              </Text>
            </View>

            {/* TO DATE */}

            <View
              style={[
                styles.dateBox,
                isMobile &&
                  styles.mobileField,
              ]}>
              <TextInput
                value={toDate}
                onChangeText={setToDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8797A9"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>
                ▣
              </Text>
            </View>

            {/* UPLOAD */}

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.uploadButton}
              onPress={handleUpload}>
              <Text style={styles.uploadButtonText}>
                + Upload Document
              </Text>
            </TouchableOpacity>
          </View>

          {/* DOCUMENT TABLE */}

          {isMobile ? (
            <View style={styles.mobileList}>
              {filteredDocuments.map(
                document => (
                  <View
                    key={document.id}
                    style={styles.documentCard}>
                    <View
                      style={
                        styles.documentHeader
                      }>
                      <View
                        style={
                          styles.documentTitleContainer
                        }>
                        <Text
                          style={
                            styles.documentName
                          }>
                          {document.name}
                        </Text>

                        <Text
                          style={
                            styles.documentType
                          }>
                          {document.type}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Case
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }>
                        {document.caseNo}
                      </Text>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Client
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }>
                        {document.client}
                      </Text>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Uploaded
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }>
                        {document.uploaded}
                      </Text>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Size
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }>
                        {document.size}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.mobileActions
                      }>
                      <TouchableOpacity
                        style={
                          styles.actionButton
                        }
                        onPress={() =>
                          handleOpen(
                            document,
                          )
                        }>
                        <Text
                          style={
                            styles.actionText
                          }>
                          Open
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={
                          styles.actionButton
                        }
                        onPress={() =>
                          handleDownload(
                            document,
                          )
                        }>
                        <Text
                          style={
                            styles.actionText
                          }>
                          Download
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={
                          styles.deleteButton
                        }
                        onPress={() =>
                          handleDelete(
                            document,
                          )
                        }>
                        <Text
                          style={
                            styles.deleteText
                          }>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ),
              )}
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator>
              <View style={styles.table}>
                {/* HEADER */}

                <View
                  style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerCell,
                      styles.nameColumn,
                    ]}>
                    DOCUMENT
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.typeColumn,
                    ]}>
                    TYPE
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.caseColumn,
                    ]}>
                    CASE
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.clientColumn,
                    ]}>
                    CLIENT
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.uploadedColumn,
                    ]}>
                    UPLOADED
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.sizeColumn,
                    ]}>
                    SIZE
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.actionColumn,
                    ]}>
                    ACTIONS
                  </Text>
                </View>

                {/* ROWS */}

                {filteredDocuments.map(
                  (document, index) => (
                    <View
                      key={document.id}
                      style={[
                        styles.tableRow,
                        index === 0 &&
                          styles.highlightRow,
                      ]}>
                      <View
                        style={[
                          styles.nameColumn,
                          styles.documentNameCell,
                        ]}>
                        <View
                          style={
                            styles.fileIcon
                          }>
                          <Text
                            style={
                              styles.fileIconText
                            }>
                            PDF
                          </Text>
                        </View>

                        <Text
                          style={
                            styles.cellText
                          }>
                          {document.name}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.cellText,
                          styles.typeColumn,
                        ]}>
                        {document.type}
                      </Text>

                      <Text
                        style={[
                          styles.cellText,
                          styles.caseColumn,
                        ]}>
                        {document.caseNo}
                      </Text>

                      <Text
                        style={[
                          styles.cellText,
                          styles.clientColumn,
                        ]}>
                        {document.client}
                      </Text>

                      <Text
                        style={[
                          styles.cellText,
                          styles.uploadedColumn,
                        ]}>
                        {document.uploaded}
                      </Text>

                      <Text
                        style={[
                          styles.cellText,
                          styles.sizeColumn,
                        ]}>
                        {document.size}
                      </Text>

                      <View
                        style={[
                          styles.actionColumn,
                          styles.actionCell,
                        ]}>
                        <TouchableOpacity
                          style={
                            styles.actionButton
                          }
                          onPress={() =>
                            handleOpen(
                              document,
                            )
                          }>
                          <Text
                            style={
                              styles.actionText
                            }>
                            Open
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            styles.actionButton
                          }
                          onPress={() =>
                            handleDownload(
                              document,
                            )
                          }>
                          <Text
                            style={
                              styles.actionText
                            }>
                            Download
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={
                            styles.deleteButton
                          }
                          onPress={() =>
                            handleDelete(
                              document,
                            )
                          }>
                          <Text
                            style={
                              styles.deleteText
                            }>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </ScrollView>
          )}

          {/* EMPTY STATE */}

          {filteredDocuments.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                No documents found
              </Text>

              <Text style={styles.emptyText}>
                Try changing your search or
                document filters.
              </Text>
            </View>
          )}

          {/* PAGINATION */}

          <View style={styles.pagination}>
            <Text
              style={styles.paginationCount}>
              {filteredDocuments.length}{' '}
              documents
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text
                style={
                  styles.pageButtonText
                }>
                Prev
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              Page 1 / 1
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text
                style={
                  styles.pageButtonText
                }>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DEE0',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  headerSection: {
    marginTop: 25,
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 15,
    color: '#60758E',
  },

  mainCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },

  filterContainerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  searchBox: {
    width: 230,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    color: '#273A50',
    fontSize: 13,
  },

  mobileField: {
    width: '100%',
  },

  filterBox: {
    width: 190,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterText: {
    fontSize: 13,
    color: '#273A50',
  },

  arrow: {
    fontSize: 18,
    color: '#617388',
  },

  dateBox: {
    width: 175,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  dateInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    color: '#273A50',
    fontSize: 13,
  },

  calendarIcon: {
    fontSize: 14,
    color: '#24384F',
  },

  uploadButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  table: {
    minWidth: 1250,
    borderWidth: 1,
    borderColor: '#E2DED5',
    borderRadius: 18,
    overflow: 'hidden',
  },

  tableHeader: {
    height: 50,
    backgroundColor: '#F2EDDF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tableRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFAF5',
    borderTopWidth: 1,
    borderTopColor: '#E6E2DA',
  },

  highlightRow: {
    backgroundColor: '#F9F3E4',
  },

  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    color: '#61738A',
    letterSpacing: 0.7,
  },

  cellText: {
    fontSize: 13,
    color: '#27394E',
  },

  nameColumn: {
    width: 270,
    paddingLeft: 20,
  },

  typeColumn: {
    width: 160,
  },

  caseColumn: {
    width: 190,
  },

  clientColumn: {
    width: 200,
  },

  uploadedColumn: {
    width: 170,
  },

  sizeColumn: {
    width: 120,
  },

  actionColumn: {
    width: 260,
  },

  documentNameCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fileIcon: {
    width: 34,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#F1DCD9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  fileIconText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#B6473F',
  },

  actionCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  actionButton: {
    minWidth: 62,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D7DDE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#263A50',
  },

  deleteButton: {
    minWidth: 62,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6C2BE',
    backgroundColor: '#FFF7F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B7443B',
  },

  mobileList: {
    gap: 12,
  },

  documentCard: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    padding: 16,
  },

  documentHeader: {
    marginBottom: 12,
  },

  documentTitleContainer: {
    flex: 1,
  },

  documentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D344D',
  },

  documentType: {
    marginTop: 4,
    fontSize: 12,
    color: '#64758A',
  },

  infoRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#708197',
  },

  infoValue: {
    maxWidth: '60%',
    textAlign: 'right',
    fontSize: 12,
    color: '#293D53',
  },

  mobileActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263A50',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#718197',
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 18,
  },

  paginationCount: {
    fontSize: 13,
    color: '#64758A',
    marginRight: 4,
  },

  pageButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9DEE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#263A51',
  },

  pageNumber: {
    fontSize: 13,
    color: '#34485E',
  },
});
