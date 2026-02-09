"use client";

import BookingCard from "@/components/bookings/page";
import BottomNavbar from "@/components/common/bottom-navbar/page";
import Navbar2 from "@/components/common/navbar2/page";
import { Booking } from "@/components/shared/images/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function MyBookingsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Bookings");

  return (
    <>
    <Navbar2/>
    <div className="min-h-screen bg-background font-[var(--font-outfit)]">


      {/* HEADER */}
      <div className="">
        <div className="container py-5">
          {/* Mobile: Stacked layout, Desktop: Side by side */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* LEFT */}
            <div className="space-y-1">
              <button
                onClick={() => router.back()}
                className="hidden md:flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
                back
              </button>

              <h1 className="flex items-center gap-2 text-2xl lg:text-4xl font-semibold leading-8 font-outfit mt-3">
                <span className="flex items-center justify-center w-7 h-7">
                  <Image
                    src={Booking.bookingImg2}
                    alt="Bookings Icon"
                    width={34}
                    height={34}
                    className="object-contain"
                  />
                </span>
                My Bookings
              </h1>
            </div>

            {/* RIGHT FILTERS - Mobile: Full width, Desktop: Auto */}
            <div className="flex gap-2 border border-2 border-[#eef1f6] rounded-lg overflow-hidden w-full lg:w-auto">
              {["All Bookings", "Cancelled", "Completed", "In warranty"].map(
                (item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFilter(item)}
                    className={`px-2 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-secondary font-lato flex-1 lg:flex-none transition-colors ${
                      activeFilter === item ? 'bg-slate-100' : ''
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-4 lg:py-8 space-y-4 lg:space-y-6 pb-24 lg:pb-8">
        <h2 className="text-xl lg:text-2xl font-medium px-4 lg:px-0">All Bookings</h2>

<div
    className="
      grid gap-4 lg:gap-6
      grid-cols-1
      lg:grid-cols-2
      px-4 lg:px-0
    "
  >          <BookingCard
            title="Foam-jet service (2 ACs)"
            date="Date Completed: Dec 19, 2025"
            id="170356238345"
            price="₹2000"
            oldPrice="₹2500"
            statusTags={["In Warranty", "Completed"]}
            action="Write A Review"
            rating={0}
          />

          <BookingCard
            title="Window AC installation X 1"
            date="Date Scheduled: Dec 19, 2025"
            id="170356238354"
            price="₹2000"
            oldPrice="₹2500"
            statusTags={["Cancelled"]}
            action="Write A Reason to Cancel"
          />

          <BookingCard
            title="Foam-jet service (2 ACs)"
            date="Date Completed: Apr 10, 2025"
            id="170356238345"
            price="₹2000"
            oldPrice="₹2500"
            statusTags={["Warranty Expired", "Completed"]}
            rating={4}
            action="Write A Review"
          />
        </div>
      </div>
    </div>
    <BottomNavbar />
    </>
  );
}
