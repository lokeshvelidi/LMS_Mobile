import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ClientFilter = ({
  search,
  setSearch,
  status,
  onStatusChange,
  rows,
  onRowsChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search client"
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

export default ClientFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },

  searchBox: {
    width: 240,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    color: '#273A50',
    fontSize: 13,
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
});