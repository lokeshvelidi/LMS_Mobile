import React from "react";
import * as Native from "../ClientNativeElements";

const ClientDocumentCard = ({
  document,
  onView,
  onDownload,
}) => {
  const statusClass =
    document.status === "Approved"
      ? "client-document-status-approved"
      : document.status === "Rejected"
        ? "client-document-status-rejected"
        : "client-document-status-pending";

  return (
    <Native.Div nativeClass="client-document-mobile-card">
      <Native.Div nativeClass="client-document-mobile-header">
        <Native.Div>
          <Native.Div nativeClass="client-document-name">
            {document.name}
          </Native.Div>

          <Native.Div nativeClass="client-document-secondary">
            {document.size}
          </Native.Div>
        </Native.Div>

        <Native.Span
          nativeClass={`client-document-status ${statusClass}`}
        >
          {document.status}
        </Native.Span>
      </Native.Div>

      <Native.Div nativeClass="client-document-mobile-info">
        <Native.Div>
          <Native.Span>Case</Native.Span>
          <Native.Strong>{document.caseNo}</Native.Strong>
        </Native.Div>

        <Native.Div>
          <Native.Span>Type</Native.Span>
          <Native.Strong>{document.type}</Native.Strong>
        </Native.Div>

        <Native.Div>
          <Native.Span>Uploaded</Native.Span>
          <Native.Strong>{document.uploaded}</Native.Strong>
        </Native.Div>
      </Native.Div>

      <Native.Div nativeClass="client-document-mobile-actions">
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
      </Native.Div>
    </Native.Div>
  );
};

export default ClientDocumentCard;