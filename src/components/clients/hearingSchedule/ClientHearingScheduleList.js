import React from "react";
import * as Native from "../ClientNativeElements";

import ClientHearingScheduleCard from "./ClientHearingScheduleCard";

const ClientHearingScheduleList = ({
  hearings,
  onView,
}) => {
  if (!hearings || hearings.length === 0) {
    return (
      <Native.Div nativeClass="client-hearing-empty">
        No hearings found.
      </Native.Div>
    );
  }

  return (
    <Native.Div nativeClass="client-hearing-list">
      {hearings.map((hearing) => (
        <ClientHearingScheduleCard
          key={hearing.id}
          hearing={hearing}
          onView={onView}
        />
      ))}
    </Native.Div>
  );
};

export default ClientHearingScheduleList;