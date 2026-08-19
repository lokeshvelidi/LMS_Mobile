import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CaseStatusBadge from './CaseStatusBadge';
import CasePriorityBadge from './CasePriorityBadge';

const CaseCard = ({
  item,
  onView,
  onEdit,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.caseNo}>
            {item.caseNo}
          </Text>

          <Text style={styles.client}>
            {item.client}
          </Text>
        </View>

        <CaseStatusBadge
          status={item.status}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Case Type
        </Text>

        <Text style={styles.value}>
          {item.type}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Priority
        </Text>

        <CasePriorityBadge
          priority={item.priority}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Client ID
        </Text>

        <Text style={styles.value}>
          {item.clientId}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onView(item)
          }>
          <Text style={styles.actionText}>
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onEdit(item)
          }>
          <Text style={styles.actionText}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CaseCard;

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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  caseNo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#246BE3',
  },

  client: {
    marginTop: 4,
    fontSize: 12,
    color: '#60758E',
  },

  row: {
    minHeight: 44,
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 11,
    color: '#718197',
  },

  value: {
    maxWidth: '60%',
    textAlign: 'right',
    fontSize: 12,
    color: '#34485E',
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },

  actionButton: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D8DEE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#263A50',
  },
});