import React from "react";
import * as Native from "../ClientNativeElements";

const ClientHearingScheduleFilter = ({
  search,
  dateFilter,
  rowsPerPage,
  onSearchChange,
  onDateFilterChange,
  onRowsChange,
}) => {
  return (
    <Native.Div nativeClass="client-hearing-filter-row">
      <Native.Input
        type="text"
        nativeClass="client-hearing-filter-input"
        placeholder="Search docket / case / lawyer / court"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <Native.Select
        nativeClass="client-hearing-filter-select"
        value={dateFilter}
        onChange={(event) => onDateFilterChange(event.target.value)}
      >
        <Native.Option value="All">All hearings</Native.Option>
        <Native.Option value="Upcoming">Upcoming</Native.Option>
        <Native.Option value="Past">Past</Native.Option>
      </Native.Select>

      <Native.Select
        nativeClass="client-hearing-filter-select"
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

export default ClientHearingScheduleFilter;