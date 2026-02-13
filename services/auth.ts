import v1Api from '@/utils/v1-axios-instance';
import { clearTokens, getRefreshToken } from '@/utils/token';

export type UserType = 'CUSTOMER' | 'EXPERT';

export interface SendOtpPayload {
  phone: string;
  userType: UserType;
}

export interface SendOtpResponse {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}

export async function sendOtp(payload: SendOtpPayload): Promise<SendOtpResponse> {
  const { data } = await v1Api.post<SendOtpResponse>('/common/send-otp', payload);
  return data;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  userType: UserType;
}

export interface VerifyOtpResponse {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const { data } = await v1Api.post<VerifyOtpResponse>('/common/verify-otp', payload);
  return data;
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  try {
    if (refreshToken) {
      await v1Api.post('/common/logout', { refreshToken });
    }
  } finally {
    clearTokens();
  }
}
