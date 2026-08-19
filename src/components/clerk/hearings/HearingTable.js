import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import HearingStatusBadge from './HearingStatusBadge';

const HearingTable = ({
  hearings,
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
            styles.courtColumn,
          ]}>
          COURT
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.dateColumn,
          ]}>
          DATE
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.timeColumn,
          ]}>
          TIME
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.typeColumn,
          ]}>
          TYPE
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

      {hearings.map((hearing, index) => (
        <View
          key={hearing.id}
          style={[
            styles.row,
            index === 0 &&
              styles.highlightRow,
          ]}>
          <Text
            style={[
              styles.cellText,
              styles.caseColumn,
              styles.caseLink,
            ]}>
            {hearing.caseNo}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.clientColumn,
            ]}>
            {hearing.client}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.courtColumn,
            ]}>
            {hearing.court}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.dateColumn,
            ]}>
            {hearing.date}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.timeColumn,
            ]}>
            {hearing.time}
          </Text>

          <Text
            style={[
              styles.cellText,
              styles.typeColumn,
            ]}>
            {hearing.type}
          </Text>

          <View
            style={[
              styles.statusColumn,
              styles.statusCell,
            ]}>
            <HearingStatusBadge
              status={hearing.status}
            />
          </View>

          <View
            style={[
              styles.actionColumn,
              styles.actionCell,
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editButton}
              onPress={() =>
                onEdit(hearing)
              }>
              <Text style={styles.editText}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default HearingTable;

const styles = StyleSheet.create({
  table: {
    minWidth: 1400,
    borderWidth: 1,
    borderColor: '#E2DED5',
    borderRadius: 18,
    overflow: 'hidden',
  },

  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2EDDF',
  },

  row: {
    minHeight: 66,
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

  caseLink: {
    color: '#246BE3',
    fontWeight: '600',
  },

  caseColumn: {
    width: 180,
    paddingLeft: 20,
  },

  clientColumn: {
    width: 210,
  },

  courtColumn: {
    width: 230,
  },

  dateColumn: {
    width: 170,
  },

  timeColumn: {
    width: 140,
  },

  typeColumn: {
    width: 170,
  },

  statusColumn: {
    width: 190,
  },

  actionColumn: {
    width: 120,
  },

  statusCell: {
    justifyContent: 'center',
  },

  actionCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    minWidth: 64,
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
});