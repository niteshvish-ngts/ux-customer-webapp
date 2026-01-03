"use client";

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { HeroImage, icon } from "../../shared/images/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-background ">
      <div className="container py-10 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            {/* Trustpilot */}
            <div
              className="
    flex flex-col items-center gap-2
    sm:flex-row sm:items-center sm:gap-3
    text-sm text-muted-foreground
  "
            >
              {/* Stars */}
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className="bg-[#219653] px-2 py-2 text-white leading-none"
                  >
                    {icon.star}
                  </span>
                ))}
              </span>

              {/* Reviews + Trustpilot */}
              <div className="flex items-center gap-1 mt-2">
                <a
                  href="#reviews"
                  className="
        underline
        underline-offset-4
        text-black
        hover:text-foreground
        transition
      "
                >
                  436 reviews on
                </a>

                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <span className="text-[#219653] text-lg">{icon.star}</span>
                  Trustpilot
                </span>
              </div>
            </div>


            {/* Heading */}
            <h1
              className="
  text-display-64
  sm:text-display-40
    text-center
    md:text-left
    
  "
            >
              On Demand Service at Your{" "}
              <span className="text-ter inline-flex items-center gap-2">
                Doorstep <span aria-hidden>🚪</span>
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-muted-foreground max-w-xl">
              Trusted experts for AC, Appliance, Electrical, Plumbing, and more
              with real-time tracking, verified visits, transparent pricing, and
              secure job completion.
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              {/* Location */}
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="
                    w-full pl-9 pr-3 py-3 text-sm
                    bg-background text-foreground
                    border border-input rounded-md
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                  "
                />
              </div>

              {/* Service */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for AC Service"
                  className="
      w-full pr-10 pl-3 py-3 text-sm
      bg-background text-foreground
      border border-input rounded-md
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring
    "
                />

                {/* Icon button inside input */}
                <button
                  type="button"
                  className="
      absolute inset-y-0 right-0
      px-4 flex items-center justify-center
      text-foreground/60
      hover:text-foreground
      bg-[#F68836]
 hover:bg-[#F68836]/50
      rounded-r-md
    "
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popular Services */}
            <div className="flex items-start justify-between gap-4">
              {/* LEFT: Popular services */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Popular services
                </p>

                <div className="flex flex-wrap  gap-2 ">
                  {["AC Repair", "Electrical Fitting", "Painting"].map(
                    (item) => (
                      <span
                        key={item}
                        className="
            px-3 py-1 text-xs
            border border-border
            rounded-full
            text-muted-foreground
            cursor-pointer
            hover:bg-muted
            transition
          "
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
                <button
                  onClick={() => window.open("https://wa.link/pfsm61", "_blank")}
                  className="w-fit px-6 py-2 mt-4 rounded-full bg-[var(--green)]  border-2 border-[var(--green)] text-button text-[#fff] hover:bg-[var(--lightgreen)] hover:text-[var(--white)] transition"
                >
               Get A Quote
                </button>

              </div>

              {/* RIGHT: Serviceable Areas */}
              <a
                href="#serviceable-areas"
                className="
      text-sm
      text-ter
      underline
      underline-offset-4
      whitespace-nowrap
      hover:opacity-80
      transition
    "
              >
                Serviceable Areas
              </a>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className=" hidden md:grid grid-cols-2 gap-4">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              {/* Top BIG */}
              <div className="relative h-[340px] rounded-3xl overflow-hidden">
                <Image
                  src={HeroImage.heroImg1}
                  alt="Image 1"
                  fill
                  className="object-cover"
                />

                {/* Top-left star */}
                <Image
                  src={HeroImage.heroImg5}
                  alt=""
                  width={52}
                  height={52}
                  className="absolute top-3 left-3"
                />
              </div>

              {/* Bottom SMALL */}
              <div className="relative h-[180px] rounded-3xl overflow-hidden">
                <Image
                  src={HeroImage.heroImg3}
                  alt="Image 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
              {/* Top SMALL */}
              <div className="relative h-[180px] rounded-3xl overflow-hidden">
                <Image
                  src={HeroImage.heroImg2}
                  alt="Image 2"
                  fill
                  className="object-cover"
                />

                {/* ✨ Top-right spark */}
                <Image
                  src={HeroImage.heroImg6}
                  alt=""
                  width={52}
                  height={52}
                  className="absolute  -top-3 -right-5 z-10 "
                />
              </div>

              {/* Bottom BIG */}
              <div className="relative h-[340px] rounded-3xl overflow-hidden">
                <Image
                  src={HeroImage.heroImg4}
                  alt="Image 4"
                  fill
                  className="object-cover"
                />

                {/* Bottom-right blob */}
                <Image
                  src={HeroImage.heroImg7}
                  alt=""
                  width={48}
                  height={48}
                  className="absolute bottom-0 right-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
