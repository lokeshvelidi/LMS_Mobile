import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import DocumentStatusBadge from './DocumentStatusBadge';

const DocumentTable = ({
  documents,
  onView,
  onDownload,
}) => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            styles.documentColumn,
          ]}>
          DOCUMENT
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
            styles.typeColumn,
          ]}>
          TYPE
        </Text>

        <Text
          style={[
            styles.headerText,
            styles.dateColumn,
          ]}>
          UPLOADED
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

      {documents.map(document => (
        <View
          key={document.id}
          style={styles.row}>
          <View
            style={styles.documentColumn}>
            <Text
              style={styles.documentName}>
              {document.name}
            </Text>

            <Text
              style={styles.secondaryText}>
              {document.size}
            </Text>
          </View>

          <Text
            style={[
              styles.caseColumn,
              styles.cellText,
            ]}>
            {document.caseNo}
          </Text>

          <Text
            style={[
              styles.typeColumn,
              styles.cellText,
            ]}>
            {document.type}
          </Text>

          <Text
            style={[
              styles.dateColumn,
              styles.cellText,
            ]}>
            {document.uploaded}
          </Text>

          <View
            style={[
              styles.statusColumn,
              styles.statusCell,
            ]}>
            <DocumentStatusBadge
              status={
                document.status
              }
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
                onView(document)
              }>
              <Text
                style={styles.actionText}>
                View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onDownload(document)
              }>
              <Text
                style={styles.actionText}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DocumentTable;

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

  documentColumn: {
    width: 260,
    paddingLeft: 20,
  },

  caseColumn: {
    width: 180,
  },

  typeColumn: {
    width: 180,
  },

  dateColumn: {
    width: 180,
  },

  statusColumn: {
    width: 170,
  },

  actionColumn: {
    width: 210,
  },

  documentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#246BE3',
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

  statusCell: {
    justifyContent: 'center',
  },

  actionCell: {
    flexDirection: 'row',
    gap: 7,
  },

  actionButton: {
    height: 34,
    minWidth: 65,
    paddingHorizontal: 11,
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