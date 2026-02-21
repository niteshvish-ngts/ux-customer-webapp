"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type OfferBannerCardProps = {
  title: string;
  description: string;
  buttonText: string;
  image: string | StaticImageData;
  href?: string;
  bgColor?: string;
};

export default function OfferBannerCard({
  title,
  description,
  buttonText,
  image,
  href = "#",
  bgColor,
}: OfferBannerCardProps) {
  return (
    <div
      className={`
        ${bgColor || "bg-soft-gradient"}
        relative flex justify-between
        gap-2 md:gap-4
        offer-card
        px-3 py-3 md:px-5 md:py-5
      `}
    >
      {/* LEFT CONTENT */}
      <div className="relative flex flex-col w-full pr-1 md:pr-2">
        {/* Text block */}
        <div className="space-y-1 md:space-y-2 pb-7 md:pb-10">
          <h3 className="text-subheading leading-tight">
            {title}
          </h3>

          <p className="text-body-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* FIXED BUTTON POSITION */}
        <Link
          href={href}
          className="
            absolute bottom-0 left-0
            inline-flex items-center gap-1
            text-sm md:text-body-sm
            text-foreground
            bg-card
            px-2.5 py-1 lg:px-7 lg:py-2
            rounded-md
            hover:underline
            transition
          "
        >
          {buttonText}
          
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-24 h-24 md:w-36 md:h-36 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
