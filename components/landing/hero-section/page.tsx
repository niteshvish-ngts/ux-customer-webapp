"use client";

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { HeroImage, icon } from "../../shared/images/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-background mt-6">
      <div className="py-10">
        {/* Container with right padding zero to prevent right overflow */}
        <div className="container pr-0 lg:pr-0">
          <div
            className="
              grid grid-cols-1
              lg:grid-cols-[671px_519px]
              gap-[45px]
              items-center
              justify-between
            "
          >
            {/* LEFT CONTENT - Tumhara original code exactly same */}
            <div
              className="
                space-y-6
                w-full
                lg:w-[671px]
                lg:min-h-[485px]
                flex flex-col
                items-center text-center
                lg:items-start lg:text-left
                lg:justify-center
              "
            >
              {/* Trustpilot */}
              <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center">
  <Image 
    src={HeroImage.HeroImg8} 
    alt="5 stars rating" 
    className="h-5 w-auto"
  />
</span>

                <div className="flex items-center gap-1.5">
                  <a
                    href="#reviews"
                    className="underline text-black hover:text-foreground transition font-bold"
                  >
                    436 <span className="font-semibold">reviews on</span>
                  </a>
                  <span className="flex items-center gap-1 text-label-12 text-foreground">
                    <span className="inline-flex items-center">
  <Image 
    src={HeroImage.HeroImg9} 
    alt="stars" 
    className="h-4 w-auto"
  />
</span>
                    Trustpilot
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-display-40 lg:text-[64px] lg:leading-[80px] lg:font-bold">
                On Demand Service at Your{" "}
                <span className="text-ter inline-flex items-center gap-2">
                  Doorstep <span aria-hidden>🚪</span>
                </span>
              </h1>

              {/* Description */}
              <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 font-inter text-base  leading-relaxed">
                Trusted experts for AC, Appliance, Electrical, Plumbing, and more
                with real-time tracking, verified visits, transparent pricing, and
                secure job completion.
              </p>

              {/* Search Box */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[670px] mx-auto lg:mx-0">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full pl-9 pr-3 py-4 text-sm bg-background border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for 'AC Service'"
                    className="w-full pr-10 pl-3 py-4 text-sm bg-background border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-4 flex items-center justify-center bg-[#F68836] hover:bg-[#F68836]/80 rounded-r-md"
                  >
                    <Search className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Dashed Divider */}
              <div className="w-full max-w-[670px] mx-auto lg:mx-0 my-4">
                <div className="border-t border-dashed border-border" />
              </div>

              {/* Popular Services */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-4">
                <div className="space-y-2 text-center lg:text-left">
                  <p className="text-base font-semibold">Popular services</p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {["AC Repair", "Electrical Fitting", "Painting"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs border border-border rounded-full cursor-pointer hover:bg-muted transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* <button
                    onClick={() => window.open("https://wa.link/pfsm61", "_blank")}
                    className="mt-4 px-6 py-2 rounded-full bg-[var(--green)] border-2 border-[var(--green)] text-white hover:bg-[var(--lightgreen)] hover:text-[var(--green)] transition"
                  >
                    Get A Quote
                  </button> */}
                </div>

                <a
                  href="#serviceable-areas"
                  className="text-sm text-ter underline hover:opacity-80"
                >
                  Serviceable Areas
                </a>
              </div>
            </div>

            {/* RIGHT IMAGES -  */}
            <div className="hidden lg:block w-[519px] h-[519px]">
  <div className="grid grid-cols-2 gap-5 h-full">
    <div className="flex flex-col gap-4">
      {/* First Card with Star */}
      <div className="relative h-[319px] rounded-[20px] overflow-hidden">
        <Image 
          src={HeroImage.heroImg5} 
          alt="" 
          width={40} 
          height={40} 
          className="absolute top-0 -left-4 z-10" 
        />
        <Image 
          src={HeroImage.heroImg2} 
          alt="" 
          fill 
          className="object-cover" 
        />
      </div>

      {/* Second Card */}
      <div className="relative h-[180px] rounded-[20px] overflow-hidden">
        <Image 
          src={HeroImage.heroImg4} 
          alt="" 
          fill 
          className="object-cover" 
        />
      </div>
    </div>

    <div className="flex flex-col gap-4">
      {/* Third Card with Star */}
      <div className="relative h-[180px] rounded-[20px] overflow-hidden">
        <Image 
          src={HeroImage.heroImg6} 
          alt="" 
          width={40} 
          height={40} 
          className="absolute top-3 right-3 z-10" 
        />
        <Image 
          src={HeroImage.heroImg3} 
          alt="" 
          fill 
          className="object-cover" 
        />
      </div>

      {/* Fourth Card with Circle */}
      <div className="relative h-[319px] rounded-[20px] overflow-hidden">
        <Image 
          src={HeroImage.heroImg7} 
          alt="" 
          width={40} 
          height={40} 
          className="absolute bottom-0 right-0 z-10" 
        />
        <Image 
          src={HeroImage.heroImg1} 
          alt="" 
          fill 
          className="object-cover" 
        />
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}