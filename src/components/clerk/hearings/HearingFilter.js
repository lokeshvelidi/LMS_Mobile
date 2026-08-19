import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const HearingFilter = ({
  search,
  setSearch,
  status,
  onStatusChange,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  rows,
  onRowsChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search case / client"
          placeholderTextColor="#8797A9"
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterBox}
        onPress={onStatusChange}>
        <Text style={styles.filterText}>
          {status}
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
        activeOpacity={0.8}
        style={styles.filterBox}
        onPress={onRowsChange}>
        <Text style={styles.filterText}>
          {rows} rows
        </Text>

        <Text style={styles.arrow}>
          ⌄
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HearingFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },

  searchBox: {
    width: 220,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    fontSize: 13,
    color: '#273A50',
  },

  filterBox: {
    width: 175,
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
    fontSize: 13,
    color: '#273A50',
  },

  calendarIcon: {
    fontSize: 14,
    color: '#24384F',
  },
});