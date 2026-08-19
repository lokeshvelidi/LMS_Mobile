import React from "react";
import * as Native from "../ClientNativeElements";

const ClientProfileForm = ({
  profile,
  editing,
  onChange,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <>
      <Native.Div nativeClass="client-profile-section-title">
        Personal Information
      </Native.Div>

      <Native.Div nativeClass="client-profile-form-grid">
        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            FIRST NAME
          </Native.Label>

          <Native.Input
            type="text"
            nativeClass="client-profile-input"
            value={profile.firstName}
            disabled={!editing}
            onChange={(event) =>
              onChange("firstName", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            LAST NAME
          </Native.Label>

          <Native.Input
            type="text"
            nativeClass="client-profile-input"
            value={profile.lastName}
            disabled={!editing}
            onChange={(event) =>
              onChange("lastName", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            EMAIL
          </Native.Label>

          <Native.Input
            type="email"
            nativeClass="client-profile-input client-profile-input-disabled"
            value={profile.email}
            disabled
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            PHONE
          </Native.Label>

          <Native.Input
            type="tel"
            nativeClass="client-profile-input"
            value={profile.phone}
            disabled={!editing}
            onChange={(event) =>
              onChange("phone", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group client-profile-form-group-full">
          <Native.Label nativeClass="client-profile-label">
            ADDRESS
          </Native.Label>

          <Native.Textarea
            nativeClass="client-profile-input client-profile-textarea"
            value={profile.address}
            disabled={!editing}
            onChange={(event) =>
              onChange("address", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            CITY
          </Native.Label>

          <Native.Input
            type="text"
            nativeClass="client-profile-input"
            value={profile.city}
            disabled={!editing}
            onChange={(event) =>
              onChange("city", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            STATE
          </Native.Label>

          <Native.Input
            type="text"
            nativeClass="client-profile-input"
            value={profile.state}
            disabled={!editing}
            onChange={(event) =>
              onChange("state", event.target.value)
            }
          />
        </Native.Div>

        <Native.Div nativeClass="client-profile-form-group">
          <Native.Label nativeClass="client-profile-label">
            PINCODE
          </Native.Label>

          <Native.Input
            type="text"
            nativeClass="client-profile-input"
            value={profile.pincode}
            disabled={!editing}
            onChange={(event) =>
              onChange("pincode", event.target.value)
            }
          />
        </Native.Div>
      </Native.Div>

      <Native.Div nativeClass="client-profile-actions">
        {!editing ? (
          <Native.Button
            type="button"
            nativeClass="client-profile-button client-profile-button-primary"
            onPress={onEdit}
          >
            Edit Profile
          </Native.Button>
        ) : (
          <>
            <Native.Button
              type="button"
              nativeClass="client-profile-button client-profile-button-secondary"
              onPress={onCancel}
            >
              Cancel
            </Native.Button>

            <Native.Button
              type="button"
              nativeClass="client-profile-button client-profile-button-primary"
              onPress={onSave}
            >
              Save Changes
            </Native.Button>
          </>
        )}
      </Native.Div>
    </>
  );
};

export default ClientProfileForm;