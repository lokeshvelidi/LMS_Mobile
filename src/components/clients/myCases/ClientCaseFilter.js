import React from "react";
import * as Native from "../ClientNativeElements";

const ClientCaseFilter = ({
  search,
  sortBy,
  sortOrder,
  rowsPerPage,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
  onRowsChange,
}) => {
  return (
    <Native.Div nativeClass="client-my-cases-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-case-filter-input"
        placeholder="Search docket / case / lawyer"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <Native.Select
        nativeClass="client-case-filter-select"
        value={sortBy}
        onChange={(event) => onSortByChange(event.target.value)}
      >
        <Native.Option value="docket">Sort by Docket</Native.Option>
        <Native.Option value="case">Sort by Case</Native.Option>
        <Native.Option value="lawyer">Sort by Lawyer</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-case-filter-select"
        value={sortOrder}
        onChange={(event) => onSortOrderChange(event.target.value)}
      >
        <Native.Option value="asc">Ascending</Native.Option>
        <Native.Option value="desc">Descending</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-case-filter-select"
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

export default ClientCaseFilter;