'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Booking } from '@/components/shared/images/image';
import { SlidersHorizontal } from 'lucide-react';

interface SettingsLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function SettingsLayout({ sidebar, children }: SettingsLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50/80 px-4 py-6 md:px-6">
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 font-body"
      >
        <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
        back
      </Link>

      <div className="flex items-start gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 font-heading">Settings</h1>
        <SlidersHorizontal className="w-6 h-6 text-gray-600" aria-hidden />
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar: 20% */}
        <aside className="w-full lg:w-[20%] lg:min-w-[200px] shrink-0">
          {sidebar}
        </aside>
        {/* Main content: 80% */}
        <main className="flex-1 min-w-0 w-full lg:w-[80%]">
          {children}
        </main>
      </div>
    </div>
  );
}
