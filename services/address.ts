import v1Api from '@/utils/v1-axios-instance';

export type AddressType = 'HOME' | 'OFFICE' | 'OTHER' | string;

export interface CustomerAddress {
  id: string;
  userId: string;
  addressType: AddressType;
  line1: string;
  line2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: string | null;
  longitude: string | null;
  isDefault: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GetAllAddressesResponse {
  success: boolean;
  data: CustomerAddress[] | CustomerAddress;
}

export async function getAllAddresses(): Promise<{ success: boolean; data: CustomerAddress[] }> {
  const res = await v1Api.get<GetAllAddressesResponse>('/customer/addresses');
  const raw = res.data?.data;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return { success: Boolean(res.data?.success), data: list };
}

export interface CreateAddressPayload {
  addressType: string;
  line1: string;
  line2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface CreateAddressResponse {
  success: boolean;
  data: CustomerAddress;
}

export async function createAddress(
  payload: CreateAddressPayload
): Promise<CreateAddressResponse> {
  const { data } = await v1Api.post<CreateAddressResponse>(
    '/customer/addresses',
    payload
  );
  return data;
}

export interface UpdateAddressPayload {
  addressType: string;
  line1: string;
  line2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface UpdateAddressResponse {
  success: boolean;
  data: CustomerAddress;
}

export async function updateAddress(
  addressId: string,
  payload: UpdateAddressPayload
): Promise<UpdateAddressResponse> {
  const { data } = await v1Api.put<UpdateAddressResponse>(
    `/customer/addresses/${addressId}`,
    payload
  );
  return data;
}

export interface DeleteAddressResponse {
  success: boolean;
  message?: string;
}

export async function deleteAddress(
  addressId: string
): Promise<DeleteAddressResponse> {
  const { data } = await v1Api.delete<DeleteAddressResponse>(
    `/customer/addresses/${addressId}`
  );
  return data;
}

