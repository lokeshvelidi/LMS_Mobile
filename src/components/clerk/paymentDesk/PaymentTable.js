import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import PaymentStatusBadge from './PaymentStatusBadge';

const PaymentTable = ({
  payments,
  onView,
  onRecord,
}) => {
  return (
    <View style={styles.table}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            styles.invoiceColumn,
          ]}>
          INVOICE
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.caseColumn,
          ]}>
          CASE NO.
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.clientColumn,
          ]}>
          CLIENT
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.amountColumn,
          ]}>
          AMOUNT
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.dueColumn,
          ]}>
          DUE DATE
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.statusColumn,
          ]}>
          STATUS
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.actionColumn,
          ]}>
          ACTIONS
        </Text>
      </View>

      {/* ROWS */}

      {payments.map((payment, index) => (
        <View
          key={payment.id}
          style={[
            styles.row,
            index === 0 &&
              styles.highlightRow,
          ]}>
          <Text
            style={[
              styles.cellText,
              styles.invoiceColumn,
              styles.invoiceText,
            ]}>
            {payment.invoice}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.caseColumn,
            ]}>
            {payment.caseNo}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.clientColumn,
            ]}>
            {payment.client}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.amountColumn,
              styles.amountText,
            ]}>
            {payment.amount}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.dueColumn,
            ]}>
            {payment.dueDate}
          </Text>

          <View
            style={[
              styles.statusColumn,
              styles.statusCell,
            ]}>
            <PaymentStatusBadge
              status={payment.status}
            />
          </View>

          <View
            style={[
              styles.actionColumn,
              styles.actionCell,
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}
              onPress={() =>
                onView(payment)
              }>
              <Text
                style={styles.actionText}>
                View
              </Text>
            </TouchableOpacity>

            {payment.status !== 'Paid' && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.recordButton}
                onPress={() =>
                  onRecord(payment)
                }>
                <Text
                  style={styles.recordText}>
                  Record
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default PaymentTable;

const styles = StyleSheet.create({
  table: {
    minWidth: 1250,
    borderWidth: 1,
    borderColor: '#E2DED5',
    borderRadius: 18,
    overflow: 'hidden',
  },

  header: {
    height: 50,
    backgroundColor: '#F2EDDF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
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

  headerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#61738A',
    letterSpacing: 0.7,
  },

  cellText: {
    fontSize: 13,
    color: '#27394E',
  },

  invoiceText: {
    color: '#246BE3',
    fontWeight: '600',
  },

  amountText: {
    fontWeight: '600',
    color: '#19324D',
  },

  invoiceColumn: {
    width: 160,
    paddingLeft: 20,
  },

  caseColumn: {
    width: 180,
  },

  clientColumn: {
    width: 210,
  },

  amountColumn: {
    width: 150,
  },

  dueColumn: {
    width: 170,
  },

  statusColumn: {
    width: 190,
  },

  actionColumn: {
    width: 210,
  },

  statusCell: {
    justifyContent: 'center',
  },

  actionCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  actionButton: {
    minWidth: 58,
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

  recordButton: {
    minWidth: 65,
    height: 34,
    paddingHorizontal: 12,
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
});