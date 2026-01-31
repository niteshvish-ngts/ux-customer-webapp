"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { logoImage } from "@/components/shared/images/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownOpen]);

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

  return (
    <header className="w-full border-b border-border bg-background relative z-50">
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-4">

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
            <span className="font-heading font-medium text-xl text-foreground">
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
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link href="#" className="hover:text-foreground transition">
              Become a provider
            </Link>
          </nav>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="
                w-full pl-9 pr-3 py-2 text-sm
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
              onClick={() => window.open("https://wa.link/pfsm61", "_blank")}
              className="
                p-2 rounded-2xl
                text-muted-foreground
                border border-border 
                hover:bg-muted
                transition
              "
            >
              <ShoppingCart className="w-5 h-5 text-black" />
            </button>

            <Link
              href="/login"
              className="
                hidden sm:inline-flex items-center justify-center
                px-6 py-2 text-sm font-body
                border border-border rounded-md
                text-black
                hover:bg-muted
                transition
              "
            >
              Login
            </Link>

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
          className="hidden lg:block absolute left-0 right-0 top-full z-[100] bg-white border-b border-slate-200 shadow-xl"
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
                          className="text-sm  hover:text-orange-600 transition-colors block font-lato"
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
                          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
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

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3 text-sm font-lato">
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              How it works?
            </Link>
            
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="
                flex items-center gap-1
                text-muted-foreground
                hover:text-foreground
                transition
                w-full
              "
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Services Dropdown */}
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-4 py-2">
                {services.map((service, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">
                      {service.category}
                    </h3>
                    <ul className="space-y-2 pl-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            href="#" 
                            className="text-sm text-slate-700 hover:text-orange-600 transition-colors block"
                          >
                            {item.name}
                            {item.count && (
                              <span className="text-slate-500">
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
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                          >
                            See All Services
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Become a provider
            </Link>

            <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="
                  w-full pl-9 pr-3 py-2 text-sm
                  bg-background text-foreground
                  border border-input rounded-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                "
              />
            </div>

            <Link
              href="/login"
              className="
                block w-full text-center
                px-4 py-2
                border border-border rounded-md
                text-foreground
                hover:bg-muted
              "
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}