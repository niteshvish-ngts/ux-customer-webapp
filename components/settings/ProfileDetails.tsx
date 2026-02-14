'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FolderOpen } from 'lucide-react';

const SUPPORTED_FORMATS = 'SVG, JPG, PNG (10mb each)';

export default function ProfileDetails() {
  const [firstName, setFirstName] = useState('Jhon');
  const [lastName, setLastName] = useState('Doe');
  const [phone, setPhone] = useState('+91 9876543210');
  const [email, setEmail] = useState('jhondoe@egemail.com');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call profile update API
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <form id="profile-form" onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 font-heading">Profile Details</h2>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition shrink-0"
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent font-body"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent font-body"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent font-body"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 font-body">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent font-body"
          />
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3 font-body">Change Avatar</p>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {avatarPreview ? (
                <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-semibold">
                  {firstName.charAt(0)}{lastName.charAt(0)}
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
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-prime hover:bg-prime/5 transition cursor-pointer"
              >
                <FolderOpen className="w-10 h-10 text-prime" />
                <span className="text-sm font-body">Click here to upload your file or drag.</span>
                <span className="text-xs text-gray-400 font-body">Supported Format: {SUPPORTED_FORMATS}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
