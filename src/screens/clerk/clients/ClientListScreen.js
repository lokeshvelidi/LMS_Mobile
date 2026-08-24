import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {getClerkClients} from '../../../services/api/clerkService';
import {SidebarMenuButton} from '../../../components/navigation/RoleSidebar';

const CLIENTS = [
  {
    id: '1',
    name: 'Anitha Sharma',
    mobile: '9876543212',
    email: 'anitha@gmail.com',
    address: 'Miyapur',
    created: '23 Jul 2026',
  },
  {
    id: '2',
    name: 'Farhan Khan',
    mobile: '9876543219',
    email: 'farhan@gmail.com',
    address: 'Mehdipatnam',
    created: '23 Jul 2026',
  },
  {
    id: '3',
    name: 'Kiran Babu',
    mobile: '9876543215',
    email: 'kiran@gmail.com',
    address: 'KPHB',
    created: '23 Jul 2026',
  },
  {
    id: '4',
    name: 'Lakshmi Devi',
    mobile: '9876543214',
    email: 'lakshmi@gmail.com',
    address: 'Ameerpet',
    created: '23 Jul 2026',
  },
  {
    id: '5',
    name: 'Mohammed Ali',
    mobile: '9876543213',
    email: 'ali@gmail.com',
    address: 'Secunderabad',
    created: '23 Jul 2026',
  },
  {
    id: '6',
    name: 'Naveen Reddy',
    mobile: '9876543218',
    email: 'naveen@gmail.com',
    address: 'Madhapur',
    created: '23 Jul 2026',
  },
];

const ClientListScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [rows, setRows] = useState(10);
  const [clients, setClients] = useState([]);
  useEffect(() => { getClerkClients().then((items) => setClients(items.map((item) => ({...item, id: item.clientId, name: item.name ?? '-', mobile: item.mobile ?? item.phone ?? '-', email: item.email ?? '-', address: item.address ?? '-', created: item.createdDate ?? '-'})))).catch(() => setClients([])); }, []);

  const isMobile = width < 700;

  const filteredClients = useMemo(() => {
    let data = [...clients];

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(client =>
        `${client.name} ${client.mobile} ${client.email}`
          .toLowerCase()
          .includes(value),
      );
    }

    data.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return sortOrder === 'Ascending'
        ? comparison
        : -comparison;
    });

    return data.slice(0, rows);
  }, [search, sortOrder, rows, clients]);

  const handleAddClient = () => {
    // Navigation will be connected later
    // when the Add Client screen is created.
    if (navigation) {
      // navigation.navigate('AddClient');
    }
  };

  const handleEditClient = client => {
    // Navigation will be connected later.
    console.log('Edit client:', client);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* PAGE HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>Clients</Text>
            <SidebarMenuButton role="clerk" />
          </View>

          <Text style={styles.pageSubtitle}>
            Manage your client directory.
          </Text>
        </View>

        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          {/* FILTER SECTION */}
          <View
            style={[
              styles.filterRow,
              isMobile && styles.filterRowMobile,
            ]}>
            {/* SEARCH */}
            <View
              style={[
                styles.searchWrapper,
                isMobile && styles.mobileInput,
              ]}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search name / mobile / email"
                placeholderTextColor="#8A99AA"
                style={styles.input}
              />
            </View>

            {/* SORT */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectBox,
                isMobile && styles.mobileInput,
              ]}
              onPress={() =>
                setSortOrder(current =>
                  current === 'Ascending'
                    ? 'Descending'
                    : 'Ascending',
                )
              }>
              <Text style={styles.selectText}>
                Sort by Name
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* ORDER */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectBox,
                isMobile && styles.mobileInput,
              ]}
              onPress={() =>
                setSortOrder(current =>
                  current === 'Ascending'
                    ? 'Descending'
                    : 'Ascending',
                )
              }>
              <Text style={styles.selectText}>
                {sortOrder}
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* FROM DATE */}
            <View
              style={[
                styles.dateBox,
                isMobile && styles.mobileInput,
              ]}>
              <TextInput
                value={fromDate}
                onChangeText={setFromDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8A99AA"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>▣</Text>
            </View>

            {/* TO DATE */}
            <View
              style={[
                styles.dateBox,
                isMobile && styles.mobileInput,
              ]}>
              <TextInput
                value={toDate}
                onChangeText={setToDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#8A99AA"
                style={styles.dateInput}
              />

              <Text style={styles.calendarIcon}>▣</Text>
            </View>

            {/* ROWS */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectBox,
                isMobile && styles.mobileInput,
              ]}
              onPress={() =>
                setRows(current =>
                  current === 10 ? 25 : 10,
                )
              }>
              <Text style={styles.selectText}>
                {rows} rows
              </Text>

              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {/* ADD CLIENT */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.addButton}
              onPress={handleAddClient}>
              <Text style={styles.addButtonText}>
                + Add Client
              </Text>
            </TouchableOpacity>
          </View>

          {/* TABLE */}
          {isMobile ? (
            <View style={styles.mobileList}>
              {filteredClients.map(client => (
                <View
                  key={client.id}
                  style={styles.clientCard}>
                  <View style={styles.clientCardHeader}>
                    <Text style={styles.clientName}>
                      {client.name}
                    </Text>

                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        handleEditClient(client)
                      }>
                      <Text style={styles.editText}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.mobileInfoRow}>
                    <Text style={styles.mobileLabel}>
                      Mobile
                    </Text>

                    <Text style={styles.mobileValue}>
                      {client.mobile}
                    </Text>
                  </View>

                  <View style={styles.mobileInfoRow}>
                    <Text style={styles.mobileLabel}>
                      Email
                    </Text>

                    <Text style={styles.mobileValue}>
                      {client.email}
                    </Text>
                  </View>

                  <View style={styles.mobileInfoRow}>
                    <Text style={styles.mobileLabel}>
                      Address
                    </Text>

                    <Text style={styles.mobileValue}>
                      {client.address}
                    </Text>
                  </View>

                  <View style={styles.mobileInfoRow}>
                    <Text style={styles.mobileLabel}>
                      Created
                    </Text>

                    <Text style={styles.mobileValue}>
                      {client.created}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}>
              <View style={styles.table}>
                {/* TABLE HEADER */}
                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerCell,
                      styles.nameColumn,
                    ]}>
                    NAME
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.mobileColumn,
                    ]}>
                    MOBILE
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.emailColumn,
                    ]}>
                    EMAIL
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.addressColumn,
                    ]}>
                    ADDRESS
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.createdColumn,
                    ]}>
                    CREATED
                  </Text>

                  <Text
                    style={[
                      styles.headerCell,
                      styles.actionColumn,
                    ]}>
                    ACTIONS
                  </Text>
                </View>

                {/* TABLE ROWS */}
                {filteredClients.map((client, index) => (
                  <View
                    key={client.id}
                    style={[
                      styles.tableRow,
                      index === 0 &&
                        styles.firstTableRow,
                    ]}>
                    <Text
                      style={[
                        styles.cellText,
                        styles.nameColumn,
                      ]}>
                      {client.name}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.mobileColumn,
                      ]}>
                      {client.mobile}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.emailColumn,
                      ]}>
                      {client.email}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.addressColumn,
                      ]}>
                      {client.address}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.createdColumn,
                      ]}>
                      {client.created}
                    </Text>

                    <View
                      style={[
                        styles.actionColumn,
                        styles.actionCell,
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.editButton}
                        onPress={() =>
                          handleEditClient(client)
                        }>
                        <Text style={styles.editText}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          {/* PAGINATION */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              {filteredClients.length} clients
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text style={styles.pageButtonText}>
                Prev
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              Page 1 / 1
            </Text>

            <TouchableOpacity
              style={styles.pageButton}
              disabled>
              <Text style={styles.pageButtonText}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClientListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DEE0',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  headerSection: {
    marginTop: 25,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#19324D',
    marginBottom: 5,
  },

  pageSubtitle: {
    fontSize: 15,
    color: '#60758E',
  },

  mainCard: {
    backgroundColor: '#FAF7EF',
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  filterRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  searchWrapper: {
    width: 200,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
  },

  input: {
    height: 46,
    paddingHorizontal: 15,
    color: '#24384F',
    fontSize: 13,
  },

  mobileInput: {
    width: '100%',
  },

  selectBox: {
    width: 190,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    fontSize: 13,
    color: '#263A51',
  },

  arrow: {
    fontSize: 18,
    color: '#52657A',
  },

  dateBox: {
    width: 180,
    height: 46,
    borderWidth: 1,
    borderColor: '#DEE3E8',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },

  dateInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#263A51',
  },

  calendarIcon: {
    fontSize: 14,
    color: '#23384E',
  },

  addButton: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 24,
    backgroundColor: '#122F4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  table: {
    minWidth: 1250,
    borderWidth: 1,
    borderColor: '#E3DFD5',
    borderRadius: 18,
    overflow: 'hidden',
  },

  tableHeader: {
    height: 50,
    backgroundColor: '#F2EDDF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tableRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E2DB',
    backgroundColor: '#FCFAF5',
  },

  firstTableRow: {
    backgroundColor: '#F9F3E4',
  },

  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    color: '#61738A',
    letterSpacing: 0.7,
  },

  cellText: {
    fontSize: 14,
    color: '#27394E',
  },

  nameColumn: {
    width: 270,
    paddingLeft: 20,
  },

  mobileColumn: {
    width: 240,
  },

  emailColumn: {
    width: 370,
  },

  addressColumn: {
    width: 260,
  },

  createdColumn: {
    width: 190,
  },

  actionColumn: {
    width: 120,
  },

  actionCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    minWidth: 60,
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9DEE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editText: {
    color: '#25384E',
    fontSize: 12,
    fontWeight: '700',
  },

  pagination: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },

  paginationText: {
    fontSize: 13,
    color: '#64758A',
    marginRight: 4,
  },

  pageButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9DEE3',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#263A51',
  },

  pageNumber: {
    fontSize: 13,
    color: '#34485E',
  },

  mobileList: {
    gap: 12,
  },

  clientCard: {
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 16,
    backgroundColor: '#FCFAF5',
    padding: 16,
  },

  clientCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D344D',
  },

  mobileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
  },

  mobileLabel: {
    fontSize: 12,
    color: '#708197',
    fontWeight: '600',
  },

  mobileValue: {
    fontSize: 12,
    color: '#293D53',
    maxWidth: '60%',
    textAlign: 'right',
  },
});
