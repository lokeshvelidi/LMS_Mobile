import React from "react";
import * as Native from "../ClientNativeElements";

const ClientClosedCaseFilter = ({
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
    <Native.Div nativeClass="client-closed-case-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-closed-case-filter-input"
        placeholder="Search docket / case / lawyer"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <Native.Select
        nativeClass="client-closed-case-filter-select"
        value={sortBy}
        onChange={(event) =>
          onSortByChange(event.target.value)
        }
      >
        <Native.Option value="date">Sort by Closed Date</Native.Option>
        <Native.Option value="docket">Sort by Docket</Native.Option>
        <Native.Option value="case">Sort by Case</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-closed-case-filter-select"
        value={sortOrder}
        onChange={(event) =>
          onSortOrderChange(event.target.value)
        }
      >
        <Native.Option value="desc">Newest first</Native.Option>
        <Native.Option value="asc">Oldest first</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-closed-case-filter-select"
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

export default ClientClosedCaseFilter;