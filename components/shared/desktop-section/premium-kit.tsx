"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/reuseable-items/button";
import { HeroImage } from "../images/image";

type PremiumOfferBannerProps = {
  badgeText: string;
  brand: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string | StaticImageData;
};

export default function PremiumOfferBanner({
  badgeText,
  brand,
  title,
  subtitle,
  buttonText,
  image,
}: PremiumOfferBannerProps) {
  return (
    <section className="section-spacer">
      <div className="container">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            grid grid-cols-1 md:grid-cols-2
            bg-[#bb9956]
]
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="
              relative z-10
              p-6 md:p-10
              flex flex-col justify-center
              bg-soft-gradient
            "
          >
            {/* BADGE */}
            <span
              className="
                inline-flex items-center justify-center
    w-20 h-20
    mb-3
    rounded-full
    bg-green-700
    text-white
    font-semibold
    text-[12px] leading-tight 
    text-center               
    text-caption"
            >
              Save up to ₹2,000
            </span>

            {/* BRAND */}
            <p className="text-caption tracking-widest text-black mb-1 text-2xl">
              URBANXPERTS
            </p>

            {/* TITLE */}
            <h2 className="text-display-40 text-foreground mb-2">
              Premium Cleaning Kit
            </h2>

            {/* SUBTITLE */}
            <p className="text-body text-muted-foreground mb-6">
              Deep cleaning made effortless
            </p>

            {/* CTA */}
            <button
              className="
                w-fit
                px-6 py-2
                rounded-full
                border-2 border-amber-900
                text-button
                text-foreground
                hover:bg-muted
                transition
              "
            >
              Buy Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[260px] md:h-auto">
            <Image
              src={HeroImage.heroImg3}
              alt="Premium Cleaning Kit"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
