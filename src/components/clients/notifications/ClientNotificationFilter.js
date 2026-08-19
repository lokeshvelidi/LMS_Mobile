import React from "react";
import * as Native from "../ClientNativeElements";

const ClientNotificationFilter = ({
  search,
  type,
  status,
  rowsPerPage,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onRowsChange,
}) => {
  return (
    <Native.Div nativeClass="client-notification-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-notification-filter-input"
        placeholder="Search notifications"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <Native.Select
        nativeClass="client-notification-filter-select"
        value={type}
        onChange={(event) =>
          onTypeChange(event.target.value)
        }
      >
        <Native.Option value="All">All types</Native.Option>
        <Native.Option value="Hearing">Hearing</Native.Option>
        <Native.Option value="Document">Document</Native.Option>
        <Native.Option value="Billing">Billing</Native.Option>
        <Native.Option value="Case">Case</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-notification-filter-select"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
      >
        <Native.Option value="All">All statuses</Native.Option>
        <Native.Option value="Unread">Unread</Native.Option>
        <Native.Option value="Read">Read</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-notification-filter-select"
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

export default ClientNotificationFilter;