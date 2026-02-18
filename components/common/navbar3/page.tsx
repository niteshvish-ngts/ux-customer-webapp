"use client";

import { Booking } from '@/components/shared/images/image';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAccessToken } from '@/utils/token';
import { logout as logoutApi } from '@/services/auth';
import { getProfile } from '@/services/profile';

export default function Navbar3() {
  const router = useRouter();
  const pathname = usePathname();
  const headingText = pathname === '/cart' ? 'My Cart' : pathname === '/checkout' ? 'Checkout' : 'Checkout';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState<string>('User');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const loggedIn = !!getAccessToken();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      getProfile()
        .then((res) => {
          if (res?.success && res?.data) {
            const d = res.data;
            const name =
              d.fullName ??
              [d.firstName, d.lastName].filter(Boolean).join(' ').trim();
            setUserFullName(name || 'User');
          }
        })
        .catch(() => setUserFullName('User'));
    } else {
      setUserFullName('User');
    }
  }, [pathname]);
  const [locationStyle, setLocationStyle] = useState({ top: 0, left: 0, minWidth: 0 });
  const [userStyle, setUserStyle] = useState({ top: 0, right: 0, left: "auto" as number | "auto" });
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const locationMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const updateLocationPosition = () => {
    if (locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect();
      setLocationStyle({ top: rect.bottom + 8, left: rect.left, minWidth: rect.width });
    }
  };
  const updateUserPosition = () => {
    if (userRef.current) {
      const rect = userRef.current.getBoundingClientRect();
      setUserStyle({ top: rect.bottom + 8, right: window.innerWidth - rect.right, left: "auto" });
    }
  };

  useLayoutEffect(() => {
    if (locationDropdownOpen) updateLocationPosition();
  }, [locationDropdownOpen]);
  useLayoutEffect(() => {
    if (userDropdownOpen) updateUserPosition();
  }, [userDropdownOpen]);

  useEffect(() => {
    if (!locationDropdownOpen && !userDropdownOpen) return;
    const handleScrollResize = () => {
      if (locationDropdownOpen) updateLocationPosition();
      if (userDropdownOpen) updateUserPosition();
    };
    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);
    return () => {
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [locationDropdownOpen, userDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (locationDropdownOpen && locationRef.current && !locationRef.current.contains(target) && locationMenuRef.current && !locationMenuRef.current.contains(target)) {
        setLocationDropdownOpen(false);
      }
      if (userDropdownOpen && userRef.current && !userRef.current.contains(target) && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [locationDropdownOpen, userDropdownOpen]);

    return (
        <div>

          <header className="bg-white border-b border-slate-100">
                  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-base text-dark hover:text-gray-700 transition font-outfit font-medium"
                              >
                                <Image
                                  src={Booking.bookingImg3}
                                  alt="Back"
                                  width={16}
                                  height={16}
                                />
                                {headingText}
                    </button>
                    <div className="flex items-center gap-4">
            
            {/* Cart - hidden on mobile */}
            <button
              onClick={() => router.push('/cart')}
              className="
                hidden md:flex
                p-2.5 rounded-3xl
                text-muted-foreground
                border border-border 
                hover:bg-muted
                transition
              "
            >
              <ShoppingCart className="w-5 h-5 text-dark" />
            </button>

            {isLoggedIn ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="
                  flex items-center gap-2
                  px-3 py-2
                  hover:bg-gray-50
                  rounded-md
                  transition
                "
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-linear-to-br from-purple-400 to-pink-400">
                  <Image
                    src="/user-avatar.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                {/* Name + chevron hidden on mobile, only avatar shows; click opens dropdown */}
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {userFullName}
                  </span>
                </div>
                <ChevronDown 
                  className={`hidden md:block w-4 h-4 text-gray-500 transition-transform ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* User Dropdown Menu - Portal so it appears below button, above bottom nav */}
              {typeof document !== "undefined" &&
                userDropdownOpen &&
                createPortal(
                  <div
                    ref={userMenuRef}
                    className="fixed w-36 py-2 px-1 rounded-xl md:w-48 md:py-3 md:rounded-2xl bg-white border border-gray-200 shadow-lg z-999"
                    style={{ top: userStyle.top, right: userStyle.right, left: userStyle.left }}
                  >
                    <Link
                      href="/help-center"
                      className="block px-3 py-2 text-xs text-gray-900 hover:bg-gray-50 rounded-lg transition md:px-4 md:py-2.5 md:text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Help Center
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-3 py-2 text-xs text-gray-900 hover:bg-gray-50 rounded-lg transition md:px-4 md:py-2.5 md:text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-3 py-2 text-xs text-gray-900 hover:bg-gray-50 rounded-lg transition md:px-4 md:py-2.5 md:text-sm"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-50 rounded-lg transition font-medium md:px-4 md:py-2.5 md:text-sm"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsLoggedIn(false);
                        logoutApi();
                        router.push('/');
                      }}
                    >
                      Logout
                    </button>
                  </div>,
                  document.body
                )}
            </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-body border border-border rounded-md text-gray-900 hover:bg-gray-50 transition"
              >
                Login
              </Link>
            )}
          </div>
                  </div>
                </header>  
        </div>
    );
}

