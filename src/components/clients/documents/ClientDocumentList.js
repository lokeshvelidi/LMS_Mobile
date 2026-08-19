import React from "react";
import * as Native from "../ClientNativeElements";

import ClientDocumentCard from "./ClientDocumentCard";

const ClientDocumentList = ({
  documents,
  onView,
  onDownload,
}) => {
  if (!documents || documents.length === 0) {
    return (
      <Native.Div nativeClass="client-document-empty">
        No documents found.
      </Native.Div>
    );
  }

  return (
    <>
      <Native.Div nativeClass="client-document-table-wrapper">
        <Native.Table nativeClass="client-document-table">
          <Native.Thead>
            <Native.Tr>
              <Native.Th>DOCUMENT</Native.Th>
              <Native.Th>CASE NO.</Native.Th>
              <Native.Th>TYPE</Native.Th>
              <Native.Th>UPLOADED</Native.Th>
              <Native.Th>STATUS</Native.Th>
              <Native.Th>ACTIONS</Native.Th>
            </Native.Tr>
          </Native.Thead>

          <Native.Tbody>
            {documents.map((document) => {
              const statusClass =
                document.status === "Approved"
                  ? "client-document-status-approved"
                  : document.status === "Rejected"
                    ? "client-document-status-rejected"
                    : "client-document-status-pending";

              return (
                <Native.Tr key={document.id}>
                  <Native.Td>
                    <Native.Div nativeClass="client-document-name">
                      {document.name}
                    </Native.Div>

                    <Native.Div nativeClass="client-document-secondary">
                      {document.size}
                    </Native.Div>
                  </Native.Td>

                  <Native.Td>{document.caseNo}</Native.Td>

                  <Native.Td>{document.type}</Native.Td>

                  <Native.Td>{document.uploaded}</Native.Td>

                  <Native.Td>
                    <Native.Span
                      nativeClass={`client-document-status ${statusClass}`}
                    >
                      {document.status}
                    </Native.Span>
                  </Native.Td>

                  <Native.Td>
                    <Native.Button
                      type="button"
                      nativeClass="client-document-action"
                      onPress={() => onView(document)}
                    >
                      View
                    </Native.Button>

                    <Native.Button
                      type="button"
                      nativeClass="client-document-action"
                      onPress={() => onDownload(document)}
                    >
                      Download
                    </Native.Button>
                  </Native.Td>
                </Native.Tr>
              );
            })}
          </Native.Tbody>
        </Native.Table>
      </Native.Div>

      <Native.Div nativeClass="client-document-mobile-list">
        {documents.map((document) => (
          <ClientDocumentCard
            key={document.id}
            document={document}
            onView={onView}
            onDownload={onDownload}
          />
        ))}
      </Native.Div>
    </>
  );
};

export default ClientDocumentList;