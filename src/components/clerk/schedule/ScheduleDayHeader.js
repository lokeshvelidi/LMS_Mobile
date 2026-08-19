import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ScheduleDayHeader = ({
  day,
  date,
  count,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.day}>
          {day}
        </Text>

        <Text style={styles.date}>
          {date}
        </Text>
      </View>

      <View style={styles.countBadge}>
        <Text style={styles.countText}>
          {count}
        </Text>
      </View>
    </View>
  );
};

export default ScheduleDayHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 62,
    backgroundColor: '#F2EDDF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  day: {
    fontSize: 15,
    fontWeight: '700',
    color: '#19324D',
  },

  date: {
    marginTop: 3,
    fontSize: 12,
    color: '#6D7E92',
  },

  countBadge: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: 9,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#19324D',
  },
});