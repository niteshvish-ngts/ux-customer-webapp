'use client';

import { MapPin } from 'lucide-react';

const SAVED_ADDRESSES = [
  {
    name: 'Nitesh Vishwakarma',
    phone: '9876543210',
    address:
      '123/c, Sector 12, 43 pillar Janice shanti nagar beside 10 feet road, Srinagar, Madhya Pradesh - 452001',
    label: 'Home',
  },
  {
    name: 'Nitesh Vishwakarma',
    phone: '9876543210',
    address:
      '123/c, Sector 12, 43 pillar Janice shanti nagar beside 10 feet road, Srinagar, Madhya Pradesh - 452001',
    label: 'Office',
  },
  {
    name: 'Nitesh Vishwakarma',
    phone: '9876543210',
    address:
      '123/c, Sector 12, 43 pillar Janice shanti nagar beside 10 feet road, Srinagar, Madhya Pradesh - 452001',
    label: 'Other',
  },
];

export default function ManageAddress() {
  return (
    <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8">
      <h2 className="text-[1.875rem] font-bold text-[#2D3748] font-heading mb-6 leading-tight">
        Saved Addresses
      </h2>

      <div className="space-y-4">
        {SAVED_ADDRESSES.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            {/* Left: Location icon */}
            <div className="flex items-center justify-center w-12 h-12 min-w-12 rounded-lg bg-gray-100 shrink-0">
              <MapPin className="w-6 h-6 text-gray-600" aria-hidden />
            </div>

            {/* Middle: Name, phone, address */}
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-[#2D3748] font-body leading-snug">
                {item.name} | {item.phone}
              </p>
              <p className="mt-1 text-sm font-normal text-[#718096] font-body leading-relaxed">
                {item.address}
              </p>
            </div>

            {/* Right: Label, Edit, Delete */}
            <div className="flex flex-col items-end gap-2 shrink-0 sm:pt-0">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm font-normal text-[#2D3748] font-body">
                {item.label}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-sm font-normal text-[#4A5568] font-body underline hover:text-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-[#E53E3E] text-white text-sm font-bold font-body hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
