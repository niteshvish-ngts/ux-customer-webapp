"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

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
      <div >
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#936408]
            grid
            grid-cols-1
            md:grid-cols-2
            items-center
          "
        >
          {/* LEFT CONTENT */}
          <div className="p-8 md:p-12 space-y-4">
            {/* BADGE */}
            <span className="
              inline-block
              px-3 py-1
              rounded-full
              text-caption
              bg-card
              border border-border
            ">
              {badgeText}
            </span>

            {/* BRAND */}
            <p className="text-caption tracking-wide uppercase">
              {brand}
            </p>

            {/* TITLE */}
            <h2 className="text-display-32">
              {title}
            </h2>

            {/* SUBTITLE */}
            <p className="text-body text-muted-foreground max-w-md">
              {subtitle}
            </p>

            {/* CTA */}
            <Button variant="outline" className="mt-4">
              {buttonText}
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[260px] md:h-full">
            <Image
              src={image}
              alt={title}
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
