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

import PaymentSummaryCard from '../../../components/clerk/paymentDesk/PaymentSummaryCard';

import PaymentStatusBadge from '../../../components/clerk/paymentDesk/PaymentStatusBadge';

import PaymentTable from '../../../components/clerk/paymentDesk/PaymentTable';
import PaymentCaseSelector from '../../../components/lawyer/payments/PaymentCaseSelector';
import PaymentRequestForm from '../../../components/lawyer/payments/PaymentRequestForm';
import {getClerkCases, createClerkPaymentRequest, getClerkPaymentRequests} from '../../../services/api/clerkService';

const LEGACY_PAYMENTS = [
  {
    id: '1',
    invoice: 'INV-2026-001',
    caseNo: 'LC-2026-103',
    client: 'test',
    amount: '₹25,000',
    dueDate: '25 Jul 2026',
    status: 'Paid',
  },
  {
    id: '2',
    invoice: 'INV-2026-002',
    caseNo: 'LC-2026-102',
    client: 'test',
    amount: '₹18,500',
    dueDate: '28 Jul 2026',
    status: 'Pending',
  },
  {
    id: '3',
    invoice: 'INV-2026-003',
    caseNo: 'LC-2026-101',
    client: 'Satish',
    amount: '₹32,000',
    dueDate: '20 Jul 2026',
    status: 'Overdue',
  },
  {
    id: '4',
    invoice: 'INV-2026-004',
    caseNo: 'CIV-2026-006',
    client: 'Suresh Reddy',
    amount: '₹15,000',
    dueDate: '30 Jul 2026',
    status: 'Partially Paid',
  },
  {
    id: '5',
    invoice: 'INV-2026-005',
    caseNo: 'CR-2026-004',
    client: 'Farhan Khan',
    amount: '₹40,000',
    dueDate: '05 Aug 2026',
    status: 'Pending',
  },
  {
    id: '6',
    invoice: 'INV-2026-006',
    caseNo: 'CR-2026-003',
    client: 'Naveen Reddy',
    amount: '₹22,500',
    dueDate: '08 Aug 2026',
    status: 'Paid',
  },
];

const PAYMENTS = [];

const STATUS_OPTIONS = [
  'All Statuses',
  'Paid',
  'Pending',
  'Overdue',
  'Partially Paid',
];

const PaymentDeskScreen = () => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState('All Statuses');

  const [statusIndex, setStatusIndex] =
    useState(0);

  const [fromDate, setFromDate] =
    useState('');

  const [toDate, setToDate] =
    useState('');

  const [rows, setRows] =
    useState(10);
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [payments, setPayments] = useState([]);
  useEffect(() => { Promise.all([getClerkCases(), getClerkPaymentRequests({Page: 1, PageSize: 100})]).then(([items, paymentItems]) => { const mapped = items.map((item) => ({...item, id: item.caseId, caseNumber: item.caseNumber ?? '-'})); setCases(mapped); setSelectedCase(mapped[0] ?? null); const byCase = new Map(mapped.map(item => [item.id, item])); setPayments(paymentItems.map(item => ({id: item.paymentRequestId, invoice: item.paymentRequestNumber ?? '-', caseNo: byCase.get(item.caseId)?.caseNumber ?? item.case?.caseNumber ?? '-', client: item.client?.name ?? '-', amount: `₹${Number(item.netAmount ?? item.amount ?? 0).toLocaleString('en-IN')}`, dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-IN') : '-', status: item.status ?? 'Pending'}))); }).catch(() => { setCases([]); setPayments([]); }); }, []);
  const submitPaymentRequest = async () => { const numericAmount = Number(amount); if (!selectedCase?.id || !Number.isFinite(numericAmount) || numericAmount <= 0 || !description.trim()) return; setSubmitting(true); try { await createClerkPaymentRequest({caseId: Number(selectedCase.id), amount: numericAmount, description, submitForApproval: true}); setAmount(''); setDescription(''); } catch (error) { console.warn('Payment request failed', error?.message); } finally { setSubmitting(false); } };

  const filteredPayments =
    useMemo(() => {
      let result = [...payments];

      if (search.trim()) {
        const query =
          search.toLowerCase();

        result = result.filter(
          payment =>
            `${payment.invoice} ${payment.caseNo} ${payment.client}`
              .toLowerCase()
              .includes(query),
        );
      }

      if (
        status !== 'All Statuses'
      ) {
        result = result.filter(
          payment =>
            payment.status === status,
        );
      }

      return result.slice(0, rows);
    }, [
      search,
      status,
      rows,
      payments,
    ]);

  const cycleStatus = () => {
    const nextIndex =
      (statusIndex + 1) %
      STATUS_OPTIONS.length;

    setStatusIndex(nextIndex);

    setStatus(
      STATUS_OPTIONS[nextIndex],
    );
  };

  const handleRows = () => {
    setRows(current =>
      current === 10 ? 25 : 10,
    );
  };

  const handleView = payment => {
    console.log(
      'View payment:',
      payment,
    );
  };

  const handleRecord = payment => {
    console.log(
      'Record payment:',
      payment,
    );
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
            Payment Desk
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage client payments, invoices,
            and outstanding amounts.
          </Text>
        </View>

        <PaymentCaseSelector cases={cases} selectedCase={selectedCase} onSelectCase={setSelectedCase} />
        <PaymentRequestForm amount={amount} setAmount={setAmount} description={description} setDescription={setDescription} onSubmit={submitPaymentRequest} disabled={submitting} />

        {/* SUMMARY */}

        <View
          style={[
            styles.summaryRow,
            isMobile &&
              styles.summaryColumn,
          ]}>
          <PaymentSummaryCard
            title="TOTAL BILLED"
            value="₹1,53,000"
            subtitle="current billing"
            type="blue"
          />

          <PaymentSummaryCard
            title="RECEIVED"
            value="₹47,500"
            subtitle="payments received"
            type="green"
          />

          <PaymentSummaryCard
            title="PENDING"
            value="₹55,500"
            subtitle="awaiting payment"
            type="yellow"
          />

          <PaymentSummaryCard
            title="OVERDUE"
            value="₹32,000"
            subtitle="past due amount"
            type="red"
          />
        </View>

        {/* MAIN CARD */}

        <View style={styles.mainCard}>
          {/* FILTER */}

          <View
            style={[
              styles.filterRow,
              isMobile &&
                styles.filterColumn,
            ]}>
            <View
              style={[
                styles.searchBox,
                isMobile &&
                  styles.mobileField,
              ]}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search invoice / case / client"
                placeholderTextColor="#8797A9"
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.filterBox,
                isMobile &&
                  styles.mobileField,
              ]}
              onPress={cycleStatus}>
              <Text
                style={styles.filterText}>
                {status}
              </Text>

              <Text style={styles.arrow}>
                ⌄
              </Text>
            </TouchableOpacity>

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

              <Text
                style={styles.calendarIcon}>
                ▣
              </Text>
            </View>

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

              <Text
                style={styles.calendarIcon}>
                ▣
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.filterBox,
                isMobile &&
                  styles.mobileField,
              ]}
              onPress={handleRows}>
              <Text
                style={styles.filterText}>
                {rows} rows
              </Text>

              <Text style={styles.arrow}>
                ⌄
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.invoiceButton}
              onPress={() =>
                console.log(
                  'Create invoice',
                )
              }>
              <Text
                style={
                  styles.invoiceButtonText
                }>
                + New Invoice
              </Text>
            </TouchableOpacity>
          </View>

          {/* DESKTOP TABLE */}

          {!isMobile ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator>
              <PaymentTable
                payments={
                  filteredPayments
                }
                onView={handleView}
                onRecord={handleRecord}
              />
            </ScrollView>
          ) : (
            /* MOBILE CARDS */
            <View style={styles.mobileList}>
              {filteredPayments.map(
                payment => (
                  <View
                    key={payment.id}
                    style={
                      styles.paymentCard
                    }>
                    <View
                      style={
                        styles.paymentHeader
                      }>
                      <View>
                        <Text
                          style={
                            styles.invoiceText
                          }>
                          {
                            payment.invoice
                          }
                        </Text>

                        <Text
                          style={
                            styles.clientText
                          }>
                          {payment.client}
                        </Text>
                      </View>

                      <PaymentStatusBadge
                        status={
                          payment.status
                        }
                      />
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
                        {
                          payment.caseNo
                        }
                      </Text>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Amount
                      </Text>

                      <Text
                        style={[
                          styles.infoValue,
                          styles.mobileAmount,
                        ]}>
                        {
                          payment.amount
                        }
                      </Text>
                    </View>

                    <View
                      style={styles.infoRow}>
                      <Text
                        style={
                          styles.infoLabel
                        }>
                        Due Date
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }>
                        {
                          payment.dueDate
                        }
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
                          handleView(
                            payment,
                          )
                        }>
                        <Text
                          style={
                            styles.actionText
                          }>
                          View
                        </Text>
                      </TouchableOpacity>

                      {payment.status !==
                        'Paid' && (
                        <TouchableOpacity
                          style={
                            styles.recordButton
                          }
                          onPress={() =>
                            handleRecord(
                              payment,
                            )
                          }>
                          <Text
                            style={
                              styles.recordText
                            }>
                            Record Payment
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ),
              )}
            </View>
          )}

          {/* EMPTY STATE */}

          {filteredPayments.length ===
            0 && (
            <View
              style={styles.emptyState}>
              <Text
                style={styles.emptyTitle}>
                No payments found
              </Text>

              <Text
                style={styles.emptyText}>
                Try changing the search or
                payment status.
              </Text>
            </View>
          )}

          {/* PAGINATION */}

          <View style={styles.pagination}>
            <Text
              style={styles.paginationCount}>
              {filteredPayments.length}{' '}
              payments
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

export default PaymentDeskScreen;

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

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },

  summaryColumn: {
    flexDirection: 'column',
    gap: 0,
  },

  mainCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
  },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },

  filterColumn: {
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

  mobileField: {
    width: '100%',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    color: '#273A50',
    fontSize: 13,
  },

  filterBox: {
    width: 180,
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

  invoiceButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  invoiceButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  mobileList: {
    gap: 12,
  },

  paymentCard: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    padding: 16,
  },

  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  invoiceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#246BE3',
  },

  clientText: {
    marginTop: 4,
    fontSize: 12,
    color: '#60758E',
  },

  infoRow: {
    minHeight: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  mobileAmount: {
    fontWeight: '700',
    color: '#19324D',
  },

  mobileActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },

  actionButton: {
    minWidth: 70,
    height: 36,
    paddingHorizontal: 14,
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

  recordButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  recordText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  emptyState: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
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
