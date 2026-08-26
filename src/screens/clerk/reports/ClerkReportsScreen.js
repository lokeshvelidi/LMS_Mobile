import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import ReportSummaryCard from '../../../components/clerk/reports/ReportSummaryCard';

import ReportFilter from '../../../components/clerk/reports/ReportFilter';

import ReportRow from '../../../components/clerk/reports/ReportRow';

import ReportSection from '../../../components/clerk/reports/ReportSection';
import {getAdminReport} from '../../../services/api/adminReportsService';

const REPORT_TYPES = [
  'Case Summary',
  'Hearing Summary',
  'Payment Summary',
  'Document Summary',
];

const PERIODS = [
  'This Month',
  'This Week',
  'Last Month',
  'This Year',
];

const CASE_REPORT = [
  {
    label: 'New Cases',
    value: '12',
    percentage: 48,
  },
  {
    label: 'In Progress',
    value: '8',
    percentage: 32,
  },
  {
    label: 'Pending',
    value: '3',
    percentage: 12,
  },
  {
    label: 'Ready for Closure',
    value: '2',
    percentage: 8,
  },
];

const HEARING_REPORT = [
  {
    label: 'Scheduled',
    value: '18',
    percentage: 72,
  },
  {
    label: 'Completed',
    value: '4',
    percentage: 16,
  },
  {
    label: 'Adjourned',
    value: '2',
    percentage: 8,
  },
  {
    label: 'Cancelled',
    value: '1',
    percentage: 4,
  },
];

const PAYMENT_REPORT = [
  {
    label: 'Paid',
    value: '₹47,500',
    percentage: 31,
  },
  {
    label: 'Pending',
    value: '₹55,500',
    percentage: 36,
  },
  {
    label: 'Overdue',
    value: '₹32,000',
    percentage: 21,
  },
  {
    label: 'Partially Paid',
    value: '₹18,000',
    percentage: 12,
  },
];

const DOCUMENT_REPORT = [
  {
    label: 'Petitions',
    value: '18',
    percentage: 36,
  },
  {
    label: 'Evidence',
    value: '12',
    percentage: 24,
  },
  {
    label: 'Court Orders',
    value: '10',
    percentage: 20,
  },
  {
    label: 'Affidavits',
    value: '6',
    percentage: 12,
  },
  {
    label: 'Other',
    value: '4',
    percentage: 8,
  },
];

const ClerkReportsScreen = () => {
  const {width} = useWindowDimensions();

  const isMobile = width < 700;

  const [reportType, setReportType] =
    useState('Case Summary');

  const [reportTypeIndex, setReportTypeIndex] =
    useState(0);

  const [period, setPeriod] =
    useState('This Month');

  const [periodIndex, setPeriodIndex] =
    useState(0);

  const [fromDate, setFromDate] =
    useState('');

  const [toDate, setToDate] =
    useState('');

  const [generated, setGenerated] =
    useState(true);
  const [apiReports, setApiReports] = useState({});
  useEffect(() => { Promise.allSettled([getAdminReport('cases'), getAdminReport('hearings'), getAdminReport('payments')]).then(([cases, hearings, payments]) => setApiReports({cases: cases.status === 'fulfilled' ? cases.value : null, hearings: hearings.status === 'fulfilled' ? hearings.value : null, payments: payments.status === 'fulfilled' ? payments.value : null})); }, []);

  const cycleReportType = () => {
    const nextIndex =
      (reportTypeIndex + 1) %
      REPORT_TYPES.length;

    setReportTypeIndex(nextIndex);

    setReportType(
      REPORT_TYPES[nextIndex],
    );
  };

  const cyclePeriod = () => {
    const nextIndex =
      (periodIndex + 1) %
      PERIODS.length;

    setPeriodIndex(nextIndex);

    setPeriod(
      PERIODS[nextIndex],
    );
  };

  const reportData = useMemo(() => {
    switch (reportType) {
      case 'Hearing Summary':
        return apiReports.hearings?.items ?? apiReports.hearings?.data ?? (Array.isArray(apiReports.hearings) ? apiReports.hearings : []);

      case 'Payment Summary':
        return apiReports.payments?.items ?? apiReports.payments?.data ?? (Array.isArray(apiReports.payments) ? apiReports.payments : []);

      case 'Document Summary':
        return DOCUMENT_REPORT;

      default:
        return apiReports.cases?.items ?? apiReports.cases?.data ?? (Array.isArray(apiReports.cases) ? apiReports.cases : []);
    }
  }, [reportType, apiReports]);

  const handleGenerate = () => {
    setGenerated(true);

    console.log(
      'Generate report:',
      reportType,
      period,
      fromDate,
      toDate,
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
            Reports
          </Text>

          <Text style={styles.pageSubtitle}>
            View operational reports and
            performance summaries.
          </Text>
        </View>

        {/* SUMMARY */}

        <View
          style={[
            styles.summaryRow,
            isMobile &&
              styles.summaryColumn,
          ]}>
          <ReportSummaryCard
            title="TOTAL CASES"
            value="25"
            subtitle="current period"
            type="blue"
          />

          <ReportSummaryCard
            title="HEARINGS"
            value="25"
            subtitle="scheduled and completed"
            type="green"
          />

          <ReportSummaryCard
            title="DOCUMENTS"
            value="50"
            subtitle="uploaded documents"
            type="purple"
          />

          <ReportSummaryCard
            title="COLLECTION"
            value="₹1,53,000"
            subtitle="total billed"
            type="yellow"
          />
        </View>

        {/* MAIN CARD */}

        <View style={styles.mainCard}>
          <View
            style={[
              styles.filterWrapper,
              isMobile &&
                styles.filterWrapperMobile,
            ]}>
            <ReportFilter
              reportType={reportType}
              onReportTypeChange={
                cycleReportType
              }
              period={period}
              onPeriodChange={
                cyclePeriod
              }
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.generateButton}
              onPress={handleGenerate}>
              <Text
                style={
                  styles.generateButtonText
                }>
                Generate Report
              </Text>
            </TouchableOpacity>
          </View>

          {/* REPORT TITLE */}

          {generated && (
            <>
              <View
                style={styles.reportHeader}>
                <View>
                  <Text
                    style={
                      styles.reportTitle
                    }>
                    {reportType}
                  </Text>

                  <Text
                    style={
                      styles.reportSubtitle
                    }>
                    {period} report
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.exportButton}
                  onPress={() =>
                    console.log(
                      'Export report',
                    )
                  }>
                  <Text
                    style={
                      styles.exportText
                    }>
                    Export
                  </Text>
                </TouchableOpacity>
              </View>

              {/* REPORT SECTIONS */}

              <View
                style={[
                  styles.sectionsRow,
                  isMobile &&
                    styles.sectionsColumn,
                ]}>
                <ReportSection
                  title={
                    reportType ===
                    'Case Summary'
                      ? 'Case Overview'
                      : reportType
                  }
                  subtitle="Current period breakdown">
                  {reportData.map(
                    (item, index) => (
                      <ReportRow
                        key={`${item.label ?? item.caseStatus ?? item.status ?? "report-row"}-${index}`}
                        label={item.label ?? item.caseStatus ?? item.status ?? item.caseType ?? "Report item"}
                        value={
                          item.value
                        }
                        percentage={
                          item.percentage
                        }
                      />
                    ),
                  )}
                </ReportSection>

                <ReportSection
                  title="Performance"
                  subtitle="Operational metrics">
                  <ReportRow
                    label="Cases handled"
                    value="25"
                    percentage={78}
                  />

                  <ReportRow
                    label="Hearings completed"
                    value="4"
                    percentage={16}
                  />

                  <ReportRow
                    label="Documents processed"
                    value="50"
                    percentage={82}
                  />

                  <ReportRow
                    label="Payments recorded"
                    value="₹47,500"
                    percentage={31}
                  />
                </ReportSection>
              </View>

              {/* ACTIVITY */}

              <View
                style={styles.activitySection}>
                <Text
                  style={
                    styles.activityTitle
                  }>
                  Recent Activity
                </Text>

                <Text
                  style={
                    styles.activitySubtitle
                  }>
                  Latest activity included in
                  this report.
                </Text>

                <View
                  style={
                    styles.activityTable
                  }>
                  <View
                    style={
                      styles.activityHeader
                    }>
                    <Text
                      style={
                        styles.activityHeaderText
                      }>
                      ACTIVITY
                    </Text>

                    <Text
                      style={[
                        styles.activityHeaderText,
                        styles.activityValue,
                      ]}>
                      VALUE
                    </Text>

                    <Text
                      style={[
                        styles.activityHeaderText,
                        styles.activityDate,
                      ]}>
                      DATE
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityRow
                    }>
                    <Text
                      style={
                        styles.activityText
                      }>
                      New case registered
                    </Text>

                    <Text
                      style={
                        styles.activityValueText
                      }>
                      LC-2026-103
                    </Text>

                    <Text
                      style={
                        styles.activityDateText
                      }>
                      23 Jul 2026
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityRow
                    }>
                    <Text
                      style={
                        styles.activityText
                      }>
                      Document uploaded
                    </Text>

                    <Text
                      style={
                        styles.activityValueText
                      }>
                      Petition.pdf
                    </Text>

                    <Text
                      style={
                        styles.activityDateText
                      }>
                      23 Jul 2026
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityRow
                    }>
                    <Text
                      style={
                        styles.activityText
                      }>
                      Payment recorded
                    </Text>

                    <Text
                      style={
                        styles.activityValueText
                      }>
                      ₹25,000
                    </Text>

                    <Text
                      style={
                        styles.activityDateText
                      }>
                      22 Jul 2026
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityRow
                    }>
                    <Text
                      style={
                        styles.activityText
                      }>
                      Hearing scheduled
                    </Text>

                    <Text
                      style={
                        styles.activityValueText
                      }>
                      LC-2026-102
                    </Text>

                    <Text
                      style={
                        styles.activityDateText
                      }>
                      22 Jul 2026
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ClerkReportsScreen;

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

  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  filterWrapperMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  generateButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  reportHeader: {
    paddingTop: 6,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2DED5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reportTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#19324D',
  },

  reportSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#718197',
  },

  exportButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D7DDE3',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  exportText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#263A50',
  },

  sectionsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },

  sectionsColumn: {
    flexDirection: 'column',
  },

  activitySection: {
    marginTop: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    backgroundColor: '#FCFAF5',
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
  },

  activitySubtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#718197',
  },

  activityTable: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2DED5',
    borderRadius: 12,
    overflow: 'hidden',
  },

  activityHeader: {
    minHeight: 44,
    backgroundColor: '#F2EDDF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  activityHeaderText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: '#61738A',
    letterSpacing: 0.6,
  },

  activityValue: {
    maxWidth: 220,
  },

  activityDate: {
    maxWidth: 140,
  },

  activityRow: {
    minHeight: 52,
    borderTopWidth: 1,
    borderTopColor: '#E6E2DA',
    backgroundColor: '#FCFAF5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  activityText: {
    flex: 1,
    fontSize: 12,
    color: '#34485E',
  },

  activityValueText: {
    maxWidth: 220,
    flex: 1,
    fontSize: 12,
    color: '#246BE3',
    fontWeight: '600',
  },

  activityDateText: {
    maxWidth: 140,
    flex: 1,
    fontSize: 12,
    color: '#64758A',
  },
});
