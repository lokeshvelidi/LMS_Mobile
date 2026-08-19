import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const HearingCalendarItem = ({
  hearing,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={() => onPress?.(hearing)}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {hearing.time}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.caseNo}>
          {hearing.caseNo}
        </Text>

        <Text style={styles.client}>
          {hearing.client}
        </Text>

        <View style={styles.details}>
          <Text style={styles.detail}>
            {hearing.court}
          </Text>

          <Text style={styles.separator}>
            •
          </Text>

          <Text style={styles.detail}>
            {hearing.type}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.status,
          {
            backgroundColor:
              hearing.status ===
              'Scheduled'
                ? '#DDEEE2'
                : '#F8E5C8',
          },
        ]}>
        <Text
          style={[
            styles.statusText,
            {
              color:
                hearing.status ===
                'Scheduled'
                  ? '#287A43'
                  : '#A36B12',
            },
          ]}>
          {hearing.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HearingCalendarItem;

const styles = StyleSheet.create({
  container: {
    minHeight: 78,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1DDD4',
    backgroundColor: '#FCFAF5',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  timeContainer: {
    width: 75,
  },

  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#19324D',
  },

  content: {
    flex: 1,
  },

  caseNo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#246BE3',
  },

  client: {
    marginTop: 3,
    fontSize: 12,
    color: '#60758E',
  },

  details: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  detail: {
    fontSize: 10,
    color: '#718197',
  },

  separator: {
    marginHorizontal: 6,
    color: '#A0AAB6',
  },

  status: {
    minHeight: 28,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
});