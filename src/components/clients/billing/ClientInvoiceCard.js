import React from "react";
import * as Native from "../ClientNativeElements";

const ClientInvoiceCard = ({
  invoice,
  onView,
  onDownload,
  onPay,
}) => {
  const statusClass =
    invoice.status === "Paid"
      ? "client-invoice-status-paid"
      : "client-invoice-status-pending";

  return (
    <Native.Div
      style={{
        padding: "17px",
        border: "1px solid #e1e4e7",
        borderRadius: "15px",
        background: "#ffffff",
      }}
    >
      <Native.Div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Native.Div>
          <Native.Div nativeClass="client-invoice-number">
            {invoice.invoiceNo}
          </Native.Div>

          <Native.Div
            style={{
              marginTop: "7px",
              color: "#26394f",
              fontWeight: "600",
            }}
          >
            {invoice.description}
          </Native.Div>
        </Native.Div>

        <Native.Span
          nativeClass={`client-invoice-status ${statusClass}`}
        >
          {invoice.status}
        </Native.Span>
      </Native.Div>

      <Native.Div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "16px",
        }}
      >
        <Native.Div>
          <Native.Span>Case</Native.Span>
          <Native.Strong>{invoice.caseNo}</Native.Strong>
        </Native.Div>

        <Native.Div>
          <Native.Span>Amount</Native.Span>
          <Native.Strong>
            ₹{invoice.amount.toLocaleString("en-IN")}
          </Native.Strong>
        </Native.Div>

        <Native.Div>
          <Native.Span>Issued</Native.Span>
          <Native.Strong>{invoice.issuedDate}</Native.Strong>
        </Native.Div>

        <Native.Div>
          <Native.Span>Due Date</Native.Span>
          <Native.Strong>{invoice.dueDate}</Native.Strong>
        </Native.Div>
      </Native.Div>

      <Native.Div style={{ marginTop: "16px" }}>
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
      </Native.Div>
    </Native.Div>
  );
};

export default ClientInvoiceCard;
