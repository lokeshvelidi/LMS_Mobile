import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const BillingOverview = ({
  total = '₹0',
  received = '₹0',
  pending = '₹0',
  overdue = '₹0',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Billing Overview
      </Text>

      <Text style={styles.subtitle}>
        Current payment summary
      </Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>
          Total Billed
        </Text>

        <Text style={styles.totalValue}>
          {total}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>
            Received
          </Text>

          <Text
            style={[
              styles.value,
              styles.green,
            ]}>
            {received}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>
            Pending
          </Text>

          <Text
            style={[
              styles.value,
              styles.yellow,
            ]}>
            {pending}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>
            Overdue
          </Text>

          <Text
            style={[
              styles.value,
              styles.red,
            ]}>
            {overdue}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BillingOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 300,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    padding: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#718197',
  },

  totalBox: {
    marginTop: 18,
    padding: 15,
    borderRadius: 13,
    backgroundColor: '#F2EDDF',
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#718197',
  },

  totalValue: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '700',
    color: '#19324D',
  },

  row: {
    flexDirection: 'row',
    marginTop: 16,
  },

  item: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    color: '#718197',
  },

  value: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '700',
  },

  green: {
    color: '#2B8A4B',
  },

  yellow: {
    color: '#C89B25',
  },

  red: {
    color: '#C94A42',
  },
});