"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { logoImage } from "@/components/shared/images/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/utils/token";
import { logout as logoutApi } from "@/services/auth";
import { getProfile } from "@/services/profile";
import { Drawer, DrawerContentLeft } from "@/components/ui/reuseable-items/drawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState<string>("User");
  const [userStyle, setUserStyle] = useState({ top: 0, right: 0, left: "auto" as number | "auto" });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileServicesTriggerRef = useRef<HTMLButtonElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const userRefMobile = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userClosedByTriggerRef = useRef(false);
  const pathname = usePathname();

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
              [d.firstName, d.lastName].filter(Boolean).join(" ").trim();
            setUserFullName(name || "User");
          }
        })
        .catch(() => setUserFullName("User"));
    } else {
      setUserFullName("User");
    }
  }, [pathname]);

  const updateUserPosition = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const el = isMobile ? userRefMobile.current : userRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setUserStyle({ top: rect.bottom + 8, right: window.innerWidth - rect.right, left: "auto" });
    }
  };

  useLayoutEffect(() => {
    if (userDropdownOpen) updateUserPosition();
  }, [userDropdownOpen]);

  useEffect(() => {
    if (!userDropdownOpen) return;
    const handleScrollResize = () => updateUserPosition();
    window.addEventListener('scroll', handleScrollResize, true);
    window.addEventListener('resize', handleScrollResize);
    return () => {
      window.removeEventListener('scroll', handleScrollResize, true);
      window.removeEventListener('resize', handleScrollResize);
    };
  }, [userDropdownOpen]);

  // Close dropdown when clicking outside (ignore clicks on the trigger buttons so toggle works)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOnServicesTrigger =
        dropdownRef.current?.contains(target) || mobileServicesTriggerRef.current?.contains(target);
      if (!isOnServicesTrigger) {
        setServicesDropdownOpen(false);
      }
      const userTrigger = userRef.current ?? userRefMobile.current;
      const isOnUserTrigger = userTrigger?.contains(target);
      const isOnUserMenu = userMenuRef.current?.contains(target);
      if (userDropdownOpen && !isOnUserTrigger && !isOnUserMenu) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesDropdownOpen, userDropdownOpen]);

  // Close mobile drawer when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      category: 'Cleaning Services',
      items: [
        { name: 'Deep Bathroom Cleaning', count: 2 },
        { name: 'Intense Cleaning', count: 2 },
        { name: 'Classic Cleaning', count: 2 },
        { name: 'Move in Bathroom Cleaning', count: 2 },
        { name: 'Fridge Cleaning', count: 1 },
      ],
      viewAll: true,
    },
    {
      category: 'AC Services',
      items: [
        { name: 'Lite AC Service', count: null },
        { name: 'AC Installation', count: 2, suffix: 'ACs' },
        { name: 'AC loss/Cooling Repair', count: null },
        { name: 'Foam-Jet AC Service', count: null },
        { name: 'Window AC Uninstallation', count: null },
        { name: 'Split AC Installation', count: null },
      ],
      viewAll: false,
    },
    {
      category: 'Electrical Services',
      items: [
        { name: 'Switchbox Installation', count: 2 },
        { name: 'Wifi Smartwatch Installation', count: 2 },
        { name: 'Fan Installation', count: 5, suffix: 'fans' },
        { name: 'Microwave Repair', count: null },
        { name: 'Fridge Gas Filling', count: null },
        { name: 'Wall/ Ceiling Light Installation', count: null },
      ],
      viewAll: false,
    },
    {
      category: 'Other Major Services',
      items: [
        { name: 'Painting Inspection', count: null },
        { name: 'Wall Painting Service', count: 1, suffix: 'Walls' },
        { name: 'Renovation Services', count: null },
      ],
      viewAll: true,
    },
  ];
const route = useRouter();
  return (
    <header className="w-full border-b border-border bg-background relative z-50">
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src={logoImage.logoImg}
                alt="UrbanXperts Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-outfit font-medium text-xl text-dark">
              UrbanXperts
            </span>
          </Link>

          {/* CENTER: Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-body ">
            <Link href="#" className="hover:text-foreground transition">
              How it works?
            </Link>
            
            <div ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="
                  flex items-center gap-1
                  hover:text-foreground
                  transition
                "
              >
                Services
                <IoMdArrowDropdown  className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link href="#" className="hover:text-foreground transition">
              Become a provider
            </Link>
          </nav>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark" />
            <input
              type="text"
              placeholder="Search"
              className="
                w-full pl-9 pr-3 py-2.5 text-sm
                bg-background text-foreground
                border border-input rounded-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
              "
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => route.push('/cart')}
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

            {isLoggedIn ? (
              <div ref={userRef} className="relative hidden sm:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md transition"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-linear-to-br from-purple-400 to-pink-400">
                    <Image
                      src="/user-avatar.jpg"
                      alt="User"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">{userFullName}</span>
                  </div>
                  <ChevronDown
                    className={`hidden md:block w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="
                  hidden sm:inline-flex items-center justify-center
                  px-6.5 py-2.5 text-sm font-body
                  border border-border rounded-md
                  text-black
                  hover:bg-muted
                  transition
                "
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="
                lg:hidden p-2 rounded-md
                text-muted-foreground
                hover:bg-muted
                transition
              "
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Services Dropdown - Desktop */}
      {servicesDropdownOpen && (
        <div 
          className="hidden lg:block absolute left-0 right-0 top-full z-100 bg-white border-b border-slate-200 shadow-xl"
        >
          <div className="container py-8">
            <div className="grid grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index}>
                  <h3 className="font-medium text-base mb-4 font-outfit">
                    {service.category}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          href="#" 
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-sm  hover:text-prime transition-colors block font-lato"
                        >
                          {item.name}
                          {item.count && (
                            <span className="text-xs text-text-muted-foreground">
                              {' '}({item.count} {item.suffix || 'bathrooms'})
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                    {service.viewAll && (
                      <li>
                        <Link 
                          href="#" 
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-sm text-prime hover:text-prime font-medium"
                        >
                          See All Services
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU – left drawer with z-index */}
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerContentLeft className="lg:hidden">
          <div
            className="flex flex-col h-full overflow-y-auto p-4 pt-6 space-y-4 text-sm font-lato"
            onClick={(e) => {
              if (userDropdownOpen && userRefMobile.current?.contains(e.target as Node)) {
                setUserDropdownOpen(false);
              }
            }}
          >
            {/* User profile / Login at top of drawer */}
            {isLoggedIn ? (
              <div ref={userRefMobile} className={`pb-2 ${userDropdownOpen ? "relative z-103" : ""}`}>
                <button
                  type="button"
                  onTouchStart={(e) => {
                    if (userDropdownOpen) {
                      setUserDropdownOpen(false);
                      userClosedByTriggerRef.current = true;
                    }
                  }}
                  onMouseDown={(e) => {
                    if (userDropdownOpen) {
                      e.preventDefault();
                      e.stopPropagation();
                      setUserDropdownOpen(false);
                      userClosedByTriggerRef.current = true;
                    }
                  }}
                  onClick={() => {
                    if (userClosedByTriggerRef.current) {
                      userClosedByTriggerRef.current = false;
                      return;
                    }
                    setUserDropdownOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-2 pl-1 py-2 hover:bg-gray-50 rounded-md transition w-full justify-start text-left"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-linear-to-br from-purple-400 to-pink-400 shrink-0">
                    <Image
                      src="/user-avatar.jpg"
                      alt="User"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">{userFullName}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${userDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ) : (
              <div className="pb-2 border-b border-border">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
            <Link href="#" className="block text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              How it works?
            </Link>
            <button
              ref={mobileServicesTriggerRef}
              type="button"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1 text-left text-muted-foreground hover:text-foreground transition w-full"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-4 py-2">
                {services.map((service, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{service.category}</h3>
                    <ul className="space-y-2 pl-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href="#"
                            className="text-sm text-slate-700 hover:text-prime transition-colors block"
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                            {item.count != null && (
                              <span className="text-slate-500">
                                {" "}({item.count} {item.suffix || "bathrooms"})
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                      {service.viewAll && (
                        <li>
                          <Link href="#" className="text-sm text-prime font-medium" onClick={() => setOpen(false)}>
                            See All Services
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Link href="#" className="block text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              Become a provider
            </Link>
            {/* <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 text-sm bg-background text-foreground border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div> */}
          </div>
        </DrawerContentLeft>
      </Drawer>

      {/* User dropdown – desktop + mobile (drawer) – portal so it shows above drawer */}
      {typeof document !== "undefined" &&
        isLoggedIn &&
        userDropdownOpen &&
        createPortal(
          <div
            ref={userMenuRef}
            className="fixed w-48 py-2 rounded-xl bg-white border border-border shadow-lg z-102"
            style={{ top: userStyle.top, right: userStyle.right, left: userStyle.left }}
          >
            <Link
              href="/help-center"
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition"
              onClick={() => setUserDropdownOpen(false)}
            >
              Help Center
            </Link>
            <Link
              href="/bookings"
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition"
              onClick={() => setUserDropdownOpen(false)}
            >
              My Bookings
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition"
              onClick={() => setUserDropdownOpen(false)}
            >
              Settings
            </Link>
            <button
              type="button"
              className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-muted rounded-lg transition font-medium"
              onClick={() => {
                setUserDropdownOpen(false);
                setIsLoggedIn(false);
                logoutApi();
                route.push("/");
              }}
            >
              Logout
            </button>
          </div>,
          document.body
        )}
    </header>
  );
}