const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/** Buffer in seconds before expiry to treat token as expired */
const EXPIRY_BUFFER_SEC = 30;

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Decode JWT payload (no verification; client-side expiry check only).
 * Returns true if token is missing, invalid, or expired (with buffer).
 */
export function isAccessTokenExpired(): boolean {
  const token = getAccessToken();
  if (!token) return true;
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload)) as { exp?: number };
    const exp = decoded.exp;
    if (typeof exp !== 'number') return true;
    return Date.now() / 1000 >= exp - EXPIRY_BUFFER_SEC;
  } catch {
    return true;
  }
}
