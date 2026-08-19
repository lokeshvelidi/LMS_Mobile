import React from "react";
import * as Native from "../ClientNativeElements";

const ClientNotificationCard = ({
  notification,
  onNotificationClick,
  onMarkAsRead,
}) => {
  const isUnread = notification.status === "Unread";

  const getIcon = () => {
    switch (notification.type) {
      case "Hearing":
        return "H";

      case "Document":
        return "D";

      case "Billing":
        return "₹";

      case "Case":
        return "C";

      default:
        return "N";
    }
  };

  return (
    <Native.Div
      nativeClass={`client-notification-card ${
        isUnread ? "client-notification-unread" : ""
      }`}
    >
      <Native.Div nativeClass="client-notification-icon">
        {getIcon()}
      </Native.Div>

      <Native.Div nativeClass="client-notification-content">
        <Native.Div nativeClass="client-notification-top">
          <Native.Div>
            <Native.Div nativeClass="client-notification-title">
              {notification.title}
            </Native.Div>

            <Native.Div nativeClass="client-notification-message">
              {notification.message}
            </Native.Div>
          </Native.Div>

          <Native.Div nativeClass="client-notification-date">
            <Native.Div>{notification.date}</Native.Div>
            <Native.Div>{notification.time}</Native.Div>
          </Native.Div>
        </Native.Div>

        <Native.Div nativeClass="client-notification-meta">
          <Native.Span nativeClass="client-notification-type">
            {notification.type}
          </Native.Span>

          <Native.Span
            nativeClass={`client-notification-status ${
              isUnread
                ? "client-notification-status-unread"
                : "client-notification-status-read"
            }`}
          >
            {notification.status}
          </Native.Span>
        </Native.Div>
      </Native.Div>

      <Native.Button
        type="button"
        nativeClass="client-notification-action"
        onPress={() => {
          if (isUnread) {
            onMarkAsRead(notification);
          }

          onNotificationClick(notification);
        }}
      >
        {isUnread ? "Mark Read" : "View"}
      </Native.Button>
    </Native.Div>
  );
};

export default ClientNotificationCard;