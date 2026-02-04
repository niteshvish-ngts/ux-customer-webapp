"use client";

import Navbar from "@/components/common/navbar/page";
import BottomNavbar from "@/components/common/bottom-navbar/page";
import { Booking } from "@/components/shared/images/image";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background font-[var(--font-outfit)]">
        {/* HEADER */}
        <div className="container py-5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
          >
            <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
            back
          </button>

          <h1 className="text-4xl font-semibold leading-8 font-outfit">
            Account
          </h1>
        </div>

        {/* CONTENT */}
        <div className="container py-8">
          <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
            <p className="text-slate-600">Account settings and profile information will be displayed here.</p>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
