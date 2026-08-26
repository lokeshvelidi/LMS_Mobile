import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  getClientNotifications,
  getClientUnreadCount,
  markClientNotificationRead,
} from "../../../services/api/clientNotificationsService";
import { getApiErrorMessage } from "../../../services/api/authService";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";
import { useNavigation } from "@react-navigation/native";

const ClientNotificationsScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([getClientNotifications(), getClientUnreadCount()])
      .then(([items, count]) => {
        if (!active) return;
        setNotifications(items);
        setUnreadCount(count);
      })
      .catch((requestError) => {
        if (!active) return;
        setNotifications([]);
        setUnreadCount(0);
        setError(getApiErrorMessage(requestError, "Unable to load notifications."));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reloadKey]);

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query) ||
          notification.type.toLowerCase().includes(query)
      );
    }

    if (type !== "All") {
      result = result.filter(
        (notification) => notification.type === type
      );
    }

    if (status !== "All") {
      result = result.filter(
        (notification) => notification.status === status
      );
    }

    return result;
  }, [notifications, search, type, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / rowsPerPage)
  );

  const visibleNotifications = filteredNotifications.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNext = () => {
    setPage((current) => Math.min(totalPages, current + 1));
  };

  const handleNotificationClick = (notification) => {
    if (notification.status === "Unread") handleMarkAsRead(notification);
    if (notification.type === "Case" && notification.caseId) {
      navigation.navigate("ClientCaseDetails", { caseId: notification.caseId });
    } else if (notification.type === "Hearing" && notification.caseId) {
      navigation.navigate("ClientHearingSchedule", { caseId: notification.caseId });
    } else if (notification.type === "Document" && notification.caseId) {
      navigation.navigate("ClientDocuments", { caseId: notification.caseId });
    }
  };

  const handleMarkAsRead = async (notification) => {
    if (notification.status === "Read") return;
    try {
      await markClientNotificationRead(notification.id);
      setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, status: "Read" } : item));
      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (requestError) {
      Alert.alert("Update failed", getApiErrorMessage(requestError));
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          PAGE HEADER
      ========================= */}

      <View
        style={[
          styles.pageHeader,
          isMobile && styles.pageHeaderMobile,
        ]}
      >
        <SidebarMenuButton role="client" />
        <View style={styles.headingContent}>
          <Text style={styles.pageTitle}>Notifications</Text>

          <Text style={styles.pageDescription}>
            Stay updated with your cases, hearings, documents,
            and payments.
          </Text>
        </View>

        <View style={styles.unreadBadge}>
          <View style={styles.unreadDot} />

          <Text style={styles.unreadText}>
            {unreadCount} unread
          </Text>
        </View>
      </View>

      {/* =========================
          FILTER PANEL
      ========================= */}

      <View
        style={[
          styles.filterPanel,
          isMobile && styles.filterPanelMobile,
        ]}
      >
        {/* SEARCH */}

        <View
          style={[
            styles.searchContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search notifications..."
            placeholderTextColor="#8B9BB0"
            style={styles.searchInput}
          />
        </View>

        {/* TYPE */}

        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {type === "All" ? "All Types" : type}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (type === "All") {
                handleTypeChange("Hearing");
              } else if (type === "Hearing") {
                handleTypeChange("Document");
              } else if (type === "Document") {
                handleTypeChange("Billing");
              } else if (type === "Billing") {
                handleTypeChange("Case");
              } else {
                handleTypeChange("All");
              }
            }}
          />
        </View>

        {/* STATUS */}

        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {status === "All" ? "All Statuses" : status}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (status === "All") {
                handleStatusChange("Unread");
              } else if (status === "Unread") {
                handleStatusChange("Read");
              } else {
                handleStatusChange("All");
              }
            }}
          />
        </View>

        {/* ROWS */}

        <View
          style={[
            styles.selectContainer,
            isMobile && styles.mobileFullWidth,
          ]}
        >
          <Text style={styles.selectText}>
            {rowsPerPage} rows
          </Text>

          <Text style={styles.arrow}>⌄</Text>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() =>
              handleRowsChange(rowsPerPage === 10 ? 20 : 10)
            }
          />
        </View>
      </View>

      {/* =========================
          NOTIFICATIONS PANEL
      ========================= */}

      <View style={styles.notificationsPanel}>
        {loading ? (
          <View style={styles.emptyState}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.emptyDescription}>Loading notifications...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={styles.emptyDescription}>{error}</Text><Pressable style={styles.markReadButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.markReadText}>Retry</Text></Pressable></View>
        ) : visibleNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>!</Text>
            </View>

            <Text style={styles.emptyTitle}>
              No notifications found
            </Text>

            <Text style={styles.emptyDescription}>
              Try changing your search or filter options.
            </Text>
          </View>
        ) : (
          <View>
            {visibleNotifications.map((notification) => {
              const isUnread =
                notification.status === "Unread";

              return (
                <Pressable
                  key={notification.id}
                  onPress={() =>
                    handleNotificationClick(notification)
                  }
                  style={({ pressed }) => [
                    styles.notificationRow,
                    isUnread && styles.unreadRow,
                    pressed && styles.notificationPressed,
                  ]}
                >
                  {/* ICON */}

                  <View
                    style={[
                      styles.notificationIcon,
                      notification.type === "Hearing" &&
                        styles.hearingIcon,
                      notification.type === "Document" &&
                        styles.documentIcon,
                      notification.type === "Billing" &&
                        styles.billingIcon,
                      notification.type === "Case" &&
                        styles.caseIcon,
                    ]}
                  >
                    <Text style={styles.notificationIconText}>
                      {notification.type === "Hearing"
                        ? "H"
                        : notification.type === "Document"
                        ? "D"
                        : notification.type === "Billing"
                        ? "₹"
                        : "C"}
                    </Text>
                  </View>

                  {/* CONTENT */}

                  <View style={styles.notificationContent}>
                    <View
                      style={[
                        styles.notificationTop,
                        isMobile &&
                          styles.notificationTopMobile,
                      ]}
                    >
                      <View style={styles.notificationTitleRow}>
                        {isUnread && (
                          <View style={styles.unreadIndicator} />
                        )}

                        <Text
                          style={[
                            styles.notificationTitle,
                            isUnread &&
                              styles.unreadNotificationTitle,
                          ]}
                        >
                          {notification.title}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.notificationDate,
                          isMobile &&
                            styles.notificationDateMobile,
                        ]}
                      >
                        {notification.date} •{" "}
                        {notification.time}
                      </Text>
                    </View>

                    <Text
                      style={styles.notificationMessage}
                      numberOfLines={isMobile ? 3 : 2}
                    >
                      {notification.message}
                    </Text>

                    <View style={styles.notificationBottom}>
                      <View
                        style={[
                          styles.typeBadge,
                          notification.type === "Hearing" &&
                            styles.hearingBadge,
                          notification.type === "Document" &&
                            styles.documentBadge,
                          notification.type === "Billing" &&
                            styles.billingBadge,
                          notification.type === "Case" &&
                            styles.caseBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.typeBadgeText,
                            notification.type === "Hearing" &&
                              styles.hearingBadgeText,
                            notification.type === "Document" &&
                              styles.documentBadgeText,
                            notification.type === "Billing" &&
                              styles.billingBadgeText,
                            notification.type === "Case" &&
                              styles.caseBadgeText,
                          ]}
                        >
                          {notification.type}
                        </Text>
                      </View>

                      {isUnread ? (
                        <Pressable
                          onPress={(event) => {
                            event.stopPropagation();
                            handleMarkAsRead(notification);
                          }}
                          style={styles.markReadButton}
                        >
                          <Text style={styles.markReadText}>
                            Mark as read
                          </Text>
                        </Pressable>
                      ) : (
                        <Text style={styles.readText}>
                          Read
                        </Text>
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* =========================
          PAGINATION
      ========================= */}

      <View
        style={[
          styles.pagination,
          isMobile && styles.paginationMobile,
        ]}
      >
        <Text style={styles.notificationCount}>
          {filteredNotifications.length} notifications
        </Text>

        <Pressable
          onPress={handlePrevious}
          disabled={page === 1}
          style={[
            styles.paginationButton,
            page === 1 && styles.paginationDisabled,
          ]}
        >
          <Text
            style={[
              styles.paginationButtonText,
              page === 1 &&
                styles.paginationDisabledText,
            ]}
          >
            Prev
          </Text>
        </Pressable>

        <Text style={styles.pageNumber}>
          Page {page} / {totalPages}
        </Text>

        <Pressable
          onPress={handleNext}
          disabled={page === totalPages}
          style={[
            styles.paginationButton,
            page === totalPages &&
              styles.paginationDisabled,
          ]}
        >
          <Text
            style={[
              styles.paginationButtonText,
              page === totalPages &&
                styles.paginationDisabledText,
            ]}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },

  /* =========================
     HEADER
  ========================= */

  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },

  pageHeaderMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  headingContent: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  pageDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#627A96",
  },

  /* =========================
     UNREAD BADGE
  ========================= */

  unreadBadge: {
    minHeight: 38,

    paddingHorizontal: 15,
    borderRadius: 19,

    backgroundColor: "#FFF4D9",
    borderWidth: 1,
    borderColor: "#EBD9A8",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 20,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor: "#D5A52C",

    marginRight: 8,
  },

  unreadText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#795F27",
  },

  /* =========================
     FILTER PANEL
  ========================= */

  filterPanel: {
    minHeight: 98,

    backgroundColor: "rgba(255, 253, 248, 0.96)",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    paddingHorizontal: 24,
    paddingVertical: 25,

    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,

    marginBottom: 20,
  },

  filterPanelMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  searchContainer: {
    width: 245,
    height: 44,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
  },

  searchInput: {
    height: 42,

    paddingHorizontal: 15,

    fontSize: 14,
    color: "#243A52",
  },

  selectContainer: {
    width: 175,
    height: 44,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3EA",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    paddingHorizontal: 15,
  },

  selectText: {
    fontSize: 14,
    color: "#253B54",
  },

  arrow: {
    position: "absolute",
    right: 14,
    top: 9,

    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     NOTIFICATION PANEL
  ========================= */

  notificationsPanel: {
    width: "100%",

    backgroundColor: "rgba(255, 253, 248, 0.97)",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    overflow: "hidden",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,

    marginBottom: 14,
  },

  /* =========================
     NOTIFICATION ROW
  ========================= */

  notificationRow: {
    minHeight: 118,

    paddingHorizontal: 24,
    paddingVertical: 20,

    flexDirection: "row",
    alignItems: "flex-start",

    backgroundColor: "#FFFDF9",

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  unreadRow: {
    backgroundColor: "#FFFCF3",
  },

  notificationPressed: {
    backgroundColor: "#F7F5EF",
  },

  /* =========================
     ICON
  ========================= */

  notificationIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 16,
  },

  notificationIconText: {
    fontSize: 17,
    fontWeight: "800",
  },

  hearingIcon: {
    backgroundColor: "#E8EAFB",
  },

  documentIcon: {
    backgroundColor: "#E8F3EC",
  },

  billingIcon: {
    backgroundColor: "#FFF0D3",
  },

  caseIcon: {
    backgroundColor: "#F0EAFB",
  },

  /* =========================
     CONTENT
  ========================= */

  notificationContent: {
    flex: 1,
  },

  notificationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 7,
  },

  notificationTopMobile: {
    flexDirection: "column",
  },

  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  unreadIndicator: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#D3A226",

    marginRight: 8,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#243A52",
  },

  unreadNotificationTitle: {
    fontWeight: "800",
    color: "#172F4D",
  },

  notificationDate: {
    fontSize: 12,
    color: "#8795A6",
    marginLeft: 15,
  },

  notificationDateMobile: {
    marginLeft: 0,
    marginTop: 5,
  },

  notificationMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: "#687C92",
    marginBottom: 12,
  },

  /* =========================
     BOTTOM
  ========================= */

  notificationBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  typeBadge: {
    minHeight: 26,

    paddingHorizontal: 11,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",
  },

  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  hearingBadge: {
    backgroundColor: "#E9EBFB",
  },

  hearingBadgeText: {
    color: "#5965B2",
  },

  documentBadge: {
    backgroundColor: "#E6F4EB",
  },

  documentBadgeText: {
    color: "#2A8150",
  },

  billingBadge: {
    backgroundColor: "#FFF0D2",
  },

  billingBadgeText: {
    color: "#96701E",
  },

  caseBadge: {
    backgroundColor: "#EEE8F8",
  },

  caseBadgeText: {
    color: "#75569C",
  },

  markReadButton: {
    height: 30,

    paddingHorizontal: 11,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  markReadText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334960",
  },

  readText: {
    fontSize: 11,
    color: "#9AA4AE",
  },

  /* =========================
     EMPTY
  ========================= */

  emptyState: {
    minHeight: 260,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  emptyIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#F4E9CB",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  emptyIconText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7B6229",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#253B54",
    marginBottom: 5,
  },

  emptyDescription: {
    fontSize: 13,
    color: "#8292A4",
    textAlign: "center",
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 12,
    paddingTop: 4,
  },

  paginationMobile: {
    justifyContent: "center",
    flexWrap: "wrap",
  },

  notificationCount: {
    fontSize: 14,
    color: "#637891",
    marginRight: 4,
  },

  paginationButton: {
    minWidth: 58,
    height: 38,

    paddingHorizontal: 14,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#243A52",
  },

  paginationDisabled: {
    backgroundColor: "#F7F7F6",
    borderColor: "#E6E5E2",
  },

  paginationDisabledText: {
    color: "#A3AAB2",
  },

  pageNumber: {
    fontSize: 14,
    color: "#334960",
  },
});

export default ClientNotificationsScreen;
