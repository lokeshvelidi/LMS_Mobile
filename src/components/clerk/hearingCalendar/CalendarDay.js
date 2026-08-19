import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CalendarDay = ({
  day,
  date,
  isToday,
  isSelected,
  hearings,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.day,
        isToday && styles.todayDay,
        isSelected && styles.selectedDay,
      ]}
      onTouchEnd={onPress}>
      <View style={styles.dateHeader}>
        <Text
          style={[
            styles.dayName,
            isToday && styles.todayText,
          ]}>
          {day}
        </Text>

        <View
          style={[
            styles.dateCircle,
            isToday && styles.todayCircle,
          ]}>
          <Text
            style={[
              styles.dateText,
              isToday && styles.todayDateText,
            ]}>
            {date}
          </Text>
        </View>
      </View>

      <View style={styles.events}>
        {hearings.map(hearing => (
          <View
            key={hearing.id}
            style={[
              styles.event,
              {
                backgroundColor:
                  hearing.color ||
                  '#DDE7F7',
              },
            ]}>
            <Text
              numberOfLines={1}
              style={styles.eventTime}>
              {hearing.time}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.eventCase}>
              {hearing.caseNo}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.eventClient}>
              {hearing.client}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  day: {
    flex: 1,
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#E2DED5',
    backgroundColor: '#FCFAF5',
    padding: 8,
  },

  todayDay: {
    backgroundColor: '#F5F0E2',
  },

  selectedDay: {
    borderColor: '#294C70',
    borderWidth: 2,
  },

  dateHeader: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dayName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#718197',
    textTransform: 'uppercase',
  },

  todayText: {
    color: '#19324D',
  },

  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayCircle: {
    backgroundColor: '#19324D',
  },

  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#394C61',
  },

  todayDateText: {
    color: '#FFFFFF',
  },

  events: {
    marginTop: 5,
    gap: 5,
  },

  event: {
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#294C70',
  },

  eventTime: {
    fontSize: 9,
    fontWeight: '700',
    color: '#526477',
  },

  eventCase: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    color: '#19324D',
  },

  eventClient: {
    marginTop: 2,
    fontSize: 9,
    color: '#64758A',
  },
});