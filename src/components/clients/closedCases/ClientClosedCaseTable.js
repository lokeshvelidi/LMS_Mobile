import React from "react";
import * as Native from "../ClientNativeElements";

const ClientClosedCaseTable = ({
  cases,
  onView,
}) => {
  if (!cases || cases.length === 0) {
    return (
      <Native.Div nativeClass="client-closed-case-empty">
        No closed cases found.
      </Native.Div>
    );
  }

  return (
    <Native.Div nativeClass="client-closed-case-table-wrapper">
      <Native.Table nativeClass="client-closed-case-table">
        <Native.Thead>
          <Native.Tr>
            <Native.Th>DOCKET NO.</Native.Th>
            <Native.Th>CASE</Native.Th>
            <Native.Th>LAWYER</Native.Th>
            <Native.Th>CLOSED DATE</Native.Th>
            <Native.Th>REASON</Native.Th>
            <Native.Th>STATUS</Native.Th>
            <Native.Th></Native.Th>
          </Native.Tr>
        </Native.Thead>

        <Native.Tbody>
          {cases.map((caseItem) => (
            <Native.Tr key={caseItem.id}>
              <Native.Td>
                <Native.Span nativeClass="client-closed-case-docket">
                  {caseItem.docketNo}
                </Native.Span>
              </Native.Td>

              <Native.Td>
                <Native.Span nativeClass="client-closed-case-name">
                  {caseItem.caseName}
                </Native.Span>
              </Native.Td>

              <Native.Td>
                <Native.Span nativeClass="client-closed-case-lawyer">
                  {caseItem.lawyer}
                </Native.Span>
              </Native.Td>

              <Native.Td>{caseItem.closedDate}</Native.Td>

              <Native.Td>
                <Native.Span nativeClass="client-closed-case-reason">
                  {caseItem.closureReason}
                </Native.Span>
              </Native.Td>

              <Native.Td>
                <Native.Span nativeClass="client-closed-case-status">
                  {caseItem.finalStatus}
                </Native.Span>
              </Native.Td>

              <Native.Td>
                <Native.Button
                  type="button"
                  nativeClass="client-closed-case-view-button"
                  onPress={() => onView(caseItem)}
                >
                  View
                </Native.Button>
              </Native.Td>
            </Native.Tr>
          ))}
        </Native.Tbody>
      </Native.Table>
    </Native.Div>
  );
};

export default ClientClosedCaseTable;