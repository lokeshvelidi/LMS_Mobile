import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import HearingFilter from '../../../components/clerk/hearings/HearingFilter';

import HearingTable from '../../../components/clerk/hearings/HearingTable';

import HearingCard from '../../../components/clerk/hearings/HearingCard';
import {getClerkHearings} from '../../../services/api/clerkService';

const HEARINGS = [
  {
    id: '1',
    caseNo: 'LC-2026-103',
    client: 'test',
    court: 'District Court',
    date: '05 Aug 2026',
    time: '10:30 AM',
    type: 'Hearing',
    status: 'Scheduled',
  },
  {
    id: '2',
    caseNo: 'LC-2026-102',
    client: 'test',
    court: 'High Court',
    date: '06 Aug 2026',
    time: '11:00 AM',
    type: 'Mention',
    status: 'Scheduled',
  },
  {
    id: '3',
    caseNo: 'LC-2026-101',
    client: 'Satish',
    court: 'District Court',
    date: '08 Aug 2026',
    time: '02:00 PM',
    type: 'Evidence',
    status: 'Adjourned',
  },
  {
    id: '4',
    caseNo: 'CIV-2026-006',
    client: 'Suresh Reddy',
    court: 'Civil Court',
    date: '12 Aug 2026',
    time: '10:00 AM',
    type: 'Arguments',
    status: 'Scheduled',
  },
  {
    id: '5',
    caseNo: 'CR-2026-004',
    client: 'Farhan Khan',
    court: 'Sessions Court',
    date: '20 Aug 2026',
    time: '11:30 AM',
    type: 'Hearing',
    status: 'Scheduled',
  },
  {
    id: '6',
    caseNo: 'CR-2026-003',
    client: 'Naveen Reddy',
    court: 'District Court',
    date: '22 Aug 2026',
    time: '03:00 PM',
    type: 'Evidence',
    status: 'Completed',
  },
];

const STATUS_OPTIONS = [
  'All Statuses',
  'Scheduled',
  'Adjourned',
  'Completed',
  'Cancelled',
];

const HearingsScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [search, setSearch] = useState('');

  const [status, setStatus] =
    useState('All Statuses');

  const [statusIndex, setStatusIndex] =
    useState(0);

  const [fromDate, setFromDate] =
    useState('');

  const [toDate, setToDate] =
    useState('');

  const [rows, setRows] = useState(10);
  const [hearings, setHearings] = useState([]);
  useEffect(() => { getClerkHearings().then((items) => setHearings(items.map((item) => ({...item, id: item.hearingId, caseNo: item.caseNumber ?? '-', client: item.client?.name ?? item.clientName ?? '-', court: item.courtHall ?? '-', date: item.hearingDate ?? '-', time: '', type: item.purpose ?? '-', status: item.status ?? '-'})))).catch(() => setHearings([])); }, []);

  const filteredHearings = useMemo(() => {
    let result = [...hearings];

    if (search.trim()) {
      const query =
        search.toLowerCase();

      result = result.filter(item =>
        `${item.caseNo} ${item.client} ${item.court}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (status !== 'All Statuses') {
      result = result.filter(
        item => item.status === status,
      );
    }

    return result.slice(0, rows);
  }, [
    search,
    status,
    rows,
    hearings,
  ]);

  const handleStatusChange = () => {
    const nextIndex =
      (statusIndex + 1) %
      STATUS_OPTIONS.length;

    setStatusIndex(nextIndex);

    setStatus(
      STATUS_OPTIONS[nextIndex],
    );
  };

  const handleRowsChange = () => {
    setRows(current =>
      current === 10 ? 25 : 10,
    );
  };

  const handleEdit = hearing => {
    console.log(
      'Edit hearing:',
      hearing,
    );

    // Navigation will be connected later.
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>
        {/* HEADER */}

        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>
            Hearings
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage scheduled hearings and
            court appearances.
          </Text>
        </View>

        {/* MAIN CARD */}

        <View style={styles.mainCard}>
          <HearingFilter
            search={search}
            setSearch={setSearch}
            status={status}
            onStatusChange={
              handleStatusChange
            }
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            rows={rows}
            onRowsChange={
              handleRowsChange
            }
          />

          {isMobile ? (
            <View style={styles.mobileList}>
              {filteredHearings.map(
                hearing => (
                  <HearingCard
                    key={hearing.id}
                    hearing={hearing}
                    onEdit={handleEdit}
                  />
                ),
              )}
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator>
              <HearingTable
                hearings={
                  filteredHearings
                }
                onEdit={handleEdit}
              />
            </ScrollView>
          )}

          {filteredHearings.length ===
            0 && (
            <View
              style={styles.emptyState}>
              <Text
                style={styles.emptyTitle}>
                No hearings found
              </Text>

              <Text
                style={styles.emptyText}>
                Try changing your filters
                or search criteria.
              </Text>
            </View>
          )}

          {/* PAGINATION */}

          <View style={styles.pagination}>
            <Text
              style={styles.paginationCount}>
              {filteredHearings.length}{' '}
              hearings
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

export default HearingsScreen;

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

  mobileList: {
    gap: 12,
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
