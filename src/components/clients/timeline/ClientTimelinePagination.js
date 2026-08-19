import React from "react";
import * as Native from "../ClientNativeElements";

const ClientTimelinePagination = ({
  totalCases,
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <Native.Div nativeClass="client-timeline-pagination">
      <Native.Span>{totalCases} cases</Native.Span>

      <Native.Button
        type="button"
        onPress={onPrevious}
        disabled={page === 1}
      >
        Prev
      </Native.Button>

      <Native.Span>
        Page {page} / {totalPages}
      </Native.Span>

      <Native.Button
        type="button"
        onPress={onNext}
        disabled={page === totalPages}
      >
        Next
      </Native.Button>
    </Native.Div>
  );
};

export default ClientTimelinePagination;