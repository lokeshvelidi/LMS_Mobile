import React from "react";
import * as Native from "../ClientNativeElements";

const ClientCaseCard = ({ caseItem, onView }) => {
  return (
    <Native.Div nativeClass="client-case-mobile-card">
      <Native.Div nativeClass="client-case-mobile-top">
        <Native.Div>
          <Native.Div nativeClass="client-case-mobile-docket">
            {caseItem.docketNo}
          </Native.Div>

          <Native.Div nativeClass="client-case-mobile-name">
            {caseItem.caseName}
          </Native.Div>
        </Native.Div>

        <Native.Span nativeClass="client-case-status">
          {caseItem.status}
        </Native.Span>
      </Native.Div>

      <Native.Div nativeClass="client-case-mobile-info">
        <Native.Div nativeClass="client-case-mobile-info-box">
          <Native.Span>Lawyer</Native.Span>
          <Native.Strong>{caseItem.lawyer}</Native.Strong>
        </Native.Div>

        <Native.Div nativeClass="client-case-mobile-info-box">
          <Native.Span>Docket No.</Native.Span>
          <Native.Strong>{caseItem.docketNo}</Native.Strong>
        </Native.Div>
      </Native.Div>

      <Native.Div nativeClass="client-case-mobile-action">
        <Native.Button
          type="button"
          nativeClass="client-case-view-button"
          onPress={() => onView(caseItem)}
        >
          View
        </Native.Button>
      </Native.Div>
    </Native.Div>
  );
};

export default ClientCaseCard;