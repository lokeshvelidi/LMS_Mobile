import React, {
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../components/layout/AppScreen";
import AppHeader from "../../components/layout/AppHeader";
import AppText from "../../components/common/AppText";

import ClientCard from "../../components/clients/ClientCard";
import ClientSearch from "../../components/clients/ClientSearch";

import theme from "../../theme/theme";

const ClientsScreen = ({
  navigation,
}) => {
  const [search, setSearch] = useState("");

  const clients = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543210",
      address: "Hyderabad, Telangana",
      caseCount: 3,
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 9876543211",
      address: "Hyderabad, Telangana",
      caseCount: 2,
    },
    {
      id: "3",
      name: "Suresh Reddy",
      email: "suresh@example.com",
      phone: "+91 9876543212",
      address: "Vijayawada, Andhra Pradesh",
      caseCount: 1,
    },
  ];

  const filteredClients = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return clients;
    }

    return clients.filter((client) => {
      return (
        client.name
          .toLowerCase()
          .includes(searchValue) ||
        client.email
          .toLowerCase()
          .includes(searchValue) ||
        client.phone
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [search]);

  return (
    <AppScreen>
      <AppHeader
        title="Clients"
        subtitle="Manage your clients"
        showNotification={false}
      />

      <View style={styles.container}>
        <ClientSearch
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.resultHeader}>
          <AppText
            size="sm"
            color="textSecondary"
          >
            {filteredClients.length}{" "}
            {filteredClients.length === 1
              ? "client"
              : "clients"}
          </AppText>
        </View>

        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClientCard
              client={item}
              onPress={() =>
                navigation.navigate(
                  "ClientDetails",
                  {
                    client: item,
                  }
                )
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredClients.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText
                size="lg"
                weight="semiBold"
              >
                No clients found
              </AppText>

              <AppText
                size="sm"
                color="textSecondary"
                style={styles.emptyText}
              >
                Try searching with a different name,
                email, or phone number.
              </AppText>
            </View>
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },

  resultHeader: {
    marginBottom: theme.spacing.md,
  },

  list: {
    paddingBottom: theme.spacing.xxl,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    padding: theme.spacing.xxl,
  },

  emptyText: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },
});

export default ClientsScreen;