import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CaseStatusBadge from './CaseStatusBadge';
import CasePriorityBadge from './CasePriorityBadge';

const CaseTable = ({
  cases,
  onView,
  onEdit,
}) => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
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
            styles.typeColumn,
          ]}>
          CASE TYPE
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.priorityColumn,
          ]}>
          PRIORITY
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

      {cases.map(item => (
        <View
          key={item.id}
          style={styles.row}>
          <Text
            style={[
              styles.caseColumn,
              styles.caseNo,
            ]}>
            {item.caseNo}
          </Text>

          <View
            style={styles.clientColumn}>
            <Text style={styles.clientName}>
              {item.client}
            </Text>

            <Text
              style={styles.secondaryText}>
              {item.clientId}
            </Text>
          </View>

          <Text
            style={[
              styles.typeColumn,
              styles.cellText,
            ]}>
            {item.type}
          </Text>

          <View
            style={[
              styles.priorityColumn,
              styles.badgeCell,
            ]}>
            <CasePriorityBadge
              priority={item.priority}
            />
          </View>

          <View
            style={[
              styles.statusColumn,
              styles.badgeCell,
            ]}>
            <CaseStatusBadge
              status={item.status}
            />
          </View>

          <View
            style={[
              styles.actionColumn,
              styles.actionCell,
            ]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onView(item)
              }>
              <Text
                style={styles.actionText}>
                View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onEdit(item)
              }>
              <Text
                style={styles.actionText}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CaseTable;

const styles = StyleSheet.create({
  table: {
    minWidth: 1200,
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
    minHeight: 70,
    backgroundColor: '#FCFAF5',
    borderTopWidth: 1,
    borderTopColor: '#E6E2DA',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#61738A',
    letterSpacing: 0.7,
  },

  caseColumn: {
    width: 180,
    paddingLeft: 20,
  },

  clientColumn: {
    width: 220,
  },

  typeColumn: {
    width: 190,
  },

  priorityColumn: {
    width: 150,
  },

  statusColumn: {
    width: 170,
  },

  actionColumn: {
    width: 190,
  },

  caseNo: {
    color: '#246BE3',
    fontSize: 13,
    fontWeight: '700',
  },

  clientName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#19324D',
  },

  secondaryText: {
    marginTop: 4,
    fontSize: 10,
    color: '#718197',
  },

  cellText: {
    fontSize: 12,
    color: '#34485E',
  },

  badgeCell: {
    justifyContent: 'center',
  },

  actionCell: {
    flexDirection: 'row',
    gap: 7,
  },

  actionButton: {
    height: 34,
    minWidth: 58,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8DEE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#263A50',
  },
});