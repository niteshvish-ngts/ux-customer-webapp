// app/service/page.tsx
"use client";

import ServiceCard from "@/components/service/service-card";
import CartSidebar from "@/components/service/cart";
import Navbar from "../common/navbar/page";
import Image from "next/image";
import { Booking, Services } from "../shared/images/image";
import Router from "next/router";

export default function ServicePage() {
  return (
    <>
    <Navbar/>
    <div className=" bg-background ">
      

  <div className="container flex items-center justify-between py-5">
    
    {/* LEFT */}
    <div>
      <h1 className="text-4xl font-semibold text-dark leading-tight">
        AC Service & Repair
      </h1>

      {/* STARS + REVIEWS */}
      <div className="mt-2 flex items-center gap-2">
        <Image
          src={Services.serviceImg2}
          alt="5 star rating"
          width={80}
          height={20}
          className="object-contain"
        />

        <span className="text-xs text-dark font-lato">
          2M reviews (11.9M Bookings)
        </span>
      </div>
    </div>

    {/* RIGHT FILTERS */}
    <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
      {["Maxx Saver", "Service", "Repair", "Installation"].map((item) => (
        <button
          key={item}
          className="
            rounded-md px-4 py-1.5
            text-sm font-semibold
            text-dark
            transition
            hover:bg-muted
            focus:outline-none
          "
        >
          {item}
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
            <h2 className="text-2xl font-medium mb-4 font-outfit">
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
                description="Applicable for both window and split ACs
                Indoor unit deep cleaning with foam & jet spray"
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
    
    </>
  );
}
