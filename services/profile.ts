import v1Api from '@/utils/v1-axios-instance';

export interface CustomerProfile {
  id: string;
  phone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  gender: string | null;
  dob: string | null;
  profilePictureUrl: string | null;
}

export interface ProfileApiResponse {
  success: boolean;
  data: CustomerProfile;
}

export async function getProfile(): Promise<ProfileApiResponse> {
  const { data } = await v1Api.get<ProfileApiResponse>('/customer/profile');
  return data;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  dob?: string;
  profilePictureUrl?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data?: CustomerProfile;
  message?: string;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UpdateProfileResponse> {
  const { data } = await v1Api.put<UpdateProfileResponse>('/customer/profile', payload);
  return data;
}
