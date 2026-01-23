// app/service/page.tsx
"use client";

import ServiceCard from "@/components/service/service-card";
import CartSidebar from "@/components/service/cart";
import Navbar from "../common/navbar/page";

export default function ServicePage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-background ">
      {/* HEADER */}
<div className="border-b bg-[#F8FAFC]">
  <div className="container py-5 flex items-center justify-between">
    {/* LEFT */}
    <div>
      <h1 className="text-[24px] font-semibold text-black leading-tight">
        AC Service & Repair
      </h1>

      <div className="flex items-center gap-2 mt-2">
        {/* STARS */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="w-4 h-4 flex items-center justify-center
              bg-[#FACC15] text-white text-[10px] rounded-sm"
            >
              ★
            </span>
          ))}
        </div>

        {/* REVIEWS */}
        <span className="text-xs text-muted-foreground">
          2M reviews (11.9M Bookings)
        </span>
      </div>
    </div>

    {/* RIGHT TABS */}
    <div className="flex items-center gap-2 border border-[#E6EFFA]">
      {["Maxx Saver", "Service", "Repair", "Installation"].map((t) => (
        <button
          key={t}
          className="
            h-8 px-4
            
            rounded-md
            text-xs font-medium
            text-black
            bg-white
            hover:bg-muted
            flex items-center
          "
        >
          {t}
        </button>
      ))}
    </div>
  </div>
</div>



      {/* CONTENT */}
      <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SERVICES */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-lg font-semibold mb-4">
              Maxx Saver Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => {}}
                isSaver
              />
            </div>
          </section>
        </div>

        {/* CART */}
        <CartSidebar />
      </div>
    </div>
    </>
  );
}
