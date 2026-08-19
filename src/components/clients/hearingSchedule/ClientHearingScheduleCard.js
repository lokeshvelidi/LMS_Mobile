import React from "react";
import * as Native from "../ClientNativeElements";

const ClientHearingScheduleCard = ({ hearing, onView }) => {
  const date = new Date(hearing.date);

  const day = date.getDate();

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <Native.Div nativeClass="client-hearing-card">
      <Native.Div nativeClass="client-hearing-card-header">
        <Native.Div nativeClass="client-hearing-date-box">
          <Native.Div nativeClass="client-hearing-date-day">
            {day}
          </Native.Div>

          <Native.Div nativeClass="client-hearing-date-month">
            {month}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-hearing-main">
          <Native.Div nativeClass="client-hearing-docket">
            {hearing.docketNo}
          </Native.Div>

          <Native.Div nativeClass="client-hearing-case">
            {hearing.caseName}
          </Native.Div>

          <Native.Div nativeClass="client-hearing-lawyer">
            Advocate: {hearing.lawyer}
          </Native.Div>
        </Native.Div>

        <Native.Span nativeClass="client-hearing-status">
          {hearing.status}
        </Native.Span>
      </Native.Div>

      <Native.Div nativeClass="client-hearing-details">
        <Native.Div nativeClass="client-hearing-detail">
          <Native.Div nativeClass="client-hearing-detail-label">
            Time
          </Native.Div>

          <Native.Div nativeClass="client-hearing-detail-value">
            {hearing.time}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-hearing-detail">
          <Native.Div nativeClass="client-hearing-detail-label">
            Court
          </Native.Div>

          <Native.Div nativeClass="client-hearing-detail-value">
            {hearing.court}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-hearing-detail">
          <Native.Div nativeClass="client-hearing-detail-label">
            Courtroom
          </Native.Div>

          <Native.Div nativeClass="client-hearing-detail-value">
            {hearing.courtroom}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-hearing-detail">
          <Native.Div nativeClass="client-hearing-detail-label">
            Purpose
          </Native.Div>

          <Native.Div nativeClass="client-hearing-detail-value">
            {hearing.purpose}
          </Native.Div>
        </Native.Div>
      </Native.Div>

      <Native.Div nativeClass="client-hearing-actions">
        <Native.Button
          type="button"
          nativeClass="client-hearing-view-button"
          onPress={() => onView(hearing)}
        >
          View Hearing
        </Native.Button>
      </Native.Div>
    </Native.Div>
  );
};

export default ClientHearingScheduleCard;