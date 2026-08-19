import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "@veegpt_lms_session";
const LEGACY_TOKEN_KEY = "@veegpt_lms_token";
const LEGACY_USER_KEY = "@veegpt_lms_user";

export const saveAuthSession = async (session) => {
  if (!session?.accessToken || !session?.user || !session?.role || !session?.realm) {
    throw new Error("Cannot store an incomplete authentication session.");
  }

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  await AsyncStorage.multiRemove([LEGACY_TOKEN_KEY, LEGACY_USER_KEY]);
};

export const getAuthSession = async () => {
  const value = await AsyncStorage.getItem(SESSION_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    await clearAuthData();
    return null;
  }
};

export const updateAuthSession = async (updates) => {
  const current = await getAuthSession();
  if (!current) return null;

  const next = { ...current, ...updates };
  await saveAuthSession(next);
  return next;
};

export const getAuthToken = async () => {
  const session = await getAuthSession();
  return session?.accessToken ?? null;
};

export const getStoredUser = async () => {
  const session = await getAuthSession();
  return session?.user ?? null;
};

export const saveAuthData = async (accessToken, user, details = {}) => {
  return saveAuthSession({ accessToken, user, ...details });
};

export const clearAuthData = async () => {
  await AsyncStorage.multiRemove([
    SESSION_KEY,
    LEGACY_TOKEN_KEY,
    LEGACY_USER_KEY,
  ]);
};
