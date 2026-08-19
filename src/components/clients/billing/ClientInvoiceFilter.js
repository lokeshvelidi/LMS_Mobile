import React from "react";
import * as Native from "../ClientNativeElements";

const ClientInvoiceFilter = ({
  search,
  status,
  rowsPerPage,
  onSearchChange,
  onStatusChange,
  onRowsChange,
}) => {
  return (
    <Native.Div nativeClass="client-invoice-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-invoice-filter-input"
        placeholder="Search invoice / case"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <Native.Select
        nativeClass="client-invoice-filter-select"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
      >
        <Native.Option value="All">All statuses</Native.Option>
        <Native.Option value="Pending">Pending</Native.Option>
        <Native.Option value="Paid">Paid</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-invoice-filter-select"
        value={rowsPerPage}
        onChange={(event) =>
          onRowsChange(event.target.value)
        }
      >
        <Native.Option value={10}>10 rows</Native.Option>
        <Native.Option value={20}>20 rows</Native.Option>
        <Native.Option value={50}>50 rows</Native.Option>
      </Native.Select>
    </Native.Div>
  );
};

export default ClientInvoiceFilter;