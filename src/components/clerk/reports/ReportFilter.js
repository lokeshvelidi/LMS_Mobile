import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ReportFilter = ({
  reportType,
  onReportTypeChange,
  period,
  onPeriodChange,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterBox}
        onPress={onReportTypeChange}>
        <Text style={styles.filterText}>
          {reportType}
        </Text>

        <Text style={styles.arrow}>
          ⌄
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterBox}
        onPress={onPeriodChange}>
        <Text style={styles.filterText}>
          {period}
        </Text>

        <Text style={styles.arrow}>
          ⌄
        </Text>
      </TouchableOpacity>

      <View style={styles.dateBox}>
        <TextInput
          value={fromDate}
          onChangeText={setFromDate}
          placeholder="dd-mm-yyyy"
          placeholderTextColor="#8797A9"
          style={styles.dateInput}
        />

        <Text style={styles.calendarIcon}>
          ▣
        </Text>
      </View>

      <View style={styles.dateBox}>
        <TextInput
          value={toDate}
          onChangeText={setToDate}
          placeholder="dd-mm-yyyy"
          placeholderTextColor="#8797A9"
          style={styles.dateInput}
        />

        <Text style={styles.calendarIcon}>
          ▣
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.generateButton}
        onPress={() =>
          console.log(
            'Generate report',
          )
        }>
        <Text
          style={
            styles.generateButtonText
          }>
          Generate
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },

  filterBox: {
    width: 190,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterText: {
    fontSize: 13,
    color: '#273A50',
  },

  arrow: {
    fontSize: 18,
    color: '#617388',
  },

  dateBox: {
    width: 175,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  dateInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    color: '#273A50',
    fontSize: 13,
  },

  calendarIcon: {
    fontSize: 14,
    color: '#24384F',
  },

  generateButton: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  generateButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});