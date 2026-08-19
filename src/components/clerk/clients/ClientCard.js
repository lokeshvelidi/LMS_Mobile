import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ClientCard = ({
  client,
  onView,
  onEdit,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>
            {client.name}
          </Text>

          <Text style={styles.clientId}>
            {client.clientId}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                client.status ===
                'Active'
                  ? '#DDEEE2'
                  : '#F7DEDB',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  client.status ===
                  'Active'
                    ? '#287A43'
                    : '#B7443B',
              },
            ]}>
            {client.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Email
        </Text>

        <Text style={styles.value}>
          {client.email}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Phone
        </Text>

        <Text style={styles.value}>
          {client.phone}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Cases
        </Text>

        <Text style={styles.value}>
          {client.cases}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onView(client)
          }>
          <Text style={styles.actionText}>
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onEdit(client)
          }>
          <Text style={styles.actionText}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientCard;

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

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
  },

  clientId: {
    marginTop: 4,
    fontSize: 10,
    color: '#718197',
  },

  statusBadge: {
    minHeight: 28,
    paddingHorizontal: 11,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },

  infoRow: {
    minHeight: 42,
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 11,
    color: '#718197',
  },

  value: {
    maxWidth: '62%',
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