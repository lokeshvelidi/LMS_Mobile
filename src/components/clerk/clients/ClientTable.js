
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ClientTable = ({
  clients,
  onView,
  onEdit,
}) => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
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
            styles.contactColumn,
          ]}>
          CONTACT
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.caseColumn,
          ]}>
          CASES
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

      {clients.map(client => (
        <View
          key={client.id}
          style={styles.row}>
          <View
            style={[
              styles.clientColumn,
              styles.clientCell,
            ]}>
            <Text style={styles.name}>
              {client.name}
            </Text>

            <Text style={styles.clientId}>
              {client.clientId}
            </Text>
          </View>

          <View
            style={styles.contactColumn}>
            <Text style={styles.cellText}>
              {client.email}
            </Text>

            <Text
              style={styles.secondaryText}>
              {client.phone}
            </Text>
          </View>

          <Text
            style={[
              styles.cellText,
              styles.caseColumn,
            ]}>
            {client.cases}
          </Text>

          <View
            style={[
              styles.statusColumn,
              styles.statusCell,
            ]}>
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

          <View
            style={[
              styles.actionColumn,
              styles.actionCell,
            ]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onView(client)
              }>
              <Text
                style={styles.actionText}>
                View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onEdit(client)
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

export default ClientTable;

const styles = StyleSheet.create({
  table: {
    minWidth: 1050,
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
    minHeight: 72,
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

  clientColumn: {
    width: 230,
    paddingLeft: 20,
  },

  contactColumn: {
    width: 260,
  },

  caseColumn: {
    width: 130,
  },

  statusColumn: {
    width: 170,
  },

  actionColumn: {
    width: 180,
  },

  clientCell: {
    justifyContent: 'center',
  },

  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#19324D',
  },

  clientId: {
    marginTop: 4,
    fontSize: 10,
    color: '#718197',
  },

  cellText: {
    fontSize: 12,
    color: '#34485E',
  },

  secondaryText: {
    marginTop: 4,
    fontSize: 10,
    color: '#718197',
  },

  statusCell: {
    justifyContent: 'center',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    minHeight: 29,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },

  actionCell: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
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