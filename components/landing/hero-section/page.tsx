"use client";

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { HeroImage, icon } from "../../shared/images/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-background ">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
{/* Trustpilot */}
<div
  className="
    flex flex-col items-center text-center gap-2
    sm:flex-row sm:items-center sm:text-left sm:gap-2
    text-sm text-muted-foreground
  "
>
  {/* Stars */}
  <span className="flex items-center gap-1 text-white">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className="leading-none bg-[#219653] px-2 py-2"
      >
        {icon.star}
      </span>
    ))}
  </span>

  {/* Reviews text */}
  <span>436 reviews on</span>

  {/* Trustpilot */}
  <span className="font-semibold text-foreground flex items-center gap-1">
    {icon.star} Trustpilot
  </span>
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
                    w-full px-3 py-3 text-sm
                    bg-background text-foreground
                    border border-input rounded-md
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                  "
                />
              </div>

              {/* Button */}
              <button
                className="
                  px-5 py-3 rounded-md
                  bg-primary text-primary-foreground
                  flex items-center justify-center
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                "
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Services */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Popular services</p>
              <div className="flex flex-wrap gap-2">
                {["AC Repair", "Electrical Fitting", "Painting"].map((item) => (
                  <span
                    key={item}
                    className="
                        px-3 py-1 text-xs
                        border border-border
                        rounded-full
                        text-muted-foreground
                      "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="grid h-full grid-cols-2 grid-rows-10 gap-4 ">
            <div className="relative row-span-6 rounded-xl overflow-hidden">
              <Image
                src={HeroImage.heroImg1}
                alt="Image 1"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative row-span-5 rounded-xl overflow-hidden">
              <Image
                src={HeroImage.heroImg2}
                alt="Image 2"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative row-span-6 rounded-xl overflow-hidden">
              <Image
                src={HeroImage.heroImg3}
                alt="Image 3"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative row-span-5 rounded-xl overflow-hidden">
              <Image
                src={HeroImage.heroImg4}
                alt="Image 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
