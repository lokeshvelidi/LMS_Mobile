import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ScheduleHearingCard = ({
  hearing,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress?.(hearing)}>
      <View style={styles.timeColumn}>
        <Text style={styles.time}>
          {hearing.time}
        </Text>

        <View style={styles.timeLine} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.caseContainer}>
            <Text style={styles.caseNo}>
              {hearing.caseNo}
            </Text>

            <Text style={styles.client}>
              {hearing.client}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
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
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>
            {hearing.court}
          </Text>

          <Text style={styles.separator}>
            •
          </Text>

          <Text style={styles.detailText}>
            {hearing.type}
          </Text>

          <Text style={styles.separator}>
            •
          </Text>

          <Text style={styles.detailText}>
            {hearing.room}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleHearingCard;

const styles = StyleSheet.create({
  card: {
    minHeight: 105,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    marginTop: 10,
    padding: 14,
    flexDirection: 'row',
  },

  timeColumn: {
    width: 82,
    alignItems: 'center',
    paddingTop: 3,
  },

  time: {
    fontSize: 13,
    fontWeight: '700',
    color: '#19324D',
    textAlign: 'center',
  },

  timeLine: {
    width: 1,
    flex: 1,
    backgroundColor: '#D9DEE3',
    marginTop: 8,
  },

  content: {
    flex: 1,
    paddingLeft: 12,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  caseContainer: {
    flex: 1,
    paddingRight: 10,
  },

  caseNo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#246BE3',
  },

  client: {
    marginTop: 4,
    fontSize: 13,
    color: '#60758E',
  },

  statusBadge: {
    minHeight: 28,
    paddingHorizontal: 11,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 13,
  },

  detailText: {
    fontSize: 11,
    color: '#64758A',
  },

  separator: {
    marginHorizontal: 7,
    fontSize: 11,
    color: '#A0AAB6',
  },
});