import React from "react";
import * as Native from "../ClientNativeElements";

import ClientNotificationCard from "./ClientNotificationCard";

const ClientNotificationList = ({
  notifications,
  onNotificationClick,
  onMarkAsRead,
}) => {
  if (!notifications || notifications.length === 0) {
    return (
      <Native.Div nativeClass="client-notification-empty">
        No notifications found.
      </Native.Div>
    );
  }

  return (
    <Native.Div nativeClass="client-notification-list">
      {notifications.map((notification) => (
        <ClientNotificationCard
          key={notification.id}
          notification={notification}
          onNotificationPress={onNotificationClick}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </Native.Div>
  );
};

export default ClientNotificationList;