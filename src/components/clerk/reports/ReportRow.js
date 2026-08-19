import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ReportRow = ({
  label,
  value,
  percentage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>
          {label}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>

      {percentage !== undefined ? (
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progress,
              {
                width: `${Math.min(
                  percentage,
                  100,
                )}%`,
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ReportRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E2DA',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    flex: 1,
    fontSize: 13,
    color: '#526477',
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#19324D',
  },

  progressBackground: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#E6E9EC',
    marginTop: 8,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#294C70',
  },
});