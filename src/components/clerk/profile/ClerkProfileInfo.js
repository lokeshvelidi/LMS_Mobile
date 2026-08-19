import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ClerkProfileInfo = ({
  title,
  items,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.content}>
        {items.map((item, index) => (
          <View
            key={`${item.label}-${index}`}
            style={[
              styles.row,
              index === items.length - 1 &&
                styles.lastRow,
            ]}>
            <Text style={styles.label}>
              {item.label}
            </Text>

            <Text style={styles.value}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ClerkProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 10,
  },

  content: {
    marginTop: 2,
  },

  row: {
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E3DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  label: {
    fontSize: 12,
    color: '#718197',
  },

  value: {
    maxWidth: '62%',
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: '#293D53',
  },
});