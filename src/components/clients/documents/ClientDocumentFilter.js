import React from "react";
import * as Native from "../ClientNativeElements";

const ClientDocumentFilter = ({
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
    <Native.Div nativeClass="client-document-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-document-filter-input"
        placeholder="Search document / case"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <Native.Select
        nativeClass="client-document-filter-select"
        value={type}
        onChange={(event) => onTypeChange(event.target.value)}
      >
        <Native.Option value="All">All document types</Native.Option>
        <Native.Option value="Petition">Petition</Native.Option>
        <Native.Option value="Identity">Identity</Native.Option>
        <Native.Option value="Supporting">Supporting</Native.Option>
        <Native.Option value="Evidence">Evidence</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-document-filter-select"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <Native.Option value="All">All statuses</Native.Option>
        <Native.Option value="Approved">Approved</Native.Option>
        <Native.Option value="Pending">Pending</Native.Option>
        <Native.Option value="Rejected">Rejected</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-document-filter-select"
        value={rowsPerPage}
        onChange={(event) => onRowsChange(event.target.value)}
      >
        <Native.Option value={10}>10 rows</Native.Option>
        <Native.Option value={20}>20 rows</Native.Option>
        <Native.Option value={50}>50 rows</Native.Option>
      </Native.Select>
    </Native.Div>
  );
};

export default ClientDocumentFilter;