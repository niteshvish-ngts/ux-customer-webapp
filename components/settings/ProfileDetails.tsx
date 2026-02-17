'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Settings } from '@/components/shared/images/image';
import { getProfile, updateProfile } from '@/services/profile';

const SUPPORTED_FORMATS = 'SVG, JPG, PNG (10mb each)';

function formatPhone(phone: string | null): string {
  if (!phone) return '';
  return phone.length === 10 ? `+91 ${phone}` : phone;
}

/** Today in YYYY-MM-DD for DOB max (no future dates). */
function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Normalize dob for input type="date" (YYYY-MM-DD). API may return ISO string or date-only. */
function formatDobForInput(dob: string | null): string {
  if (!dob) return '';
  const trimmed = dob.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10);
  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  return trimmed;
}

/** Returns true if dob string (YYYY-MM-DD) is after today. */
function isDobAfterToday(dob: string): boolean {
  if (!dob.trim()) return false;
  const d = dob.trim().slice(0, 10);
  return d > getTodayDateString();
}

export default function ProfileDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProfile()
      .then((res) => {
        if (cancelled || !res.success || !res.data) return;
        const d = res.data;
        setFirstName(d.firstName ?? '');
        setLastName(d.lastName ?? '');
        setPhone(formatPhone(d.phone));
        setEmail(d.email ?? '');
        setGender(d.gender ?? '');
        setDob(formatDobForInput(d.dob));
        setProfilePictureUrl(d.profilePictureUrl ?? null);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load profile');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    if (dob.trim() && isDobAfterToday(dob)) {
      setError('Date of birth cannot be after today.');
      return;
    }
    setSaving(true);
    const pictureUrl = profilePictureUrl && profilePictureUrl.startsWith('http') ? profilePictureUrl : undefined;
    const payload = {
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      email: email.trim() || undefined,
      gender: gender.trim() || undefined,
      dob: dob.trim() || undefined,
      profilePictureUrl: pictureUrl,
    };
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'}/v1/customer/profile`;
    console.log('[ProfileDetails] Save clicked. Payload:', payload, '→ PUT', apiUrl);
    updateProfile(payload)
      .then((res) => {
        console.log('[ProfileDetails] API response:', res);
        if (res.success) {
          if (res.data) {
            const d = res.data;
            setFirstName(d.firstName ?? '');
            setLastName(d.lastName ?? '');
            setEmail(d.email ?? '');
            setGender(d.gender ?? '');
            setDob(formatDobForInput(d.dob));
            setProfilePictureUrl(d.profilePictureUrl ?? null);
          }
          setSuccessMessage(res.message ?? 'Profile updated successfully.');
        } else {
          setError(res.message ?? 'Update failed.');
        }
      })
      .catch((err) => {
        const msg = err?.response?.data?.message ?? err?.response?.data?.errors?.[0] ?? err?.message ?? 'Failed to update profile';
        console.error('[ProfileDetails] API error:', err?.response?.data ?? err);
        setError(msg);
      })
      .finally(() => setSaving(false));
  };

  const avatarSrc = avatarPreview ?? profilePictureUrl;
  const initials = [firstName, lastName].filter(Boolean).map((s) => s.charAt(0)).join('') || '?';

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent font-body';
  const labelClass = 'block text-sm font-semibold text-gray-900 mb-1.5 font-body';

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] p-6 md:p-8">
        <p className="text-sm text-gray-500 font-body">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] p-6 md:p-8">
      {/* {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-800 font-body">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-green-800 font-body">{successMessage}</p>
        </div>
      // )} */}
      <form
        id="profile-form"
        onSubmit={(e) => { e.preventDefault(); handleSave(e); }}
        className="space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h2 className="text-lg font-bold text-gray-900 font-heading">Profile Details</h2>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave({ preventDefault: () => {} } as React.FormEvent)}
            className="px-7 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition shrink-0 border border-amber-200/80 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className={labelClass}>First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="gender" className={labelClass}>Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div>
            <label htmlFor="dob" className={labelClass}>Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              max={getTodayDateString()}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3 font-body">Change Avatar</p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {avatarSrc ? (
                avatarSrc.startsWith('http') ? (
                  <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Image src={avatarSrc} alt="Avatar" fill className="object-cover" unoptimized />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-semibold">
                  {initials}
                </div>
              )}
            </div>
            <div className="flex-1 w-full min-w-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full min-h-45 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center hover:border-prime/70 hover:bg-prime/5 transition cursor-pointer"
              >
               <span className="flex items-center justify-center w-14 h-14 rounded-full bg-prime/15">
  <Image 
    src={Settings.settingsImg3} 
    alt="Upload" 
    width={28}
    height={28}
    className="w-7 h-7"
  />
</span>
                <span className="text-sm font-body text-gray-600">
                  <span className="text-prime font-medium">Click here</span>
                  {' '}to upload your file or drag.
                </span>
                <span className="text-xs text-gray-500 font-body">Supported Format: {SUPPORTED_FORMATS}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}