"use client";

import BookingCard from "@/components/bookings/page";


export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-background font-[var(--font-outfit)]">
      {/* HEADER */}
      <div className="border-b bg-muted/30">
        <div className="container py-5 flex items-center justify-between">
          {/* LEFT */}
          <div className="space-y-1">
            <button className="text-sm text-muted-foreground flex items-center gap-1">
              ← back
            </button>

            <h1 className="flex items-center gap-2 text-4xl font-semibold leading-8 font-outfit">
              <span className="text-primary">▦</span>
              My Bookings
            </h1>
          </div>

          {/* RIGHT FILTERS */}
          <div className="flex gap-2">
            {["All Bookings", "Cancelled", "Completed", "In warranty"].map(
              (item, i) => (
                <button
                  key={i}
                  className="
                    px-4 py-2
                    rounded-lg
                    border
                    text-sm font-medium
                    hover:bg-muted
                  "
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-8 space-y-6">
        <h2 className="text-lg font-medium">All Bookings</h2>

<div
    className="
      grid gap-6
      grid-cols-1
      lg:grid-cols-2
      justify-items-center
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
  );
}
