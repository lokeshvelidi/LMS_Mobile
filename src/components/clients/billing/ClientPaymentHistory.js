import React from "react";
import * as Native from "../ClientNativeElements";

const ClientPaymentHistory = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <Native.Div nativeClass="client-billing-empty">
        No payment history available.
      </Native.Div>
    );
  }

  return (
    <Native.Div nativeClass="client-payment-table-wrapper">
      <Native.Table nativeClass="client-payment-table">
        <Native.Thead>
          <Native.Tr>
            <Native.Th>PAYMENT ID</Native.Th>
            <Native.Th>INVOICE</Native.Th>
            <Native.Th>DATE</Native.Th>
            <Native.Th>AMOUNT</Native.Th>
            <Native.Th>METHOD</Native.Th>
            <Native.Th>STATUS</Native.Th>
          </Native.Tr>
        </Native.Thead>

        <Native.Tbody>
          {payments.map((payment) => (
            <Native.Tr key={payment.id}>
              <Native.Td>{payment.id}</Native.Td>

              <Native.Td>{payment.invoiceNo}</Native.Td>

              <Native.Td>{payment.date}</Native.Td>

              <Native.Td>
                ₹{payment.amount.toLocaleString("en-IN")}
              </Native.Td>

              <Native.Td>{payment.method}</Native.Td>

              <Native.Td>
                <Native.Span nativeClass="client-payment-success">
                  {payment.status}
                </Native.Span>
              </Native.Td>
            </Native.Tr>
          ))}
        </Native.Tbody>
      </Native.Table>
    </Native.Div>
  );
};

export default ClientPaymentHistory;