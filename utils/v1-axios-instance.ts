import axios, { type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens, isAccessTokenExpired } from './token';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';
const v1BaseURL = `${baseURL}/v1`;

const v1Api = axios.create({
  baseURL: v1BaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const refreshRes = await axios.post<{
      accessToken?: string;
      refreshToken?: string;
      access_token?: string;
      refresh_token?: string;
    }>(
      `${v1BaseURL}/common/refresh-token`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const data = refreshRes.data ?? {};
    const access =
      data.accessToken ?? data.access_token ?? null;
    const refresh =
      data.refreshToken ?? data.refresh_token ?? refreshToken;
    if (access) {
      setTokens(access, refresh);
      return access;
    }
    return null;
  } catch {
    clearTokens();
    return null;
  }
}

// Request: set headers; for non-logout requests refresh expired access token and attach; for logout skip refresh
v1Api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const h = config.headers as Record<string, string>;
    h['Content-Type'] = 'application/json';
    h['Accept'] = 'application/json';

    const isLogoutRequest = config.url?.includes('/logout');
    if (isLogoutRequest) {
      // Logout: do not refresh; attach current token if present (backend may not require it)
      const token = getAccessToken();
      if (token) h['Authorization'] = `Bearer ${token}`;
      return config;
    }

    if (isAccessTokenExpired()) {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) h['Authorization'] = `Bearer ${newToken}`;
    } else {
      const token = getAccessToken();
      if (token) h['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: store tokens if API returns them (camelCase or snake_case)
v1Api.interceptors.response.use(
  (response) => {
    const data = response.data as Record<string, unknown>;
    const access =
      (data?.accessToken as string) ?? (data?.access_token as string);
    const refresh =
      (data?.refreshToken as string) ?? (data?.refresh_token as string);
    if (access) {
      setTokens(access, refresh ?? access);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isLogoutRequest = originalRequest?.url?.includes('/logout');

    if (error.response?.status === 401 && !originalRequest._retry && !isLogoutRequest) {
      originalRequest._retry = true;
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) {
        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
        return v1Api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default v1Api;
