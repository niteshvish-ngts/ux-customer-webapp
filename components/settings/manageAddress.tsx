'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getProfile } from '@/services/profile';
import { getAllAddresses, deleteAddress, type CustomerAddress } from '@/services/address';
import EditAddressModal from '../ui/modals/EditAddressModal';

function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '';
  const trimmed = String(phone).trim();
  return trimmed.length === 10 ? `+91 ${trimmed}` : trimmed;
}

function labelFromAddressType(addressType: string | null | undefined): string {
  const t = (addressType ?? '').toUpperCase();
  if (t === 'HOME') return 'Home';
  if (t === 'OFFICE') return 'Office';
  if (t === 'OTHER') return 'Other';
  return t ? t.charAt(0) + t.slice(1).toLowerCase() : 'Address';
}

function formatAddressLine(a: CustomerAddress): string {
  const parts: string[] = [];
  if (a.line1) parts.push(a.line1);
  if (a.line2) parts.push(a.line2);
  if (a.landmark) parts.push(a.landmark);
  const cityState = [a.city, a.state].filter(Boolean).join(', ');
  if (cityState) parts.push(cityState);
  const pin = a.pincode ? `- ${a.pincode}` : '';
  return `${parts.join(', ')}${pin ? ` ${pin}` : ''}`.trim();
}

export default function ManageAddress() {
  const [profileName, setProfileName] = useState<string>('');
  const [profilePhone, setProfilePhone] = useState<string>('');
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.allSettled([getProfile(), getAllAddresses()])
      .then(([profileRes, addrRes]) => {
        if (cancelled) return;

        if (profileRes.status === 'fulfilled' && profileRes.value?.success) {
          const p = profileRes.value.data;
          const name =
            p.fullName ??
            [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
          setProfileName(name);
          setProfilePhone(formatPhone(p.phone));
        }

        if (addrRes.status === 'fulfilled' && addrRes.value?.success) {
          const list = (addrRes.value.data ?? []).filter((a) => !a.isDeleted);
          setAddresses(list);
        } else if (addrRes.status === 'rejected') {
          setError(
            addrRes.reason?.response?.data?.message ??
              addrRes.reason?.message ??
              'Failed to load addresses'
          );
        } else if (addrRes.status === 'fulfilled' && !addrRes.value?.success) {
          setError('Failed to load addresses');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedAddresses = useMemo(() => {
    const copy = [...addresses];
    copy.sort((a, b) => {
      const d = Number(b.isDefault) - Number(a.isDefault);
      if (d !== 0) return d;
      return (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '');
    });
    return copy;
  }, [addresses]);

  const openEditModal = (addr: CustomerAddress) => {
    setEditingAddress(addr);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingAddress(null);
  };

  const refetchAddresses = () => {
    getAllAddresses()
      .then((res) => {
        if (res?.success && res.data) {
          setAddresses(res.data.filter((a) => !a.isDeleted));
        }
      })
      .catch(() => {});
  };

  const handleDelete = (addr: CustomerAddress) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    setDeleteError(null);
    setDeletingId(addr.id);
    deleteAddress(addr.id)
      .then((res) => {
        if (res?.success) {
          refetchAddresses();
        } else {
          setDeleteError(res?.message ?? 'Failed to delete address.');
        }
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ??
          err?.message ??
          'Failed to delete address.';
        setDeleteError(msg);
      })
      .finally(() => setDeletingId(null));
  };

  return (
    <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8">
      <h2 className="text-[1.875rem] font-bold text-[#2D3748] font-heading mb-6 leading-tight">
        Saved Addresses
      </h2>

      <div className="space-y-4">
        {loading && (
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-600 font-body">
            Loading addresses…
          </div>
        )}
        {!loading && error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 shadow-sm text-sm text-red-700 font-body">
            {error}
          </div>
        )}
        {!loading && !error && sortedAddresses.length === 0 && (
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-600 font-body">
            No saved addresses found.
          </div>
        )}
        {!loading && !error && deleteError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 shadow-sm text-sm text-red-700 font-body">
            {deleteError}
          </div>
        )}
        {!loading && !error && sortedAddresses.length > 0 &&
          sortedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-center w-12 h-12 min-w-12 rounded-lg bg-gray-100 shrink-0">
                <MapPin className="w-6 h-6 text-gray-600" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-[#2D3748] font-body leading-snug">
                  {(profileName || '—')} {profilePhone ? `| ${profilePhone}` : ''}
                </p>
                <p className="mt-1 text-sm font-normal text-[#718096] font-body leading-relaxed">
                  {formatAddressLine(addr)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 sm:pt-0">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm font-normal text-[#2D3748] font-body">
                    {labelFromAddressType(addr.addressType)}
                  </span>
                  {addr.isDefault ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-sm font-normal text-green-700 font-body border border-green-200">
                      Default
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditModal(addr)}
                    className="text-sm font-normal text-[#4A5568] font-body underline hover:text-gray-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(addr)}
                    disabled={deletingId === addr.id}
                    className="px-4 py-2 rounded-lg bg-[#E53E3E] text-white text-sm font-bold font-body hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {deletingId === addr.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <EditAddressModal
        open={editModalOpen}
        onClose={closeEditModal}
        address={editingAddress}
        onSaved={() => {
          refetchAddresses();
          closeEditModal();
        }}
      />
    </div>
  );
}
