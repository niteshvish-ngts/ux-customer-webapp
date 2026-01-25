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
      <Navbar />
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
          <hr className="my-12 border-[#E6EFFA]" />

          <section className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">Service</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (1.9M reviews)"
                account={2}
                time="1 hr 30 mins worktime"
                pricePerUnit={540}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
Indoor unit deep cleaning with foam & jet spray`}
                onAdd={() => {}}
              />
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">
              Repair & gas refill
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="AC less/no cooling repair"
                rating="4.4 (437K reviews)"
                time="2 hrs 30 mins worktime"
                pricePerUnit={540}
                account={2}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />

              <ServiceCard
                title="AC noise/smell repair"
                rating="4.4 (437K reviews)"
                account={2}
                time="60 mins worktime"
                pricePerUnit={499}
                originalPrice={2500}
                discountedPrice={499}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />

              <ServiceCard
                title="Gas refill & check-up"
                rating="4.79 (118K reviews)"
                account={2}
                time="2 hrs 30 mins worktime"
                pricePerUnit={540}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />

              <ServiceCard
                title="AC water leakage repair"
                rating="4.79 (118K reviews)"
                time="60 mins worktime"
                account={2}
                pricePerUnit={599}
                originalPrice={2500}
                discountedPrice={599}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />
            </div>
          </section>
          {/* installetion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">
              Installation/uninstallation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Split AC installation"
                rating="4.70 (112K reviews)"
                time="2 hrs worktime"
                pricePerUnit={1499}
                account={2}
                originalPrice={2500}
                discountedPrice={1499}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />

              <ServiceCard
                title="Window AC installation"
                rating="4.4 (437K reviews)"
                time="60 mins worktime"
                pricePerUnit={1099}
                account={2}
                originalPrice={2500}
                discountedPrice={1099}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
              />
              <ServiceCard
                title="Window AC installation"
                rating="4.4 (437K reviews)"
                time="60 mins worktime"
                pricePerUnit={1099}
                account={2}
                originalPrice={2500}
                discountedPrice={1099}
                description={`Applicable for both window or split ACs
Indoor unit regular checkup included`}
                onAdd={() => {}}
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
