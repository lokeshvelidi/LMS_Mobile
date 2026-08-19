import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CalendarHeader = ({
  month,
  year,
  onPrevious,
  onNext,
  onToday,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.navButton}
          activeOpacity={0.8}
          onPress={onPrevious}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {month} {year}
        </Text>

        <TouchableOpacity
          style={styles.navButton}
          activeOpacity={0.8}
          onPress={onNext}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.todayButton}
        activeOpacity={0.8}
        onPress={onToday}>
        <Text style={styles.todayText}>
          Today
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  navButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#D9DEE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navText: {
    fontSize: 25,
    lineHeight: 28,
    color: '#263A50',
  },

  monthText: {
    minWidth: 150,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: '#19324D',
  },

  todayButton: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9DEE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#263A50',
  },
});