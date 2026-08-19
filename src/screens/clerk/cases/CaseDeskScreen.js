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
import {getClerkCases} from '../../../services/api/clerkService';

const CASES = [
  {
    id: '1',
    caseNo: 'LC-2026-103',
    type: 'Civil',
    client: 'test',
    stage: 'Closed',
    status: 'New',
    priority: 'Urgent',
    nextHearing: '-',
  },
  {
    id: '2',
    caseNo: 'LC-2026-102',
    type: 'Criminal',
    client: 'test',
    stage: '-',
    status: 'New',
    priority: 'Medium',
    nextHearing: '05 Aug 2026',
  },
  {
    id: '3',
    caseNo: 'LC-2026-101',
    type: 'Criminal',
    client: 'Satish',
    stage: 'Closed',
    status: 'Ready for Closure',
    priority: 'High',
    nextHearing: '31 Jul 2026',
  },
  {
    id: '4',
    caseNo: 'CIV-2026-006',
    type: 'Civil',
    client: 'Suresh Reddy',
    stage: 'Plaint Filing',
    status: 'New',
    priority: 'Medium',
    nextHearing: '26 Jul 2026',
  },
  {
    id: '5',
    caseNo: 'CR-2026-004',
    type: 'Criminal',
    client: 'Farhan Khan',
    stage: 'Framing of Charges',
    status: 'In Progress',
    priority: 'Urgent',
    nextHearing: '20 Aug 2026',
  },
  {
    id: '6',
    caseNo: 'CR-2026-003',
    type: 'Criminal',
    client: 'Naveen Reddy',
    stage: 'Charge Sheet',
    status: 'Pending',
    priority: 'High',
    nextHearing: '12 Aug 2026',
  },
];

const STATUS_OPTIONS = [
  'All Statuses',
  'New',
  'In Progress',
  'Pending',
  'Ready for Closure',
  'Adjourned',
];

const TYPE_OPTIONS = [
  'All Types',
  'Civil',
  'Criminal',
];

const PRIORITY_OPTIONS = [
  'All Priorities',
  'Low',
  'Medium',
  'High',
  'Urgent',
];

const CaseDeskScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [search, setSearch] = useState('');
  const [type, setType] = useState('All Types');
  const [status, setStatus] = useState('All Statuses');
  const [priority, setPriority] = useState('All Priorities');
  const [sortBy, setSortBy] = useState('Sort by Filing Date');
  const [sortOrder, setSortOrder] = useState('Descending');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [rows, setRows] = useState(10);
  const [cases, setCases] = useState([]);
  useEffect(() => { getClerkCases().then((items) => setCases(items.map((item) => ({...item, id: item.caseId, caseNo: item.caseNumber ?? '-', type: item.caseType ?? '-', client: item.client?.name ?? item.clientName ?? '-', stage: item.caseStage ?? '-', status: item.caseStatus ?? '-', priority: item.priority ?? '-', nextHearing: item.nextHearingDate ?? '-'})))).catch(() => setCases([])); }, []);

  const [typeIndex, setTypeIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [priorityIndex, setPriorityIndex] = useState(0);

  const filteredCases = useMemo(() => {
    let result = [...cases];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(item =>
        `${item.caseNo} ${item.client} ${item.type}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (type !== 'All Types') {
      result = result.filter(item => item.type === type);
    }

    if (status !== 'All Statuses') {
      result = result.filter(item => item.status === status);
    }

    if (priority !== 'All Priorities') {
      result = result.filter(
        item => item.priority === priority,
      );
    }

    if (sortBy === 'Sort by Filing Date') {
      result.reverse();
    }

    if (sortOrder === 'Ascending') {
      result.reverse();
    }

    return result.slice(0, rows);
  }, [
    search,
    type,
    status,
    priority,
    sortBy,
    sortOrder,
    rows,
    cases,
  ]);

  const cycleType = () => {
    const nextIndex =
      (typeIndex + 1) % TYPE_OPTIONS.length;

    setTypeIndex(nextIndex);
    setType(TYPE_OPTIONS[nextIndex]);
  };

  const cycleStatus = () => {
    const nextIndex =
      (statusIndex + 1) % STATUS_OPTIONS.length;

    setStatusIndex(nextIndex);
    setStatus(STATUS_OPTIONS[nextIndex]);
  };

  const cyclePriority = () => {
    const nextIndex =
      (priorityIndex + 1) % PRIORITY_OPTIONS.length;

    setPriorityIndex(nextIndex);
    setPriority(PRIORITY_OPTIONS[nextIndex]);
  };

  const cycleSortOrder = () => {
    setSortOrder(current =>
      current === 'Descending'
        ? 'Ascending'
        : 'Descending',
    );
  };

  const handleNewCase = () => {
    // Add New Case screen will be connected later.
    console.log('New Case');
  };

  const handleEdit = item => {
    // Case edit screen will be connected later.
    console.log('Edit Case:', item);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Cases</Text>

          <Text style={styles.pageSubtitle}>
            Create client-linked cases first, then use the
            generated case ID to attach documents and schedule
            hearings.
          </Text>
        </View>

        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          {/* FILTERS */}
          <View
            style={[
              styles.filterContainer,
              isMobile && styles.filterContainerMobile,
            ]}>
            {/* SEARCH */}
            <View
              style={[
                styles.searchBox,
                isMobile && styles.mobileField,
              ]}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search case no / party / client"
                placeholderTextColor="#8797A9"
                style={styles.input}
              />
            </View>

            {/* TYPE */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={cycleType}>
              <Text style={styles.filterText}>
                {type}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* STATUS */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={cycleStatus}>
              <Text style={styles.filterText}>
                {status}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* PRIORITY */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={cyclePriority}>
              <Text style={styles.filterText}>
                {priority}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* SORT */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={() =>
                setSortBy(current =>
                  current === 'Sort by Filing Date'
                    ? 'Sort by Case Number'
                    : 'Sort by Filing Date',
                )
              }>
              <Text style={styles.filterText}>
                {sortBy}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* SORT ORDER */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={cycleSortOrder}>
              <Text style={styles.filterText}>
                {sortOrder}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* FROM DATE */}
            <View
              style={[
                styles.dateBox,
                isMobile && styles.mobileField,
              ]}>
              <TextInput
                value={fromDate}
                onChangeText={setFromDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8797A9"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>▣</Text>
            </View>

            {/* TO DATE */}
            <View
              style={[
                styles.dateBox,
                isMobile && styles.mobileField,
              ]}>
              <TextInput
                value={toDate}
                onChangeText={setToDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8797A9"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>▣</Text>
            </View>

            {/* ROWS */}
            <TouchableOpacity
              style={[
                styles.filterBox,
                isMobile && styles.mobileField,
              ]}
              activeOpacity={0.8}
              onPress={() =>
                setRows(current =>
                  current === 10 ? 25 : 10,
                )
              }>
              <Text style={styles.filterText}>
                {rows} rows
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* SEARCH BUTTON */}
            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.85}>
              <Text style={styles.searchButtonText}>
                Search
              </Text>
            </TouchableOpacity>

            {/* NEW CASE */}
            <TouchableOpacity
              style={styles.newCaseButton}
              activeOpacity={0.85}
              onPress={handleNewCase}>
              <Text style={styles.newCaseText}>
                + New Case
              </Text>
            </TouchableOpacity>
          </View>

          {/* TABLE */}
          {isMobile ? (
            <View style={styles.mobileList}>
              {filteredCases.map(item => (
                <View
                  key={item.id}
                  style={styles.caseCard}>
                  <View
                    style={styles.caseCardHeader}>
                    <Text style={styles.caseNumber}>
                      {item.caseNo}
                    </Text>

                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        handleEdit(item)
                      }>
                      <Text style={styles.editText}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Type
                    </Text>

                    <Text style={styles.infoValue}>
                      {item.type}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Client
                    </Text>

                    <Text style={styles.infoValue}>
                      {item.client}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Stage
                    </Text>

                    <Text style={styles.infoValue}>
                      {item.stage}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Status
                    </Text>

                    <StatusBadge
                      status={item.status}
                    />
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Priority
                    </Text>

                    <PriorityBadge
                      priority={item.priority}
                    />
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Next Hearing
                    </Text>

                    <Text style={styles.infoValue}>
                      {item.nextHearing}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator>
              <View style={styles.table}>
                {/* HEADER */}
                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerCell,
                      styles.caseColumn,
                    ]}>
                    CASE NO.
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
                      styles.clientColumn,
                    ]}>
                    CLIENT
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.stageColumn,
                    ]}>
                    STAGE
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.statusColumn,
                    ]}>
                    STATUS
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.priorityColumn,
                    ]}>
                    PRIORITY
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.hearingColumn,
                    ]}>
                    NEXT HEARING
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
                {filteredCases.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.tableRow,
                      index === 0 &&
                        styles.highlightRow,
                    ]}>
                    <Text
                      style={[
                        styles.cellText,
                        styles.caseColumn,
                        styles.caseLink,
                      ]}>
                      {item.caseNo}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.typeColumn,
                      ]}>
                      {item.type}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.clientColumn,
                      ]}>
                      {item.client}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.stageColumn,
                      ]}>
                      {item.stage}
                    </Text>

                    <View
                      style={[
                        styles.statusColumn,
                        styles.badgeCell,
                      ]}>
                      <StatusBadge
                        status={item.status}
                      />
                    </View>

                    <View
                      style={[
                        styles.priorityColumn,
                        styles.badgeCell,
                      ]}>
                      <PriorityBadge
                        priority={item.priority}
                      />
                    </View>

                    <Text
                      style={[
                        styles.cellText,
                        styles.hearingColumn,
                      ]}>
                      {item.nextHearing}
                    </Text>

                    <View
                      style={[
                        styles.actionColumn,
                        styles.actionCell,
                      ]}>
                      <TouchableOpacity
                        style={styles.editButton}
                        activeOpacity={0.8}
                        onPress={() =>
                          handleEdit(item)
                        }>
                        <Text style={styles.editText}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          {/* PAGINATION */}
          <View style={styles.pagination}>
            <Text style={styles.paginationCount}>
              {filteredCases.length} cases
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text style={styles.pageButtonText}>
                Prev
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              Page 1 / 1
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text style={styles.pageButtonText}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const StatusBadge = ({status}) => {
  let backgroundColor = '#E4DDFF';
  let textColor = '#5942B8';

  if (status === 'In Progress') {
    backgroundColor = '#DCEBFF';
    textColor = '#2461B9';
  }

  if (status === 'Pending') {
    backgroundColor = '#F9E7C8';
    textColor = '#A26D10';
  }

  if (status === 'Ready for Closure') {
    backgroundColor = '#F4F1E8';
    textColor = '#26384D';
  }

  if (status === 'Adjourned') {
    backgroundColor = '#E1E5EA';
    textColor = '#526273';
  }

  return (
    <View
      style={[
        styles.statusBadge,
        {backgroundColor},
      ]}>
      <Text
        style={[
          styles.badgeText,
          {color: textColor},
        ]}>
        {status}
      </Text>
    </View>
  );
};

const PriorityBadge = ({priority}) => {
  let backgroundColor = '#F9E9C2';
  let textColor = '#946B14';

  if (priority === 'Urgent') {
    backgroundColor = '#FDE0DE';
    textColor = '#D93B32';
  }

  if (priority === 'High') {
    backgroundColor = '#FBDDD9';
    textColor = '#D63E35';
  }

  if (priority === 'Low') {
    backgroundColor = '#DDEFE1';
    textColor = '#39824F';
  }

  return (
    <View
      style={[
        styles.priorityBadge,
        {backgroundColor},
      ]}>
      <Text
        style={[
          styles.badgeText,
          {color: textColor},
        ]}>
        {priority}
      </Text>
    </View>
  );
};

export default CaseDeskScreen;

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
    lineHeight: 22,
    color: '#60758E',
    maxWidth: 1000,
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
    width: 200,
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    fontSize: 13,
    color: '#273A50',
  },

  mobileField: {
    width: '100%',
  },

  filterBox: {
    width: 190,
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DEE3E8',
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  dateInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#273A50',
  },

  calendarIcon: {
    fontSize: 14,
    color: '#24384F',
  },

  searchButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DDE3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#23384F',
  },

  newCaseButton: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  newCaseText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  table: {
    minWidth: 1400,
    borderWidth: 1,
    borderColor: '#E2DED5',
    borderRadius: 18,
    overflow: 'hidden',
  },

  tableHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2EDDF',
  },

  tableRow: {
    minHeight: 64,
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
    fontSize: 14,
    color: '#27394E',
  },

  caseLink: {
    color: '#246BE3',
    fontWeight: '600',
  },

  caseColumn: {
    width: 190,
    paddingLeft: 20,
  },

  typeColumn: {
    width: 130,
  },

  clientColumn: {
    width: 210,
  },

  stageColumn: {
    width: 240,
  },

  statusColumn: {
    width: 210,
  },

  priorityColumn: {
    width: 190,
  },

  hearingColumn: {
    width: 190,
  },

  actionColumn: {
    width: 120,
  },

  badgeCell: {
    justifyContent: 'center',
  },

  actionCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    paddingHorizontal: 13,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priorityBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    paddingHorizontal: 13,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  editButton: {
    minWidth: 66,
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8DEE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#263A50',
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

  mobileList: {
    gap: 12,
  },

  caseCard: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    padding: 16,
  },

  caseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  caseNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#246BE3',
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
});
