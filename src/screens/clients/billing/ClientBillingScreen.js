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
  downloadClientInvoice,
  getClientInvoices,
  getClientPayments,
} from "../../../services/api/clientBillingService";
import { SidebarMenuButton } from "../../../components/navigation/RoleSidebar";
import { getApiErrorMessage } from "../../../services/api/authService";

const hasStatus = (value, expected) => (
  value?.trim().toLowerCase() === expected.toLowerCase()
);

const ClientBillingScreen = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [invoices, setInvoices] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [invoicesError, setInvoicesError] = useState("");
  const [paymentsError, setPaymentsError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setInvoicesLoading(true);
    setPaymentsLoading(true);
    setInvoicesError("");
    setPaymentsError("");

    getClientInvoices()
      .then((result) => {
        if (active) setInvoices(result.items);
      })
      .catch((requestError) => {
        if (!active) return;
        setInvoices([]);
        setInvoicesError(getApiErrorMessage(requestError, "Unable to load invoices."));
      })
      .finally(() => active && setInvoicesLoading(false));

    getClientPayments()
      .then((result) => {
        if (active) setPaymentHistory(result.items);
      })
      .catch((requestError) => {
        if (!active) return;
        setPaymentHistory([]);
        setPaymentsError(getApiErrorMessage(requestError, "Unable to load payment history."));
      })
      .finally(() => active && setPaymentsLoading(false));

    return () => { active = false; };
  }, [reloadKey]);

  const totalBilled = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const totalPaid = invoices.reduce(
    (sum, invoice) => sum + invoice.paidAmount,
    0
  );

  const totalPending = invoices
    .filter((invoice) => hasStatus(invoice.status, "Pending"))
    .reduce((sum, invoice) => sum + invoice.outstandingAmount, 0);

  const totalOutstanding = invoices.reduce(
    (sum, invoice) => sum + invoice.outstandingAmount,
    0
  );

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (invoice) =>
          invoice.invoiceNo.toLowerCase().includes(query) ||
          invoice.caseNo.toLowerCase().includes(query) ||
          invoice.description.toLowerCase().includes(query)
      );
    }

    if (status !== "All") {
      result = result.filter(
        (invoice) => hasStatus(invoice.status, status)
      );
    }

    return result;
  }, [invoices, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / rowsPerPage)
  );

  const visibleInvoices = filteredInvoices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
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

  const handleViewInvoice = (invoice) => {
    Alert.alert("Invoice", invoice.invoiceNo);
  };

  const handleDownloadInvoice = async (invoice) => {
    try {
      const result = await downloadClientInvoice(invoice.id);
      Alert.alert("Download complete", `Saved temporarily to ${result.uri}`);
    } catch (requestError) {
      Alert.alert("Download failed", getApiErrorMessage(requestError));
    }
  };

  const handlePayInvoice = (invoice) => {
    Alert.alert("Payment unavailable", "Online payment is not supported by the verified backend contract.");
  };

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
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

      <View style={styles.pageHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Billing</Text>
          <SidebarMenuButton role="client" />
        </View>

        <Text style={styles.pageDescription}>
          View invoices, payments, and outstanding balances
          associated with your cases.
        </Text>
      </View>

      {/* =========================
          STAT CARDS
      ========================= */}

      <View
        style={[
          styles.statGrid,
          isMobile && styles.statGridMobile,
        ]}
      >
        {/* TOTAL BILLED */}

        <View style={styles.statCard}>
          <View
            style={[
              styles.statIcon,
              styles.blueIcon,
            ]}
          >
            <Text style={styles.statIconText}>
              ₹
            </Text>
          </View>

          <View style={styles.statContent}>
            <Text style={styles.statLabel}>
              TOTAL BILLED
            </Text>

            <Text style={styles.statValue}>
              {formatAmount(totalBilled)}
            </Text>
          </View>
        </View>

        {/* TOTAL PAID */}

        <View style={styles.statCard}>
          <View
            style={[
              styles.statIcon,
              styles.greenIcon,
            ]}
          >
            <Text style={styles.statIconText}>
              ✓
            </Text>
          </View>

          <View style={styles.statContent}>
            <Text style={styles.statLabel}>
              TOTAL PAID
            </Text>

            <Text style={styles.statValue}>
              {formatAmount(totalPaid)}
            </Text>
          </View>
        </View>

        {/* PENDING */}

        <View style={styles.statCard}>
          <View
            style={[
              styles.statIcon,
              styles.goldIcon,
            ]}
          >
            <Text style={styles.statIconText}>
              !
            </Text>
          </View>

          <View style={styles.statContent}>
            <Text style={styles.statLabel}>
              PENDING
            </Text>

            <Text style={styles.statValue}>
              {formatAmount(totalPending)}
            </Text>
          </View>
        </View>

        {/* OUTSTANDING */}

        <View style={styles.statCard}>
          <View
            style={[
              styles.statIcon,
              styles.redIcon,
            ]}
          >
            <Text style={styles.statIconText}>
              ₹
            </Text>
          </View>

          <View style={styles.statContent}>
            <Text style={styles.statLabel}>
              OUTSTANDING
            </Text>

            <Text style={styles.statValue}>
              {formatAmount(totalOutstanding)}
            </Text>
          </View>
        </View>
      </View>

      {/* =========================
          INVOICES PANEL
      ========================= */}

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>
              Invoices
            </Text>

            <Text style={styles.panelDescription}>
              Review your invoices and payment status.
            </Text>
          </View>
        </View>

        {/* FILTER */}

        <View
          style={[
            styles.filterPanel,
            isMobile && styles.filterPanelMobile,
          ]}
        >
          <View
            style={[
              styles.searchContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <TextInput
              value={search}
              onChangeText={handleSearchChange}
              placeholder="Search invoice / case"
              placeholderTextColor="#8B9BB0"
              style={styles.searchInput}
            />
          </View>

          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectText}>
              {status === "All"
                ? "All Statuses"
                : status}
            </Text>

            <Text style={styles.arrow}>
              ⌄
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => {
                if (status === "All") {
                  handleStatusChange("Pending");
                } else if (status === "Pending") {
                  handleStatusChange("Paid");
                } else {
                  handleStatusChange("All");
                }
              }}
            />
          </View>

          <View
            style={[
              styles.selectContainer,
              isMobile && styles.mobileFullWidth,
            ]}
          >
            <Text style={styles.selectText}>
              {rowsPerPage} rows
            </Text>

            <Text style={styles.arrow}>
              ⌄
            </Text>

            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() =>
                handleRowsChange(
                  rowsPerPage === 10 ? 20 : 10
                )
              }
            />
          </View>
        </View>

        {/* INVOICE TABLE */}

        {invoicesLoading ? (
          <View style={styles.emptyState}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.emptyDescription}>Loading billing information...</Text></View>
        ) : invoicesError ? (
          <View style={styles.emptyState}><Text style={styles.emptyDescription}>{invoicesError}</Text><Pressable style={styles.paginationButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.paginationButtonText}>Retry</Text></Pressable></View>
        ) : visibleInvoices.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              No invoices found
            </Text>

            <Text style={styles.emptyDescription}>
              Try changing your search or status filter.
            </Text>
          </View>
        ) : (
          <>
            {!isMobile && (
              <View style={styles.invoiceTable}>
                {/* HEADER */}

                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerText,
                      styles.invoiceColumn,
                    ]}
                  >
                    INVOICE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.caseColumn,
                    ]}
                  >
                    CASE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.descriptionColumn,
                    ]}
                  >
                    DESCRIPTION
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.amountColumn,
                    ]}
                  >
                    AMOUNT
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.dueColumn,
                    ]}
                  >
                    DUE DATE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.statusColumn,
                    ]}
                  >
                    STATUS
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.actionsColumn,
                    ]}
                  >
                    ACTIONS
                  </Text>
                </View>

                {/* ROWS */}

                {visibleInvoices.map((invoice) => (
                  <View
                    key={invoice.id}
                    style={styles.tableRow}
                  >
                    <View
                      style={[
                        styles.invoiceColumn,
                        styles.invoiceCell,
                      ]}
                    >
                      <View style={styles.invoiceIcon}>
                        <Text
                          style={styles.invoiceIconText}
                        >
                          ₹
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={styles.invoiceNumber}
                        >
                          {invoice.invoiceNo}
                        </Text>

                        <Text style={styles.issuedText}>
                          Issued {invoice.issuedDate}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.cellText,
                        styles.caseColumn,
                      ]}
                    >
                      {invoice.caseNo}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.descriptionColumn,
                      ]}
                      numberOfLines={2}
                    >
                      {invoice.description}
                    </Text>

                    <Text
                      style={[
                        styles.amountText,
                        styles.amountColumn,
                      ]}
                    >
                      {formatAmount(invoice.amount)}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.dueColumn,
                      ]}
                    >
                      {invoice.dueDate}
                    </Text>

                    <View
                      style={[
                        styles.statusColumn,
                        styles.statusCell,
                      ]}
                    >
                      <View
                        style={[
                          styles.statusBadge,
                          hasStatus(invoice.status, "Paid")
                            ? styles.paidBadge
                            : styles.pendingBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            hasStatus(invoice.status, "Paid")
                              ? styles.paidText
                              : styles.pendingText,
                          ]}
                        >
                          {invoice.status}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.actionsColumn,
                        styles.actionsCell,
                      ]}
                    >
                      <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                          handleViewInvoice(invoice)
                        }
                      >
                        <Text style={styles.actionText}>
                          View
                        </Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                          handleDownloadInvoice(
                            invoice
                          )
                        }
                      >
                        <Text style={styles.actionText}>
                          Download
                        </Text>
                      </Pressable>

                      {hasStatus(invoice.status, "Pending") && (
                        <Pressable
                          style={styles.payButton}
                          onPress={() =>
                            handlePayInvoice(invoice)
                          }
                        >
                          <Text
                            style={styles.payButtonText}
                          >
                            Pay
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* MOBILE INVOICES */}

            {isMobile &&
              visibleInvoices.map((invoice) => (
                <View
                  key={invoice.id}
                  style={styles.invoiceCard}
                >
                  <View style={styles.invoiceCardTop}>
                    <View
                      style={styles.invoiceMobileTitle}
                    >
                      <View style={styles.invoiceIcon}>
                        <Text
                          style={styles.invoiceIconText}
                        >
                          ₹
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={styles.invoiceNumber}
                        >
                          {invoice.invoiceNo}
                        </Text>

                        <Text style={styles.issuedText}>
                          Issued {invoice.issuedDate}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        hasStatus(invoice.status, "Paid")
                          ? styles.paidBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          hasStatus(invoice.status, "Paid")
                            ? styles.paidText
                            : styles.pendingText,
                        ]}
                      >
                        {invoice.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.invoiceMobileDetails}>
                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Case
                      </Text>

                      <Text style={styles.mobileValue}>
                        {invoice.caseNo}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Description
                      </Text>

                      <Text style={styles.mobileValue}>
                        {invoice.description}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Amount
                      </Text>

                      <Text
                        style={[
                          styles.mobileValue,
                          styles.mobileAmount,
                        ]}
                      >
                        {formatAmount(invoice.amount)}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Due Date
                      </Text>

                      <Text style={styles.mobileValue}>
                        {invoice.dueDate}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mobileActions}>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() =>
                        handleViewInvoice(invoice)
                      }
                    >
                      <Text style={styles.actionText}>
                        View
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.actionButton}
                      onPress={() =>
                        handleDownloadInvoice(invoice)
                      }
                    >
                      <Text style={styles.actionText}>
                        Download
                      </Text>
                    </Pressable>

                    {hasStatus(invoice.status, "Pending") && (
                      <Pressable
                        style={styles.payButton}
                        onPress={() =>
                          handlePayInvoice(invoice)
                        }
                      >
                        <Text style={styles.payButtonText}>
                          Pay
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ))}
          </>
        )}

        {/* PAGINATION */}

        <View
          style={[
            styles.pagination,
            isMobile && styles.paginationMobile,
          ]}
        >
          <Text style={styles.invoiceCount}>
            {filteredInvoices.length} invoices
          </Text>

          <Pressable
            onPress={handlePrevious}
            disabled={page === 1}
            style={[
              styles.paginationButton,
              page === 1 &&
                styles.paginationDisabled,
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
      </View>

      {/* =========================
          PAYMENT HISTORY
      ========================= */}

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>
              Payment History
            </Text>

            <Text style={styles.panelDescription}>
              Review your previous payments and transaction
              details.
            </Text>
          </View>
        </View>

        {paymentsLoading ? (
          <View style={styles.emptyPaymentState}>
            <ActivityIndicator size="large" color="#172F4D" />
            <Text style={styles.emptyDescription}>Loading payment history...</Text>
          </View>
        ) : paymentsError ? (
          <View style={styles.emptyPaymentState}>
            <Text style={styles.emptyDescription}>{paymentsError}</Text>
            <Pressable style={styles.paginationButton} onPress={() => setReloadKey((value) => value + 1)}>
              <Text style={styles.paginationButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : paymentHistory.length === 0 ? (
          <View style={styles.emptyPaymentState}>
            <Text style={styles.emptyTitle}>
              No payment history
            </Text>
          </View>
        ) : (
          <>
            {!isMobile && (
              <View style={styles.paymentTable}>
                <View style={styles.paymentHeader}>
                  <Text
                    style={[
                      styles.headerText,
                      styles.paymentInvoiceColumn,
                    ]}
                  >
                    INVOICE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.paymentDateColumn,
                    ]}
                  >
                    DATE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.paymentAmountColumn,
                    ]}
                  >
                    AMOUNT
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.paymentMethodColumn,
                    ]}
                  >
                    PAYMENT METHOD
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.paymentStatusColumn,
                    ]}
                  >
                    STATUS
                  </Text>
                </View>

                {paymentHistory.map((payment) => (
                  <View
                    key={payment.id}
                    style={styles.paymentRow}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        styles.paymentInvoiceColumn,
                      ]}
                    >
                      {payment.invoiceNo}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.paymentDateColumn,
                      ]}
                    >
                      {payment.date}
                    </Text>

                    <Text
                      style={[
                        styles.amountText,
                        styles.paymentAmountColumn,
                      ]}
                    >
                      {formatAmount(payment.amount)}
                    </Text>

                    <Text
                      style={[
                        styles.cellText,
                        styles.paymentMethodColumn,
                      ]}
                    >
                      {payment.method}
                    </Text>

                    <View
                      style={[
                        styles.paymentStatusColumn,
                        styles.statusCell,
                      ]}
                    >
                      <View
                        style={styles.successBadge}
                      >
                        <Text
                          style={styles.successText}
                        >
                          {payment.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {isMobile &&
              paymentHistory.map((payment) => (
                <View
                  key={payment.id}
                  style={styles.paymentCard}
                >
                  <View style={styles.paymentCardTop}>
                    <Text style={styles.invoiceNumber}>
                      {payment.invoiceNo}
                    </Text>

                    <View style={styles.successBadge}>
                      <Text style={styles.successText}>
                        {payment.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.paymentDetails}>
                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Date
                      </Text>

                      <Text style={styles.mobileValue}>
                        {payment.date}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Amount
                      </Text>
                      
                      <Text
                        style={[
                          styles.mobileValue,
                          styles.mobileAmount,
                        ]}
                      >
                        {formatAmount(payment.amount)}
                      </Text>
                    </View>

                    <View style={styles.mobileDetail}>
                      <Text style={styles.mobileLabel}>
                        Method
                      </Text>

                      <Text style={styles.mobileValue}>
                        {payment.method}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
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
    marginBottom: 24,
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
     STAT GRID
  ========================= */

  statGrid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },

  statGridMobile: {
    flexDirection: "column",
  },

  statCard: {
    flex: 1,
    minHeight: 105,

    backgroundColor: "rgba(255, 253, 248, 0.97)",

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    paddingHorizontal: 18,
    paddingVertical: 18,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  statIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  blueIcon: {
    backgroundColor: "#E8EEF7",
  },

  greenIcon: {
    backgroundColor: "#E7F4EB",
  },

  goldIcon: {
    backgroundColor: "#FFF1D4",
  },

  redIcon: {
    backgroundColor: "#F8E9E8",
  },

  statIconText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#38536F",
  },

  statContent: {
    flex: 1,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: "#75889C",
    marginBottom: 6,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#172F4D",
  },

  /* =========================
     PANELS
  ========================= */

  panel: {
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

    marginBottom: 20,
  },

  panelHeader: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 16,
  },

  panelTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 4,
  },

  panelDescription: {
    fontSize: 13,
    color: "#718399",
  },

  /* =========================
     FILTER
  ========================= */

  filterPanel: {
    minHeight: 88,

    marginHorizontal: 20,
    marginBottom: 18,

    padding: 18,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E2DA",

    backgroundColor: "#F9F7F1",

    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  filterPanelMobile: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  searchContainer: {
    width: 260,
    height: 44,

    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
  },

  searchInput: {
    height: 42,

    paddingHorizontal: 14,

    fontSize: 14,
    color: "#263C54",
  },

  selectContainer: {
    width: 175,
    height: 44,

    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    paddingHorizontal: 14,
  },

  selectText: {
    fontSize: 14,
    color: "#344B63",
  },

  arrow: {
    position: "absolute",
    right: 13,
    top: 9,

    fontSize: 18,
    color: "#1C314A",
  },

  mobileFullWidth: {
    width: "100%",
  },

  /* =========================
     TABLE
  ========================= */

  invoiceTable: {
    width: "100%",
  },

  tableHeader: {
    minHeight: 52,

    paddingHorizontal: 20,

    backgroundColor: "#F5F0E5",

    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: "#687B91",
  },

  tableRow: {
    minHeight: 84,

    paddingHorizontal: 20,

    backgroundColor: "#FFFDF9",

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  invoiceColumn: {
    flex: 1.4,
  },

  caseColumn: {
    flex: 0.9,
  },

  descriptionColumn: {
    flex: 1.5,
  },

  amountColumn: {
    flex: 0.9,
  },

  dueColumn: {
    flex: 1,
  },

  statusColumn: {
    flex: 0.9,
  },

  actionsColumn: {
    flex: 1.7,
  },

  invoiceCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  invoiceIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#F4E9CB",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  invoiceIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#735B28",
  },

  invoiceNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: "#203750",
    marginBottom: 4,
  },

  issuedText: {
    fontSize: 11,
    color: "#8A98A7",
  },

  cellText: {
    fontSize: 12,
    color: "#40566D",
  },

  amountText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#243B54",
  },

  statusCell: {
    alignItems: "flex-start",
  },

  statusBadge: {
    minWidth: 68,
    height: 29,

    paddingHorizontal: 10,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",
  },

  paidBadge: {
    backgroundColor: "#E7F4EB",
  },

  pendingBadge: {
    backgroundColor: "#FFF1D4",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  paidText: {
    color: "#287D4B",
  },

  pendingText: {
    color: "#99711E",
  },

  actionsCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actionButton: {
    height: 34,

    paddingHorizontal: 10,

    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334960",
  },

  payButton: {
    height: 34,

    paddingHorizontal: 12,

    borderRadius: 17,

    backgroundColor: "#16324F",

    alignItems: "center",
    justifyContent: "center",
  },

  payButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* =========================
     MOBILE INVOICE
  ========================= */

  invoiceCard: {
    padding: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  invoiceCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  invoiceMobileTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  invoiceMobileDetails: {
    marginTop: 16,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: "#ECEAE4",
  },

  mobileDetail: {
    flexDirection: "row",
    marginBottom: 7,
  },

  mobileLabel: {
    width: 90,
    fontSize: 12,
    color: "#8292A4",
  },

  mobileValue: {
    flex: 1,
    fontSize: 13,
    color: "#344B63",
  },

  mobileAmount: {
    fontWeight: "700",
    color: "#243B54",
  },

  mobileActions: {
    flexDirection: "row",
    gap: 7,

    marginTop: 14,
  },

  /* =========================
     PAGINATION
  ========================= */

  pagination: {
    minHeight: 64,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 12,
  },

  paginationMobile: {
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 12,
  },

  invoiceCount: {
    fontSize: 13,
    color: "#667B91",
    marginRight: 4,
  },

  paginationButton: {
    minWidth: 58,
    height: 36,

    paddingHorizontal: 13,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334960",
  },

  paginationDisabled: {
    backgroundColor: "#F7F7F6",
    borderColor: "#E6E5E2",
  },

  paginationDisabledText: {
    color: "#A4ACB4",
  },

  pageNumber: {
    fontSize: 13,
    color: "#334960",
  },

  /* =========================
     PAYMENT HISTORY
  ========================= */

  paymentTable: {
    width: "100%",
  },

  paymentHeader: {
    minHeight: 52,

    paddingHorizontal: 20,

    backgroundColor: "#F5F0E5",

    flexDirection: "row",
    alignItems: "center",
  },

  paymentRow: {
    minHeight: 70,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",

    backgroundColor: "#FFFDF9",
  },

  paymentInvoiceColumn: {
    flex: 1.4,
  },

  paymentDateColumn: {
    flex: 1,
  },

  paymentAmountColumn: {
    flex: 1,
  },

  paymentMethodColumn: {
    flex: 1.5,
  },

  paymentStatusColumn: {
    flex: 1,
  },

  successBadge: {
    minWidth: 78,
    height: 29,

    paddingHorizontal: 10,

    borderRadius: 15,

    backgroundColor: "#E7F4EB",

    alignItems: "center",
    justifyContent: "center",
  },

  successText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#287D4B",
  },

  paymentCard: {
    padding: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#EAE7E0",
  },

  paymentCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentDetails: {
    marginTop: 15,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: "#ECEAE4",
  },

  emptyPaymentState: {
    minHeight: 160,

    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
     EMPTY
  ========================= */

  emptyState: {
    minHeight: 220,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263C54",
    marginBottom: 5,
  },

  emptyDescription: {
    fontSize: 13,
    color: "#8292A4",
    textAlign: "center",
  },
});

export default ClientBillingScreen;
