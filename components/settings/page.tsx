'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import SettingsLayout from './SettingsLayout';
import ProfileDetails from './ProfileDetails';
import { logout as logoutApi } from '@/services/auth';
import MyBookingsPage from '@/app/bookings/page';

export type SettingsSection =
  | 'profile'
  | 'ratings'
  | 'bookings'
  | 'addresses'
  | 'refer'
  | 'help'
  | 'about';

const SIDEBAR_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'profile', label: 'Profile Details' },
  { id: 'ratings', label: 'My Ratings' },
  { id: 'bookings', label: 'My Bookings' },
  { id: 'addresses', label: 'Manage Addresses' },
  { id: 'refer', label: 'Refer & Earn' },
  { id: 'help', label: 'Help & Support' },
  { id: 'about', label: 'About UX' },
];

const VALID_SECTIONS: SettingsSection[] = SIDEBAR_ITEMS.map((i) => i.id);

function getSection(section: string | undefined): SettingsSection {
  if (section && VALID_SECTIONS.includes(section as SettingsSection)) {
    return section as SettingsSection;
  }
  return 'profile';
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <h2 className="text-lg font-semibold text-gray-900 font-heading mb-2">{title}</h2>
      <p className="text-sm text-gray-500 font-body">Content coming soon.</p>
    </div>
  );
}

interface SettingsPageProps {
  section?: string;
}

export default function SettingsPage({ section: sectionParam }: SettingsPageProps) {
  const activeSection = getSection(sectionParam);
  const router = useRouter();

  const handleLogout = () => {
    logoutApi();
    router.push('/');
  };

  const sidebar = (
    <nav className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
      <ul className="space-y-0.5">
        {SIDEBAR_ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={`/settings/${item.id}`}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-body transition ${
                activeSection === item.id
                  ? 'bg-prime/10 text-prime font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition font-body"
      >
        Logout
        <LogOut className="w-4 h-4" />
      </button>
    </nav>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileDetails />;
      case 'ratings':
        return <PlaceholderContent title="My Ratings" />;
      case 'bookings':
        return <MyBookingsPage />;
      case 'addresses':
        return <PlaceholderContent title="Manage Addresses" />;
      case 'refer':
        return <PlaceholderContent title="Refer & Earn" />;
      case 'help':
        return <PlaceholderContent title="Help & Support" />;
      case 'about':
        return <PlaceholderContent title="About UX" />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <SettingsLayout sidebar={sidebar}>
      {renderContent()}
    </SettingsLayout>
  );
}
