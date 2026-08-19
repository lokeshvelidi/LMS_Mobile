import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CaseStatusChart = ({
  data = [],
}) => {
  const total = data.reduce(
    (sum, item) =>
      sum + Number(item.value || 0),
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Case Status
      </Text>

      <Text style={styles.subtitle}>
        Current case distribution
      </Text>

      <View style={styles.chartArea}>
        {data.map((item, index) => {
          const percentage =
            total > 0
              ? (item.value / total) *
                100
              : 0;

          return (
            <View
              key={`${item.label}-${index}`}
              style={styles.item}>
              <View style={styles.labelRow}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        item.color ||
                        '#294C70',
                    },
                  ]}
                />

                <Text
                  style={styles.label}>
                  {item.label}
                </Text>

                <Text
                  style={styles.value}>
                  {item.value}
                </Text>
              </View>

              <View
                style={styles.progressBackground}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${percentage}%`,
                      backgroundColor:
                        item.color ||
                        '#294C70',
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CaseStatusChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 300,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    padding: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#718197',
  },

  chartArea: {
    marginTop: 18,
  },

  item: {
    marginBottom: 14,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },

  label: {
    flex: 1,
    fontSize: 12,
    color: '#526477',
  },

  value: {
    fontSize: 12,
    fontWeight: '700',
    color: '#19324D',
  },

  progressBackground: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#E5E8EB',
    marginTop: 7,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    borderRadius: 5,
  },
});