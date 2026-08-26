import React from "react";
import { Pressable } from "react-native";
import * as Native from "../ClientNativeElements";

const ClientTimelineCard = ({ caseItem, onOpenCase }) => {
  return (
    <Pressable onPress={() => onOpenCase(caseItem)}>
      <Native.Div nativeClass="client-timeline-card">
      <Native.Div nativeClass="client-timeline-card-header">
        <Native.Div>
          <Native.Div nativeClass="client-timeline-card-docket">
            {caseItem.docketNo}
          </Native.Div>

          <Native.Div nativeClass="client-timeline-card-title">
            {caseItem.caseName}
          </Native.Div>

          <Native.Div nativeClass="client-timeline-card-lawyer">
            Advocate: {caseItem.lawyer}
          </Native.Div>
        </Native.Div>

        <Native.Button
          type="button"
          nativeClass="client-timeline-open-button"
          onPress={() => onOpenCase(caseItem)}
        >
          Open Case
        </Native.Button>
      </Native.Div>

      <Native.Div nativeClass="client-timeline-info-grid">
        <Native.Div nativeClass="client-timeline-info-box">
          <Native.Div nativeClass="client-timeline-info-label">
            Latest Status
          </Native.Div>

          <Native.Div nativeClass="client-timeline-info-value">
            {caseItem.latestStatus}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-timeline-info-box">
          <Native.Div nativeClass="client-timeline-info-label">
            Latest Event
          </Native.Div>

          <Native.Div nativeClass="client-timeline-info-value">
            {caseItem.latestEvent}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-timeline-info-box">
          <Native.Div nativeClass="client-timeline-info-label">
            Next Hearing
          </Native.Div>

          <Native.Div nativeClass="client-timeline-info-value">
            {caseItem.nextHearing}
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-timeline-info-box">
          <Native.Div nativeClass="client-timeline-info-label">
            Payment
          </Native.Div>

          <Native.Div nativeClass="client-timeline-info-value">
            {caseItem.payment}
          </Native.Div>
        </Native.Div>
      </Native.Div>
      </Native.Div>
    </Pressable>
  );
};

export default ClientTimelineCard;
