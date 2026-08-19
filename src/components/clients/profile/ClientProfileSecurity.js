import React, { useState } from "react";
import * as Native from "../ClientNativeElements";

const ClientProfileSecurity = ({
  onChangePassword,
  onLogout,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    onChangePassword({
      currentPassword,
      newPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password change request submitted.");
  };

  return (
    <>
      <Native.Div nativeClass="client-profile-section-title">
        Security
      </Native.Div>

      <Native.Div nativeClass="client-profile-security-text">
        Update your account password to keep your client
        account secure.
      </Native.Div>

      <Native.Form onSubmit={handleSubmit}>
        <Native.Div nativeClass="client-profile-password-grid">
          <Native.Div nativeClass="client-profile-form-group">
            <Native.Label nativeClass="client-profile-label">
              CURRENT PASSWORD
            </Native.Label>

            <Native.Input
              type="password"
              nativeClass="client-profile-input"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
            />
          </Native.Div>

          <Native.Div nativeClass="client-profile-form-group">
            <Native.Label nativeClass="client-profile-label">
              NEW PASSWORD
            </Native.Label>

            <Native.Input
              type="password"
              nativeClass="client-profile-input"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
            />
          </Native.Div>

          <Native.Div nativeClass="client-profile-form-group">
            <Native.Label nativeClass="client-profile-label">
              CONFIRM NEW PASSWORD
            </Native.Label>

            <Native.Input
              type="password"
              nativeClass="client-profile-input"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </Native.Div>
        </Native.Div>

        {message && (
          <Native.Div nativeClass="client-profile-success">
            {message}
          </Native.Div>
        )}

        <Native.Div nativeClass="client-profile-password-actions">
          <Native.Button
            type="submit"
            nativeClass="client-profile-button client-profile-button-primary"
          >
            Change Password
          </Native.Button>
        </Native.Div>

        <Native.Div nativeClass="client-profile-password-actions">
          <Native.Button
            type="button"
            nativeClass="client-profile-button client-profile-button-secondary"
            onPress={onLogout}
          >
            Logout
          </Native.Button>
        </Native.Div>
      </Native.Form>
    </>
  );
};

export default ClientProfileSecurity;
