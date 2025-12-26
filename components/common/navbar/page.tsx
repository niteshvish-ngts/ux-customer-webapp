"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="font-semibold text-lg text-gray-900">
              UrbanXperts
            </span>
          </Link>

          {/* CENTER: Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-700">
            <Link href="#" className="hover:text-orange-500">
              How it works?
            </Link>
            <Link href="#" className="hover:text-orange-500">
              Services
            </Link>
            <Link href="#" className="hover:text-orange-500">
              Become a provider
            </Link>
          </nav>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            >
              Login
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-4 space-y-3 text-sm">
            <Link href="#" className="block">
              How it works?
            </Link>
            <Link href="#" className="block">
              Services
            </Link>
            <Link href="#" className="block">
              Become a provider
            </Link>

            <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none"
              />
            </div>

            <Link
              href="/login"
              className="block w-full text-center px-4 py-2 border rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
