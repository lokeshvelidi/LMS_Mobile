import React from "react";
import * as Native from "../ClientNativeElements";

import ClientInvoiceCard from "./ClientInvoiceCard";

const ClientInvoiceList = ({
  invoices,
  onView,
  onDownload,
  onPay,
}) => {
  if (!invoices || invoices.length === 0) {
    return (
      <Native.Div nativeClass="client-billing-empty">
        No invoices found.
      </Native.Div>
    );
  }

  return (
    <>
      <Native.Div nativeClass="client-invoice-table-wrapper">
        <Native.Table nativeClass="client-invoice-table">
          <Native.Thead>
            <Native.Tr>
              <Native.Th>INVOICE</Native.Th>
              <Native.Th>CASE</Native.Th>
              <Native.Th>DESCRIPTION</Native.Th>
              <Native.Th>AMOUNT</Native.Th>
              <Native.Th>DUE DATE</Native.Th>
              <Native.Th>STATUS</Native.Th>
              <Native.Th>ACTIONS</Native.Th>
            </Native.Tr>
          </Native.Thead>

          <Native.Tbody>
            {invoices.map((invoice) => {
              const statusClass =
                invoice.status === "Paid"
                  ? "client-invoice-status-paid"
                  : "client-invoice-status-pending";

              return (
                <Native.Tr key={invoice.id}>
                  <Native.Td>
                    <Native.Span nativeClass="client-invoice-number">
                      {invoice.invoiceNo}
                    </Native.Span>
                  </Native.Td>

                  <Native.Td>{invoice.caseNo}</Native.Td>

                  <Native.Td>
                    <Native.Span nativeClass="client-invoice-description">
                      {invoice.description}
                    </Native.Span>
                  </Native.Td>

                  <Native.Td>
                    ₹{invoice.amount.toLocaleString("en-IN")}
                  </Native.Td>

                  <Native.Td>{invoice.dueDate}</Native.Td>

                  <Native.Td>
                    <Native.Span
                      nativeClass={`client-invoice-status ${statusClass}`}
                    >
                      {invoice.status}
                    </Native.Span>
                  </Native.Td>

                  <Native.Td>
                    <Native.Button
                      type="button"
                      nativeClass="client-invoice-action"
                      onPress={() => onView(invoice)}
                    >
                      View
                    </Native.Button>

                    <Native.Button
                      type="button"
                      nativeClass="client-invoice-action"
                      onPress={() => onDownload(invoice)}
                    >
                      Download
                    </Native.Button>

                    {invoice.status === "Pending" && (
                      <Native.Button
                        type="button"
                        nativeClass="client-invoice-action client-invoice-pay-button"
                        onPress={() => onPay(invoice)}
                      >
                        Pay
                      </Native.Button>
                    )}
                  </Native.Td>
                </Native.Tr>
              );
            })}
          </Native.Tbody>
        </Native.Table>
      </Native.Div>

      <Native.Div nativeClass="client-invoice-mobile-list">
        {invoices.map((invoice) => (
          <ClientInvoiceCard
            key={invoice.id}
            invoice={invoice}
            onView={onView}
            onDownload={onDownload}
            onPay={onPay}
          />
        ))}
      </Native.Div>
    </>
  );
};

export default ClientInvoiceList;