import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import {
  getClientProfile,
  updateClientProfile,
} from "../../../services/api/clientProfileService";
import { getApiErrorMessage } from "../../../services/api/authService";

const emptyProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const ClientProfileScreen = () => {
  const { logout } = useAuth();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  const [profile, setProfile] = useState(emptyProfile);
  const [savedProfile, setSavedProfile] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getClientProfile()
      .then((result) => {
        if (!active) return;
        setProfile(result);
        setSavedProfile(result);
      })
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, "Unable to load profile."));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [reloadKey]);

  const handleChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await updateClientProfile(profile);
      setProfile(updated);
      setSavedProfile(updated);
      setEditing(false);
      Alert.alert("Profile updated", "Your profile information was saved.");
    } catch (requestError) {
      Alert.alert("Update failed", getApiErrorMessage(requestError, "Unable to update profile."));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setEditing(false);
  };

  const handleChangePassword = () => {
    Alert.alert("Password change", "Enter-current-password fields are not available in this existing screen, so no password request was sent.");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          PAGE HEADER
      ========================= */}

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Profile</Text>

        <Text style={styles.pageDescription}>
          View and manage your personal account information.
        </Text>
      </View>

      {/* =========================
          PROFILE LAYOUT
      ========================= */}

      <View
        style={[
          styles.profileGrid,
          isMobile && styles.profileGridMobile,
        ]}
      >
        {/* =========================
            LEFT COLUMN
        ========================= */}

        <View
          style={[
            styles.leftColumn,
            !isMobile && styles.leftColumnDesktop,
          ]}
        >
          {/* PROFILE HEADER CARD */}

          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile.firstName?.charAt(0) || ""}
                  {profile.lastName?.charAt(0) || ""}
                </Text>
              </View>

              <View style={styles.profileHeaderInfo}>
                <Text style={styles.profileName}>
                  {profile.firstName} {profile.lastName}
                </Text>

                <Text style={styles.profileEmail}>
                  {profile.email}
                </Text>

                <View style={styles.clientBadge}>
                  <Text style={styles.clientBadgeText}>
                    CLIENT
                  </Text>
                </View>
              </View>
            </View>

            {/* BASIC INFO */}

            <View style={styles.profileDivider} />

            <View style={styles.profileInfoRow}>
              <Text style={styles.profileInfoLabel}>
                Phone
              </Text>

              <Text style={styles.profileInfoValue}>
                {profile.phone}
              </Text>
            </View>

            <View style={styles.profileInfoRow}>
              <Text style={styles.profileInfoLabel}>
                Location
              </Text>

              <Text style={styles.profileInfoValue}>
                {profile.address || "Not provided"}
              </Text>
            </View>
          </View>

          {/* SECURITY CARD */}

          <View style={[styles.card, styles.securityCard]}>
            <Text style={styles.cardTitle}>
              Security
            </Text>

            <Text style={styles.cardDescription}>
              Manage your password and account access.
            </Text>

            <View style={styles.securityOption}>
              <View style={styles.securityIcon}>
                <Text style={styles.securityIconText}>
                  •••
                </Text>
              </View>

              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>
                  Password
                </Text>

                <Text style={styles.securityDescription}>
                  Update your account password.
                </Text>
              </View>

              <Pressable
                style={styles.securityButton}
                onPress={handleChangePassword}
              >
                <Text style={styles.securityButtonText}>
                  Change
                </Text>
              </Pressable>
            </View>

            <View style={styles.securityDivider} />

            <View style={styles.securityOption}>
              <View
                style={[
                  styles.securityIcon,
                  styles.logoutIcon,
                ]}
              >
                <Text style={styles.logoutIconText}>
                  →
                </Text>
              </View>

              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>
                  Sign out
                </Text>

                <Text style={styles.securityDescription}>
                  Sign out from your client account.
                </Text>
              </View>

              <Pressable
                style={styles.logoutButton}
                onPress={logout}
              >
                <Text style={styles.logoutButtonText}>
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* =========================
            RIGHT COLUMN
        ========================= */}

        {loading ? (
          <View style={styles.card}><ActivityIndicator size="large" color="#172F4D" /><Text style={styles.cardDescription}>Loading profile...</Text></View>
        ) : error ? (
          <View style={styles.card}><Text style={styles.cardDescription}>{error}</Text><Pressable style={styles.editButton} onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.editButtonText}>Retry</Text></Pressable></View>
        ) : <View
          style={[
            styles.card,
            styles.formCard,
            !isMobile && styles.formCardDesktop,
          ]}
        >
          <View style={styles.formHeader}>
            <View>
              <Text style={styles.cardTitle}>
                Personal Information
              </Text>

              <Text style={styles.cardDescription}>
                Update your personal information below.
              </Text>
            </View>

            {!editing && (
              <Pressable
                style={styles.editButton}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.editButtonText}>
                  Edit Profile
                </Text>
              </Pressable>
            )}
          </View>

          <View style={styles.formDivider} />

          {/* FIRST / LAST NAME */}

          <View
            style={[
              styles.formRow,
              isMobile && styles.formRowMobile,
            ]}
          >
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                FIRST NAME
              </Text>

              <TextInput
                value={profile.firstName}
                editable={editing}
                onChangeText={(value) =>
                  handleChange("firstName", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                LAST NAME
              </Text>

              <TextInput
                value={profile.lastName}
                editable={editing}
                onChangeText={(value) =>
                  handleChange("lastName", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>
          </View>

          {/* EMAIL / PHONE */}

          <View
            style={[
              styles.formRow,
              isMobile && styles.formRowMobile,
            ]}
          >
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                EMAIL
              </Text>

              <TextInput
                value={profile.email}
                editable={editing}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) =>
                  handleChange("email", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                PHONE
              </Text>

              <TextInput
                value={profile.phone}
                editable={editing}
                keyboardType="phone-pad"
                onChangeText={(value) =>
                  handleChange("phone", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>
          </View>

          {/* ADDRESS */}

          <View style={styles.fullField}>
            <Text style={styles.fieldLabel}>
              ADDRESS
            </Text>

            <TextInput
              value={profile.address}
              editable={editing}
              multiline
              numberOfLines={3}
              onChangeText={(value) =>
                handleChange("address", value)
              }
              style={[
                styles.input,
                styles.addressInput,
                !editing && styles.disabledInput,
              ]}
            />
          </View>

          {/* CITY / STATE / PINCODE */}

          <View
            style={[
              styles.formRow,
              isMobile && styles.formRowMobile,
            ]}
          >
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                CITY
              </Text>

              <TextInput
                value={profile.city}
                editable={false}
                onChangeText={(value) =>
                  handleChange("city", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>
                STATE
              </Text>

              <TextInput
                value={profile.state}
                editable={false}
                onChangeText={(value) =>
                  handleChange("state", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>

            <View style={styles.formFieldSmall}>
              <Text style={styles.fieldLabel}>
                PINCODE
              </Text>

              <TextInput
                value={profile.pincode}
                editable={false}
                keyboardType="number-pad"
                onChangeText={(value) =>
                  handleChange("pincode", value)
                }
                style={[
                  styles.input,
                  !editing && styles.disabledInput,
                ]}
              />
            </View>
          </View>

          {/* ACTION BUTTONS */}

          {editing && (
            <View style={styles.formActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[styles.saveButton, saving && styles.disabledInput]}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Saving..." : "Save Changes"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },

  /* =========================
     PAGE HEADER
  ========================= */

  pageHeader: {
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 6,
  },

  pageDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#627A96",
  },

  /* =========================
     GRID
  ========================= */

  profileGrid: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },

  profileGridMobile: {
    flexDirection: "column",
  },

  leftColumn: {
    width: "100%",
  },

  leftColumnDesktop: {
    flex: 0.85,
  },

  formCardDesktop: {
    flex: 1.35,
  },

  /* =========================
     CARD
  ========================= */

  card: {
    width: "100%",

    backgroundColor: "rgba(255, 253, 248, 0.97)",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE9DE",

    padding: 24,

    shadowColor: "#132B45",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,

    marginBottom: 18,
  },

  /* =========================
     PROFILE HEADER
  ========================= */

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 78,
    height: 78,

    borderRadius: 39,

    backgroundColor: "#E8D9B5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 16,
  },

  avatarText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#675329",
  },

  profileHeaderInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 5,
  },

  profileEmail: {
    fontSize: 13,
    color: "#6D8095",
    marginBottom: 9,
  },

  clientBadge: {
    alignSelf: "flex-start",

    minHeight: 25,
    paddingHorizontal: 10,

    borderRadius: 13,

    backgroundColor: "#E9EFF5",

    alignItems: "center",
    justifyContent: "center",
  },

  clientBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#47627D",
  },

  profileDivider: {
    height: 1,
    backgroundColor: "#EAE7E0",
    marginVertical: 20,
  },

  profileInfoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  profileInfoLabel: {
    width: 75,
    fontSize: 13,
    color: "#8795A5",
  },

  profileInfoValue: {
    flex: 1,
    fontSize: 13,
    color: "#344B63",
  },

  /* =========================
     SECURITY
  ========================= */

  securityCard: {
    marginBottom: 0,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172F4D",
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#718399",
  },

  securityOption: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  securityIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#E9EFF5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  securityIconText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#48637D",
  },

  logoutIcon: {
    backgroundColor: "#F8EAEA",
  },

  logoutIconText: {
    fontSize: 20,
    color: "#A94C4C",
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#263C54",
    marginBottom: 3,
  },

  securityDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#8493A3",
  },

  securityButton: {
    height: 34,
    paddingHorizontal: 13,

    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  securityButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334960",
  },

  securityDivider: {
    height: 1,
    backgroundColor: "#EAE7E0",
    marginTop: 18,
  },

  logoutButton: {
    height: 34,
    paddingHorizontal: 13,

    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E7CACA",
    backgroundColor: "#FFF7F7",

    alignItems: "center",
    justifyContent: "center",
  },

  logoutButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A94C4C",
  },

  /* =========================
     FORM
  ========================= */

  formCard: {
    marginBottom: 0,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  editButton: {
    height: 38,
    paddingHorizontal: 15,

    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 15,
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#263C54",
  },

  formDivider: {
    height: 1,
    backgroundColor: "#EAE7E0",
    marginVertical: 22,
  },

  formRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },

  formRowMobile: {
    flexDirection: "column",
    gap: 0,
  },

  formField: {
    flex: 1,
    marginBottom: 0,
  },

  formFieldSmall: {
    flex: 0.7,
  },

  fullField: {
    width: "100%",
    marginBottom: 18,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#72859A",
    marginBottom: 7,
  },

  input: {
    minHeight: 45,

    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#DCE2E8",

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 13,

    fontSize: 13,
    color: "#263C54",
  },

  disabledInput: {
    backgroundColor: "#F8F8F6",
    color: "#4D6278",
  },

  addressInput: {
    minHeight: 78,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  /* =========================
     FORM ACTIONS
  ========================= */

  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,

    marginTop: 4,
    paddingTop: 20,

    borderTopWidth: 1,
    borderTopColor: "#EAE7E0",
  },

  cancelButton: {
    height: 42,
    paddingHorizontal: 18,

    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#DCE2E8",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334960",
  },

  saveButton: {
    height: 42,
    paddingHorizontal: 20,

    borderRadius: 21,

    backgroundColor: "#16324F",

    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default ClientProfileScreen;
