'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateAddress, type CustomerAddress } from '@/services/address';
import { ModalDrawer } from '@/components/ui/ModalDrawer';

const ADDRESS_TYPE_OPTIONS = [
  { value: 'HOME', label: 'Home' },
  { value: 'WORK', label: 'Work' },
  { value: 'OFFICE', label: 'Office' },
  { value: 'OTHER', label: 'Other' },
];

type Props = {
  open: boolean;
  onClose: () => void;
  address: CustomerAddress | null;
  onSaved: () => void;
};

function parseNum(s: string | null | undefined): number {
  if (s == null || s === '') return 59.076;
  const n = parseFloat(String(s).trim());
  return Number.isNaN(n) ? 59.076 : n;
}

export default function EditAddressModal({
  open,
  onClose,
  address,
  onSaved,
}: Props) {
  const [addressType, setAddressType] = useState('HOME');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState(59.076);
  const [longitude, setLongitude] = useState(66.8777);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !address) return;
    setAddressType((address.addressType ?? 'HOME').toString().toUpperCase());
    setLine1(address.line1 ?? '');
    setLine2(address.line2 ?? '');
    setLandmark(address.landmark ?? '');
    setCity(address.city ?? '');
    setState(address.state ?? '');
    setPincode(address.pincode ?? '');
    setLatitude(parseNum(address.latitude));
    setLongitude(parseNum(address.longitude));
    setError(null);
  }, [open, address]);

  const handleSave = () => {
    if (!address) return;
    setError(null);
    const line1Trim = line1.trim();
    if (!line1Trim || !city.trim() || !state.trim() || !pincode.trim()) {
      setError('Please fill Line 1, City, State and Pincode.');
      return;
    }
    setSaving(true);
    updateAddress(address.id, {
      addressType,
      line1: line1Trim,
      line2: line2.trim() || null,
      landmark: landmark.trim() || null,
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      latitude,
      longitude,
    })
      .then((res) => {
        if (res?.success) {
          onSaved();
          onClose();
        } else {
          setError('Failed to update address.');
        }
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ??
          err?.response?.data?.errors?.[0] ??
          err?.message ??
          'Failed to update address.';
        setError(msg);
      })
      .finally(() => setSaving(false));
  };

  if (!open) return null;

  return (
    <ModalDrawer
      open={open}
      onClose={onClose}
      contentClassName="w-full max-w-xl bg-white shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#2D3748]">Edit Address</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A5568] hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
              Save Address As
            </label>
            <select
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
            >
              {ADDRESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
              Line 1
            </label>
            <input
              type="text"
              placeholder="eg. 123/A, Flat 302"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
              Line 2 (optional)
            </label>
            <input
              type="text"
              placeholder="eg. Building name"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
              Landmark (optional)
            </label>
            <input
              type="text"
              placeholder="eg. near airport"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
                City
              </label>
              <input
                type="text"
                placeholder="eg. Indore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
                State
              </label>
              <input
                type="text"
                placeholder="eg. MP"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
                Pincode
              </label>
              <input
                type="text"
                placeholder="eg. 452010"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(parseNum(e.target.value))}
                className="w-full px-3 py-2.5 text-sm text-[#2D3748] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-1.5">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(parseNum(e.target.value))}
                className="w-full px-3 py-2.5 text-sm text-[#2D3748] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-lg bg-prime hover:bg-prime/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition"
          >
            {saving ? 'Saving…' : 'Update Address'}
          </button>
        </div>
    </ModalDrawer>
  );
}
