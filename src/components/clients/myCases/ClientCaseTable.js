import React from "react";
import * as Native from "../ClientNativeElements";

const ClientCaseTable = ({ cases, onView }) => {
  return (
    <Native.Div nativeClass="client-case-table-wrapper">
      <Native.Table nativeClass="client-case-table">
        <Native.Thead>
          <Native.Tr>
            <Native.Th>DOCKET NO.</Native.Th>
            <Native.Th>CASE</Native.Th>
            <Native.Th>LAWYER</Native.Th>
            <Native.Th>STATUS</Native.Th>
            <Native.Th></Native.Th>
          </Native.Tr>
        </Native.Thead>

        <Native.Tbody>
          {cases.length === 0 ? (
            <Native.Tr>
              <Native.Td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                No cases linked yet.
              </Native.Td>
            </Native.Tr>
          ) : (
            cases.map((caseItem) => (
              <Native.Tr key={caseItem.docketNo}>
                <Native.Td>
                  <Native.Span nativeClass="client-case-docket">
                    {caseItem.docketNo}
                  </Native.Span>
                </Native.Td>

                <Native.Td>
                  <Native.Span nativeClass="client-case-name">
                    {caseItem.caseName}
                  </Native.Span>
                </Native.Td>

                <Native.Td>
                  <Native.Span nativeClass="client-case-lawyer">
                    {caseItem.lawyer}
                  </Native.Span>
                </Native.Td>

                <Native.Td>
                  <Native.Span nativeClass="client-case-status">
                    {caseItem.status}
                  </Native.Span>
                </Native.Td>

                <Native.Td>
                  <Native.Button
                    type="button"
                    nativeClass="client-case-view-button"
                    onPress={() => onView(caseItem)}
                  >
                    View
                  </Native.Button>
                </Native.Td>
              </Native.Tr>
            ))
          )}
        </Native.Tbody>
      </Native.Table>
    </Native.Div>
  );
};

export default ClientCaseTable;