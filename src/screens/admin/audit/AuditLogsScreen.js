import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import AuditLogCard from "../../../components/admin/audit/AuditLogCard";
import AuditFilter from "../../../components/admin/audit/AuditFilter";
import { getAdminAuditLogs } from "../../../services/api/adminAuditLogsService";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  white: "#FFFDF8",
  secondary: "#61758A",
  border: "#DED9CE",
};

/* Legacy mock audit records are inactive; API data is active. */
/* const AUDIT_LOGS = [
  {
    id: "1",
    user: "Admin User",
    role: "Admin",
    action: "Created",
    activity:
      "Created a new user account",
    module: "Users",
    dateTime:
      "05 Jul 2026, 10:42 AM",
    ipAddress:
      "192.168.1.104",
  },

  {
    id: "2",
    user: "Admin User",
    role: "Admin",
    action: "Updated",
    activity:
      "Updated case information",
    module: "Cases",
    dateTime:
      "05 Jul 2026, 10:18 AM",
    ipAddress:
      "192.168.1.104",
  },

  {
    id: "3",
    user: "Rahul Sharma",
    role: "Advocate",
    action: "Created",
    activity:
      "Created a new case",
    module: "Cases",
    dateTime:
      "04 Jul 2026, 04:32 PM",
    ipAddress:
      "192.168.1.121",
  },

  {
    id: "4",
    user: "Admin User",
    role: "Admin",
    action: "Updated",
    activity:
      "Updated court information",
    module: "Courts",
    dateTime:
      "04 Jul 2026, 02:14 PM",
    ipAddress:
      "192.168.1.104",
  },

  {
    id: "5",
    user: "Priya Reddy",
    role: "Staff",
    action: "Login",
    activity:
      "Logged into the application",
    module: "Users",
    dateTime:
      "04 Jul 2026, 09:06 AM",
    ipAddress:
      "192.168.1.138",
  },

  {
    id: "6",
    user: "Admin User",
    role: "Admin",
    action: "Deleted",
    activity:
      "Deleted an old user account",
    module: "Users",
    dateTime:
      "03 Jul 2026, 05:26 PM",
    ipAddress:
      "192.168.1.104",
  },

  {
    id: "7",
    user: "Admin User",
    role: "Admin",
    action: "Updated",
    activity:
      "Updated hearing schedule",
    module: "Hearings",
    dateTime:
      "03 Jul 2026, 01:47 PM",
    ipAddress:
      "192.168.1.104",
  },
]; */
const AUDIT_LOGS = [];

const AuditLogsScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadLogs = () => { setLoading(true); setError(null); getAdminAuditLogs().then((items) => setLogs(items.map((x) => ({ ...x, id: x.auditLogId ?? x.id, user: x.userName ?? x.user ?? "-", role: x.role ?? "-", action: x.action ?? "-", activity: x.description ?? x.activity ?? "-", module: x.module ?? "-", dateTime: x.createdDate ?? x.timestamp ?? "-", ipAddress: x.ipAddress ?? "-" })))).catch((e) => setError(e.response?.data?.message || "Unable to load audit logs.")).finally(() => setLoading(false)); };
  useEffect(() => { loadLogs(); }, []);
  const [search, setSearch] =
    useState("");

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [action, setAction] =
    useState("All");

  const [module, setModule] =
    useState("All");

  const [role, setRole] =
    useState("All");

  const filteredLogs = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return logs.filter((item) => {
      const searchMatch =
        !query ||
        item.user
          .toLowerCase()
          .includes(query) ||
        item.activity
          .toLowerCase()
          .includes(query) ||
        item.module
          .toLowerCase()
          .includes(query) ||
        item.ipAddress
          .toLowerCase()
          .includes(query);

      const actionMatch =
        action === "All" ||
        item.action === action;

      const moduleMatch =
        module === "All" ||
        item.module === module;

      const roleMatch =
        role === "All" ||
        item.role === role;

      return (
        searchMatch &&
        actionMatch &&
        moduleMatch &&
        roleMatch
      );
    });
  }, [
    logs,
    search,
    action,
    module,
    role,
  ]);

  if (loading) return <AppScreen><AppHeader title="Audit Logs" showNotification={false} /><View style={styles.empty}><AppText>Loading audit logs...</AppText></View></AppScreen>;
  if (error) return <AppScreen><AppHeader title="Audit Logs" showNotification={false} /><View style={styles.empty}><AppText>{error}</AppText><Pressable onPress={loadLogs}><AppText style={styles.retry}>Retry</AppText></Pressable></View></AppScreen>;

  const clearFilters = () => {
    setSearch("");
    setAction("All");
    setModule("All");
    setRole("All");
  };

  return (
    <AppScreen>
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Audit Logs"
              subtitle="Track important activities and system changes."
              showNotification={false}
            />

            <View style={styles.content}>
              <View style={styles.searchBox}>
                <View style={styles.searchIcon}>
                  <View
                    style={styles.circle}
                  />

                  <View
                    style={styles.handle}
                  />
                </View>

                <Pressable
                  style={styles.searchPressable}
                  onPress={() => {}}
                >
                  <AppText
                    size="sm"
                    color="textSecondary"
                  >
                    Search user, activity, module...
                  </AppText>
                </Pressable>
              </View>

              <View style={styles.toolbar}>
                <View style={styles.countContainer}>
                  <AppText
                    size="sm"
                    color="textSecondary"
                  >
                    {filteredLogs.length} activities
                  </AppText>
                </View>

                <Pressable
                  onPress={() =>
                    setFilterVisible(true)
                  }
                  style={styles.filterButton}
                >
                  <AppText
                    size="sm"
                    weight="semiBold"
                  >
                    Filter
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <AuditLogCard log={item} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText
              size="lg"
              weight="semiBold"
            >
              No audit logs found
            </AppText>

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.emptyText}
            >
              Try changing your filters.
            </AppText>
          </View>
        }
      />

      <AuditFilter
        visible={filterVisible}
        onClose={() =>
          setFilterVisible(false)
        }
        action={action}
        module={module}
        role={role}
        onActionChange={setAction}
        onModuleChange={setModule}
        onRoleChange={setRole}
        onClear={clearFilters}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 30,
    backgroundColor:
      COLORS.background,
  },

  content: {
    marginBottom: 12,
  },

  searchBox: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  searchIcon: {
    width: 21,
    height: 21,
    position: "relative",
    marginRight: 9,
  },

  circle: {
    position: "absolute",
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: 8,
    left: 1,
    top: 1,
  },

  handle: {
    position: "absolute",
    width: 7,
    height: 2,
    backgroundColor: COLORS.navy,
    left: 14,
    top: 15,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  searchPressable: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  countContainer: {
    flex: 1,
  },

  filterButton: {
    height: 43,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 30,
  },

  retry: {
    color: COLORS.navy,
    marginTop: 12,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
  },
});

export default AuditLogsScreen;
