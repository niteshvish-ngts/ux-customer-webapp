"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { logoImage } from "@/components/shared/images/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src={logoImage.logoImg}
                alt="UrbanXperts Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading font-semibold text-lg text-foreground">
              UrbanXperts
            </span>
          </Link>

          {/* CENTER: Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-body text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition">
              How it works?
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              Services
            </Link>
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
              className="
                p-2 rounded-2xl
                text-muted-foreground
                border border-border 
                hover:bg-muted
                transition
              "
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            <Link
              href="/login"
              className="
                hidden sm:inline-flex items-center justify-center
                px-4 py-2 text-sm font-body
                border border-border rounded-md
                text-foreground
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

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3 text-sm font-body">
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              How it works?
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Services
            </Link>
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
