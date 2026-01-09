"use client";

import Image, { StaticImageData } from "next/image";

type MobilePremiumOfferBannerProps = {
  badgeText: string;
  brand: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string | StaticImageData;
};

export default function MobilePremiumOfferBanner({
  badgeText,
  brand,
  title,
  subtitle,
  buttonText,
  image,
}: MobilePremiumOfferBannerProps) {
  return (
    <div className="px-4">
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
           bg-[#bb9956]
          flex items-center
          min-h-[150px]
        "
      >
        {/* BADGE */}
        <span
          className="
            absolute top-3 left-3
            bg-[#2E7D32]
            text-white
            text-[10px]
            font-semibold
            px-3 py-1
            rounded-full
            z-10
          "
        >
          {badgeText}
        </span>

        {/* LEFT CONTENT */}
        <div className="flex-1 pl-4 pr-2 py-4 space-y-1">
          <p className="text-[11px] tracking-widest text-foreground/60">
            {brand.toUpperCase()}
          </p>

          <h3 className="text-[16px] font-semibold leading-tight text-foreground">
            {title}
          </h3>

          <p className="text-[13px] text-muted-foreground">
            {subtitle}
          </p>

          <button
            className="
              mt-2
              inline-flex
              items-center
              justify-center
              px-4 py-1.5
              rounded-full
              border border-[#B08B4F]
              text-[13px]
              font-medium
              text-[#6B4E1E]
              bg-transparent
            "
          >
            {buttonText}
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-[120px] h-[160px] shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-r-[24px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
