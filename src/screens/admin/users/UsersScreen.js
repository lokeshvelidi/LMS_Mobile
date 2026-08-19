import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import UserCard from "../../../components/admin/users/UserCard";
import UserSearch from "../../../components/admin/users/UserSearch";
import UserFilter from "../../../components/admin/users/UserFilter";
import { getAdminUsers, regenerateAdminUserPassword } from "../../../services/api/adminUsersService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  gold: "#E5B93F",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

/* Legacy mock users retained only as commented reference; API data is active. */
/* const USERS = [
  {
    id: "1",
    name: "test",
    username: "tests",
    email: "test@gmail.com",
    mobile: "1223334444",
    role: "Client",
    status: "Active",
    created: "29 Jul 2026",
  },
  {
    id: "2",
    name: "Prakash",
    username: "prakash",
    email: "prakash@gmail.com",
    mobile: "1234567892",
    role: "Client",
    status: "Active",
    created: "27 Jul 2026",
  },
  {
    id: "3",
    name: "Sathish",
    username: "sathishh",
    email: "sathishh@gmail.com",
    mobile: "1234567892",
    role: "Client",
    status: "Active",
    created: "27 Jul 2026",
  },
  {
    id: "4",
    name: "test",
    username: "test",
    email: "-",
    mobile: "1478523698",
    role: "Advocate",
    status: "Active",
    created: "24 Jul 2026",
  },
  {
    id: "5",
    name: "Mahesh",
    username: "mahesh",
    email: "mahesh@gmail.com",
    mobile: "1234567899",
    role: "Advocate",
    status: "Active",
    created: "24 Jul 2026",
  },
  {
    id: "6",
    name: "Sathish",
    username: "sathish",
    email: "sathish@gmail.com",
    mobile: "1234567889",
    role: "Client",
    status: "Active",
    created: "24 Jul 2026",
  },
]; */
const USERS = [];

const UsersScreen = ({
  navigation,
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regeneratingId, setRegeneratingId] = useState(null);
  useEffect(() => { getAdminUsers().then((items) => setUsers(items.map((x) => ({ ...x, id: x.appUserId ?? x.userId ?? x.id, name: x.fullName ?? x.name ?? "-", username: x.username ?? x.userName ?? "-", email: x.email ?? "-", mobile: x.mobile ?? x.phone ?? "-", role: x.role ?? "-", status: x.status ?? "-", created: x.createdDate ?? "-" })))).catch((e) => Alert.alert("Users unavailable", e.response?.data?.message || "Unable to load users.")).finally(() => setLoading(false)); }, []);
  const [search, setSearch] = useState("");

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [role, setRole] = useState("All");

  const [status, setStatus] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Newest first");

  const filteredUsers = useMemo(() => {
    let result = [...users];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((user) => {
        return (
          user.name
            .toLowerCase()
            .includes(searchValue) ||
          user.username
            .toLowerCase()
            .includes(searchValue) ||
          user.email
            .toLowerCase()
            .includes(searchValue) ||
          user.mobile
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    if (role !== "All") {
      result = result.filter(
        (user) => user.role === role
      );
    }

    if (status !== "All") {
      result = result.filter(
        (user) => user.status === status
      );
    }

    result.sort((a, b) => {
      const first =
        new Date(a.created).getTime();

      const second =
        new Date(b.created).getTime();

      return sortOrder === "Newest first"
        ? second - first
        : first - second;
    });

    return result;
  }, [
    users,
    search,
    role,
    status,
    sortOrder,
  ]);

  const handleRegeneratePassword = (
    user
  ) => {
    Alert.alert(
      "Regenerate Password",
      `Are you sure you want to regenerate the password for ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Regenerate",
          onPress: async () => {
            if (regeneratingId) return;
            setRegeneratingId(user.id);
            try {
              await regenerateAdminUserPassword(user.id);
              Alert.alert("Password Regenerated", "Password regeneration completed successfully.");
            } catch (error) {
              Alert.alert("Password regeneration failed", error.response?.data?.message || "Unable to regenerate password.");
            } finally { setRegeneratingId(null); }
          },
        },
      ]
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setRole("All");
    setStatus("All");
    setSortOrder("Newest first");
  };

  const renderHeader = () => {
    return (
      <View>
        <AppHeader
          title="Users"
          subtitle="Create users, assign roles, and review portal access."
          showNotification={false}
        />

        <View style={styles.content}>
          <UserSearch
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.toolbar}>
            <Pressable
              onPress={() =>
                setFilterVisible(true)
              }
              style={styles.filterButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.filterText}
              >
                Filter & Sort
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => Alert.alert("Unavailable", "The backend does not expose an AppUser create endpoint.")}
              style={styles.addButton}
            >
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.addText}
              >
                Add User (Unavailable)
              </AppText>
            </Pressable>
          </View>

          <View style={styles.resultRow}>
            <AppText
              size="sm"
              color="textSecondary"
            >
              {filteredUsers.length} users
            </AppText>

            {(role !== "All" ||
              status !== "All") && (
              <AppText
                size="xs"
                weight="medium"
                style={styles.activeFilterText}
              >
                Filters applied
              </AppText>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <AppScreen>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() =>
              navigation.navigate(
                "UserDetails",
                {
                  user: item,
                }
              )
            }
            onRegeneratePassword={handleRegeneratePassword}
          />
        )}
        ListHeaderComponent={
          renderHeader
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText
              size="lg"
              weight="semiBold"
            >
              No users found
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              Try changing your search or
              filters.
            </AppText>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }
      />

      <UserFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        role={role}
        status={status}
        sortOrder={sortOrder}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onSortChange={setSortOrder}
        onClear={handleClearFilters}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 30,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 4,
  },

  toolbar: {
    flexDirection: "row",
    marginTop: 12,
  },

  filterButton: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  filterText: {
    color: COLORS.navy,
  },

  addButton: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.navy,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  addText: {
    color: COLORS.white,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 12,
  },

  activeFilterText: {
    color: COLORS.navy,
  },

  empty: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
  },
});

export default UsersScreen;
