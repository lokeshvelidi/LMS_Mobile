import React from "react";
import * as Native from "../ClientNativeElements";

const ClientProfileHeader = ({ profile }) => {
  const firstInitial = profile.firstName?.charAt(0) || "";
  const lastInitial = profile.lastName?.charAt(0) || "";

  return (
    <Native.Div nativeClass="client-profile-header">
      <Native.Div nativeClass="client-profile-avatar">
        {firstInitial}
        {lastInitial}
      </Native.Div>

      <Native.Div nativeClass="client-profile-name">
        {profile.firstName} {profile.lastName}
      </Native.Div>

      <Native.Div nativeClass="client-profile-role">
        Client
      </Native.Div>

      <Native.Div nativeClass="client-profile-info-list">
        <Native.Div nativeClass="client-profile-info-row">
          <Native.Span nativeClass="client-profile-info-label">
            Email
          </Native.Span>

          <Native.Span nativeClass="client-profile-info-value">
            {profile.email}
          </Native.Span>
        </Native.Div>

        <Native.Div nativeClass="client-profile-info-row">
          <Native.Span nativeClass="client-profile-info-label">
            Phone
          </Native.Span>

          <Native.Span nativeClass="client-profile-info-value">
            {profile.phone}
          </Native.Span>
        </Native.Div>

        <Native.Div nativeClass="client-profile-info-row">
          <Native.Span nativeClass="client-profile-info-label">
            City
          </Native.Span>

          <Native.Span nativeClass="client-profile-info-value">
            {profile.city}
          </Native.Span>
        </Native.Div>
      </Native.Div>
    </Native.Div>
  );
};

export default ClientProfileHeader;