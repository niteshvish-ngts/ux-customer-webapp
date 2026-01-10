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
          bg-gradient-to-r from-[#CBB98A] to-[#E8E1C7]
          flex items-stretch
          min-h-[160px]
        "
      >
        {/* BADGE (top-left circle) */}
        <span
  className="
    absolute top-3 left-3
    
    w-9 h-9
    rounded-full
    bg-[#205131]
    text-white
    flex flex-col items-center justify-center
    text-center
    leading-none
    z-10
  "
>
  <span className="text-[5px] font-semibold opacity-90">
    Save up to
  </span>
  <span className="text-[8px] font-bold mt-0.5">
    ₹2,000
  </span>
</span>


        {/* LEFT CONTENT */}
<div className="flex-1 pl-4 pr-3 pt-14 pb-4 space-y-1 ">
          <p className="text-[10px] tracking-widest text-black/70 font-medium">
            {brand.toUpperCase()}
          </p>

          <h3 className="text-xl font-extrabold leading-normal text-black">
            {title}
          </h3>

          <p className="text-[13px] text-black/60">
            {subtitle}
          </p>

          <button
            className="
              mt-2
              inline-flex items-center justify-center
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
        <div className="relative w-[130px] shrink-0">
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
