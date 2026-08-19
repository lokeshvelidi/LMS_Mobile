import React from "react";
import * as Native from "../ClientNativeElements";

const ClientTimelineFilter = ({
  search,
  sortOrder,
  rowsPerPage,
  onSearchChange,
  onSortChange,
  onRowsChange,
}) => {
  return (
    <Native.Div nativeClass="client-timeline-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-timeline-filter-input"
        placeholder="Search docket / case / lawyer"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <Native.Select
        nativeClass="client-timeline-filter-select"
        value={sortOrder}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <Native.Option value="oldest">Oldest first</Native.Option>
        <Native.Option value="newest">Newest first</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-timeline-filter-select"
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

export default ClientTimelineFilter;