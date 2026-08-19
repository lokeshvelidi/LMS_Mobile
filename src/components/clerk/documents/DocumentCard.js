import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import DocumentStatusBadge from './DocumentStatusBadge';

const DocumentCard = ({
  document,
  onView,
  onDownload,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.documentInfo}>
          <Text
            style={styles.documentName}>
            {document.name}
          </Text>

          <Text
            style={styles.secondaryText}>
            {document.size}
          </Text>
        </View>

        <DocumentStatusBadge
          status={document.status}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Case
        </Text>

        <Text style={styles.value}>
          {document.caseNo}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Type
        </Text>

        <Text style={styles.value}>
          {document.type}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Uploaded
        </Text>

        <Text style={styles.value}>
          {document.uploaded}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onView(document)
          }>
          <Text style={styles.actionText}>
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            onDownload(document)
          }>
          <Text style={styles.actionText}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentCard;

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
    marginBottom: 10,
  },

  documentInfo: {
    flex: 1,
    paddingRight: 10,
  },

  documentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#246BE3',
  },

  secondaryText: {
    marginTop: 4,
    fontSize: 10,
    color: '#718197',
  },

  row: {
    minHeight: 43,
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