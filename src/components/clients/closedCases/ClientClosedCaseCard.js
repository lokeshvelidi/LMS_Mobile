import React from "react";
import * as Native from "../ClientNativeElements";

const ClientClosedCaseCard = ({
  caseItem,
  onView,
}) => {
  return (
    <Native.Div
      style={{
        padding: "18px",
        border: "1px solid #e1e4e7",
        borderRadius: "15px",
        background: "#ffffff",
      }}
    >
      <Native.Div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Native.Div>
          <Native.Div nativeClass="client-closed-case-docket">
            {caseItem.docketNo}
          </Native.Div>

          <Native.Div
            nativeClass="client-closed-case-name"
            style={{ marginTop: "7px" }}
          >
            {caseItem.caseName}
          </Native.Div>
        </Native.Div>

        <Native.Span nativeClass="client-closed-case-status">
          {caseItem.finalStatus}
        </Native.Span>
      </Native.Div>

      <Native.Div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "18px",
        }}
      >
        <Native.Div
          style={{
            padding: "11px",
            borderRadius: "10px",
            background: "#f8f8f7",
          }}
        >
          <Native.Span
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#718198",
              fontSize: "10px",
            }}
          >
            Lawyer
          </Native.Span>

          <Native.Strong
            style={{
              color: "#26394f",
              fontSize: "12px",
            }}
          >
            {caseItem.lawyer}
          </Native.Strong>
        </Native.Div>

        <Native.Div
          style={{
            padding: "11px",
            borderRadius: "10px",
            background: "#f8f8f7",
          }}
        >
          <Native.Span
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#718198",
              fontSize: "10px",
            }}
          >
            Closed Date
          </Native.Span>

          <Native.Strong
            style={{
              color: "#26394f",
              fontSize: "12px",
            }}
          >
            {caseItem.closedDate}
          </Native.Strong>
        </Native.Div>

        <Native.Div
          style={{
            padding: "11px",
            borderRadius: "10px",
            background: "#f8f8f7",
          }}
        >
          <Native.Span
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#718198",
              fontSize: "10px",
            }}
          >
            Closure Reason
          </Native.Span>

          <Native.Strong
            style={{
              color: "#26394f",
              fontSize: "12px",
            }}
          >
            {caseItem.closureReason}
          </Native.Strong>
        </Native.Div>
      </Native.Div>

      <Native.Div style={{ marginTop: "15px" }}>
        <Native.Button
          type="button"
          nativeClass="client-closed-case-view-button"
          onPress={() => onView(caseItem)}
        >
          View Case
        </Native.Button>
      </Native.Div>
    </Native.Div>
  );
};

export default ClientClosedCaseCard;