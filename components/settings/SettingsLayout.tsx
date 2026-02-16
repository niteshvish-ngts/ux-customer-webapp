'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Booking, Settings } from '@/components/shared/images/image';
import { SlidersHorizontal } from 'lucide-react';

interface SettingsLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function SettingsLayout({ sidebar, children }: SettingsLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50/80 px-4 py-6 md:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 font-body"
      >
        <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
        back
      </button>

      <div className="flex items-center gap-2 mb-6">
  <h1 className="text-4xl font-semibold text-dark font-heading">Settings</h1>
  <Image 
    src={Settings.settingsImg1} 
    alt="Settings icon" 
    width={24}
    height={24}
    className="w-6 h-6 mt-1" 
  />
</div>

      <div className="flex gap-6 flex-col lg:flex-row lg:items-stretch">
        {/* Sidebar: 20%, fixed height, sticky */}
        <aside className="w-full lg:w-[20%] lg:min-w-50 lg:sticky lg:top-6 lg:self-start shrink-0 lg:h-[calc(100vh-7rem)]">
          {sidebar}
        </aside>
        {/* Main content: 80%, scrollable */}
        <main className="flex-1 min-w-0 w-full lg:w-[80%] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden border border-gray-200 rounded-2xl bg-white p-6 shadow-sm [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold">
          {children}
        </main>
      </div>
    </div>
  );
}
