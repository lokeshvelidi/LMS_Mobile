import React from "react";
import * as Native from "../ClientNativeElements";

const ClientBillingStatCard = ({
  label,
  value,
  accent = "blue",
}) => {
  return (
    <Native.Div
      nativeClass={`client-billing-stat-card client-billing-stat-${accent}`}
    >
      <Native.Div nativeClass="client-billing-stat-label">
        {label}
      </Native.Div>

      <Native.Div nativeClass="client-billing-stat-value">
        ₹{value.toLocaleString("en-IN")}
      </Native.Div>
    </Native.Div>
  );
};

export default ClientBillingStatCard;