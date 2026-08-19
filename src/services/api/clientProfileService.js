import apiClient from "./apiClient";

const splitName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { firstName: parts.shift() || "", lastName: parts.join(" ") };
};

export const mapClientProfile = (item) => ({
  clientId: item.clientId,
  ...splitName(item.name),
  email: item.email ?? "",
  phone: item.mobile ?? "",
  address: item.address ?? "",
  city: "",
  state: "",
  pincode: "",
  idProof: item.idProof ?? "",
  profilePhotoPath: item.profilePhotoPath ?? null,
});

export const getClientProfile = async () => {
  const response = await apiClient.get("/api/client-portal/profile");
  if (!response.data?.data) throw new Error("Unsupported Client Profile response.");
  return mapClientProfile(response.data.data);
};

export const updateClientProfile = async (profile) => {
  const response = await apiClient.put("/api/client-portal/profile", {
    name: `${profile.firstName} ${profile.lastName}`.trim(),
    mobile: profile.phone,
    email: profile.email,
    address: profile.address,
  });
  const data = response.data?.data;
  if (data && typeof data === "object") return mapClientProfile(data);
  return getClientProfile();
};

export const uploadClientProfilePhoto = (file) => {
  const form = new FormData();
  form.append("file", { uri: file.uri, name: file.name, type: file.mimeType || "image/jpeg" });
  return apiClient.post("/api/client-portal/profile/photo", form);
};

export const changeClientPassword = (oldPassword, newPassword) => apiClient.put(
  "/api/client-portal/profile/password",
  { oldPassword, newPassword }
);
