import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {getClerkDashboard} from '../../../services/api/clerkService';

const { width } = Dimensions.get('window');

/* Dashboard values come from the backend. */
const stats = [
  {
    title: 'OPEN CASES YOU SUPPORT',
    value: '12',
    type: 'blue',
  },
  {
    title: 'UPCOMING HEARINGS',
    value: '0',
    type: 'green',
  },
  {
    title: 'OUTSTANDING INVOICES',
    value: '₹ 17,700',
    type: 'yellow',
  },
  {
    title: 'OVERDUE INVOICES',
    value: '₹ 17,700',
    type: 'red',
  },
  {
    title: 'UNASSIGNED CLIENTS',
    value: '1',
    type: 'blue',
  },
  {
    title: 'FIRM-WIDE COLLECTED TO DATE',
    value: '₹ 260,000',
    type: 'green',
  },
];

const caseStatus = [
  {
    label: 'New',
    value: 4,
    color: '#2864E6',
  },
  {
    label: 'Ready for Closure',
    value: 1,
    color: '#F5A000',
  },
  {
    label: 'In Progress',
    value: 4,
    color: '#16A34A',
  },
  {
    label: 'Pending',
    value: 2,
    color: '#E52424',
  },
  {
    label: 'Adjourned',
    value: 1,
    color: '#64748B',
  },
];

const billingData = [
  {
    label: 'Outstanding',
    value: '₹ 17,700',
    color: '#D7B233',
  },
  {
    label: 'Overdue',
    value: '₹ 17,700',
    color: '#E52424',
  },
  {
    label: 'Collected',
    value: '₹ 260,000',
    color: '#061D2C',
  },
];

const getAccentColor = type => {
  switch (type) {
    case 'blue':
      return '#2864E6';
    case 'green':
      return '#16A34A';
    case 'yellow':
      return '#D7B233';
    case 'red':
      return '#E52424';
    default:
      return '#2864E6';
  }
};

const StatCard = ({ title, value, type }) => {
  return (
    <View
      style={[
        styles.statCard,
        {
          borderLeftColor: getAccentColor(type),
        },
      ]}
    >
      <Text style={styles.statTitle}>{title}</Text>

      <Text
        style={[
          styles.statValue,
          value.length > 8 && styles.smallStatValue,
        ]}
      >
        {value}
      </Text>

      <View style={styles.statDecoration} />
    </View>
  );
};

const CaseStatusChart = () => {
  const total = caseStatus.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Case Status Overview</Text>

      <View style={styles.donutWrapper}>
        <View style={styles.donut}>
          {caseStatus.map((item, index) => {
            const percentage = (item.value / total) * 100;

            return (
              <View
                key={item.label}
                style={[
                  styles.donutSegment,
                  {
                    backgroundColor: item.color,
                    height: `${percentage}%`,
                    transform: [
                      {
                        translateY: index * 0.5,
                      },
                    ],
                  },
                ]}
              />
            );
          })}

          <View style={styles.donutCenter}>
            <Text style={styles.donutTotal}>{total}</Text>
            <Text style={styles.donutText}>Cases</Text>
          </View>
        </View>
      </View>

      <View style={styles.legend}>
        {caseStatus.map(item => (
          <View
            style={styles.legendItem}
            key={item.label}
          >
            <View
              style={[
                styles.legendColor,
                {
                  backgroundColor: item.color,
                },
              ]}
            />

            <Text style={styles.legendText}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const BillingChart = () => {
  const maxValue = 260000;

  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Billing Overview</Text>

      <View style={styles.billingChart}>
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>300,000</Text>
          <Text style={styles.axisText}>250,000</Text>
          <Text style={styles.axisText}>200,000</Text>
          <Text style={styles.axisText}>150,000</Text>
          <Text style={styles.axisText}>100,000</Text>
          <Text style={styles.axisText}>50,000</Text>
          <Text style={styles.axisText}>0</Text>
        </View>

        <View style={styles.barsContainer}>
          {billingData.map(item => {
            const numericValue =
              item.label === 'Collected'
                ? 260000
                : 17700;

            const height =
              (numericValue / maxValue) * 300;

            return (
              <View
                style={styles.barColumn}
                key={item.label}
              >
                <View
                  style={[
                    styles.bar,
                    {
                      height,
                      backgroundColor: item.color,
                    },
                  ]}
                />

                <Text style={styles.barLabel}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const ClerkDashboardScreen = () => {
  const [dashboardStats, setDashboardStats] = useState([]);
  useEffect(() => { getClerkDashboard().then((data) => { const summary = data.summary || {}; const fields = [['OPEN CASES YOU SUPPORT', 'openCases'], ['UPCOMING HEARINGS', 'upcomingHearings'], ['OUTSTANDING INVOICES', 'outstandingInvoices'], ['OVERDUE INVOICES', 'overdueInvoices'], ['UNASSIGNED CLIENTS', 'unassignedClients'], ['FIRM-WIDE COLLECTED TO DATE', 'collectedToDate']]; setDashboardStats(fields.map(([title, key], index) => ({title, value: summary[key] != null ? String(summary[key]) : '—', type: ['blue','green','yellow','red','blue','green'][index]}))); }).catch(() => setDashboardStats([])); }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Dashboard</Text>

          <Text style={styles.subtitle}>
            Welcome back! Here's what's happening today.
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          {dashboardStats.map(item => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              type={item.type}
            />
          ))}
        </View>

        {/* Charts */}
        <View style={styles.chartsRow}>
          <CaseStatusChart />
          <BillingChart />
        </View>

        {/* Upcoming hearings */}
        <View style={styles.upcomingCard}>
          <Text style={styles.sectionTitle}>
            Upcoming Hearings
          </Text>

          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No upcoming hearings.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClerkDashboardScreen;

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

  subtitle: {
    fontSize: 15,
    color: '#64748B',
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    minWidth: width > 900 ? 180 : 150,
    height: 105,
    backgroundColor: '#FAF7EF',
    borderRadius: 16,
    borderLeftWidth: 4,
    paddingHorizontal: 16,
    paddingVertical: 15,
    overflow: 'hidden',
    position: 'relative',
  },

  statTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#63758B',
    letterSpacing: 1,
    marginBottom: 12,
  },

  statValue: {
    fontSize: 25,
    fontWeight: '700',
    color: '#17324D',
  },

  smallStatValue: {
    fontSize: 20,
  },

  statDecoration: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#F3EEDD',
    right: -10,
    bottom: -18,
  },

  chartsRow: {
    flexDirection: width > 900 ? 'row' : 'column',
    gap: 16,
    marginBottom: 20,
  },

  chartCard: {
    flex: 1,
    minHeight: 430,
    backgroundColor: '#FAF7EF',
    borderRadius: 18,
    padding: 20,
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#18314D',
    marginBottom: 20,
  },

  donutWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  donut: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#2864E6',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  donutSegment: {
    position: 'absolute',
    width: 210,
    left: 0,
    bottom: 0,
  },

  donutCenter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FAF7EF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },

  donutTotal: {
    fontSize: 25,
    fontWeight: '700',
    color: '#17324D',
  },

  donutText: {
    fontSize: 12,
    color: '#64748B',
  },

  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 22,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendColor: {
    width: 28,
    height: 8,
    marginRight: 6,
  },

  legendText: {
    fontSize: 11,
    color: '#52677F',
  },

  billingChart: {
    height: 350,
    flexDirection: 'row',
    marginTop: 10,
  },

  yAxis: {
    width: 55,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  axisText: {
    fontSize: 9,
    color: '#6B7280',
  },

  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#D8D8D8',
    paddingHorizontal: 20,
    paddingBottom: 0,
  },

  barColumn: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 90,
  },

  bar: {
    width: 55,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 8,
  },

  barLabel: {
    position: 'absolute',
    bottom: -25,
    fontSize: 10,
    color: '#52677F',
  },

  upcomingCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 18,
    minHeight: 180,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#18314D',
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },

  emptyText: {
    color: '#73849A',
    fontSize: 14,
  },
});
