const ROLE_ALIASES = {
  admin: "admin",
  administrator: "admin",
  lawyer: "lawyer",
  advocate: "lawyer",
  clerk: "clerk",
  client: "client",
};

export const normalizeRole = (value) => {
  if (typeof value !== "string") return null;
  return ROLE_ALIASES[value.trim().toLowerCase()] ?? null;
};

const firstDefined = (source, keys) => {
  for (const key of keys) {
    if (source?.[key] !== undefined && source[key] !== null) return source[key];
  }
  return null;
};

export const parseAuthResponse = (payload, realm) => {
  const data = payload?.data && typeof payload.data === "object" ? payload.data : payload;
  const accessToken = firstDefined(data, ["accessToken", "token"]);

  if (typeof accessToken !== "string" || !accessToken) {
    throw new Error("The authentication response did not include a supported access token field.");
  }

  return {
    accessToken,
    refreshToken: firstDefined(data, ["refreshToken"]),
    expiresAt: firstDefined(data, ["expiresAt", "expiration", "expiresOn"]),
    expiresIn: firstDefined(data, ["expiresIn"]),
    user: firstDefined(data, ["user", "appUser", "client"]),
    role: normalizeRole(firstDefined(data, ["role", "userRole"]) ?? data?.user?.role),
    realm,
  };
};

export const getUserRole = (user, fallbackRole = null) => normalizeRole(
  user?.role ?? user?.userRole ?? user?.roleName ?? fallbackRole
);
