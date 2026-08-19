import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import HearingStatusBadge from './HearingStatusBadge';

const HearingCard = ({
  hearing,
  onEdit,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.caseNo}>
            {hearing.caseNo}
          </Text>

          <Text style={styles.client}>
            {hearing.client}
          </Text>
        </View>

        <HearingStatusBadge
          status={hearing.status}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Court
        </Text>

        <Text style={styles.value}>
          {hearing.court}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Date
        </Text>

        <Text style={styles.value}>
          {hearing.date}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Time
        </Text>

        <Text style={styles.value}>
          {hearing.time}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Type
        </Text>

        <Text style={styles.value}>
          {hearing.type}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.editButton}
        onPress={() => onEdit(hearing)}>
        <Text style={styles.editText}>
          Edit Hearing
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HearingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  caseNo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#246BE3',
  },

  client: {
    marginTop: 4,
    fontSize: 13,
    color: '#60758E',
  },

  row: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#708197',
  },

  value: {
    maxWidth: '62%',
    textAlign: 'right',
    fontSize: 12,
    color: '#293D53',
  },

  editButton: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8DEE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#263A50',
  },
});