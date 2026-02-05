"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import { logoImage } from "@/components/shared/images/image";
import { useRouter } from "next/navigation";

export default function Navbar2() {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [locationStyle, setLocationStyle] = useState({ top: 0, left: 0, minWidth: 0 });
  const [userStyle, setUserStyle] = useState({ top: 0, right: 0, left: "auto" as number | "auto" });
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const locationMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    <header className="relative z-[100] w-full border-b border-border bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src={logoImage.logoImg}
                alt="UrbanXperts Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-lg text-gray-900">
              UrbanXperts
            </span>
          </Link>

          {/* CENTER: Location Dropdown + Search */}
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            
            {/* Location Dropdown */}
            <div ref={locationRef} className="relative">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="
                  flex items-center gap-2
                  px-4 py-2
                  text-sm text-gray-700
                  hover:bg-gray-50
                  rounded-md
                  border border-gray-200
                  transition
                  min-w-[220px]
                  z-[10]
                "
              >
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span className="flex-1 text-left truncate">
                  Gurugram - Delhi Expressway...
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    locationDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Location Dropdown Menu - Portal so it appears above bottom nav */}
              {typeof document !== "undefined" &&
                locationDropdownOpen &&
                createPortal(
                  <div
                    ref={locationMenuRef}
                    className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[9999]"
                    style={{ top: locationStyle.top, left: locationStyle.left, minWidth: locationStyle.minWidth }}
                  >
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      Gurugram - Delhi Expressway
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      New Delhi
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      Noida
                    </div>
                  </div>,
                  document.body
                )}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for 'AC Service & Repair'"
                className="
                  w-full pl-10 pr-4 py-2.5
                  text-sm text-gray-700
                  placeholder:text-gray-400
                  bg-white
                  border border-gray-200
                  rounded-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-prime
                  focus:border-transparent
                "
              />
            </div>
          </div>

          {/* RIGHT: Cart + User */}
          <div className="flex items-center gap-4">
            
            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              className="
                p-2.5 rounded-3xl
                text-muted-foreground
                border border-border 
                hover:bg-muted
                transition
              "
            >
              <ShoppingCart className="w-5 h-5 text-dark" />
            </button>

            {/* User Profile Dropdown */}
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
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-linear-to-br from-purple-400 to-pink-400">
                  <Image
                    src="/user-avatar.jpg" // Replace with actual user image
                    alt="User"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    Nitesh 
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform ${
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
                    className="fixed w-48 bg-white border border-gray-200 rounded-2xl shadow-lg z-999 py-3 px-1"
                    style={{ top: userStyle.top, right: userStyle.right, left: userStyle.left }}
                  >
                    <Link
                      href="/help-center"
                      className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Help Center
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 rounded-lg transition font-medium"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        // Add logout logic here
                      }}
                    >
                      Logout
                    </button>
                  </div>,
                  document.body
                )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}