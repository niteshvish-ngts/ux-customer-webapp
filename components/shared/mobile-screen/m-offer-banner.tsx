"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  bgColor?: string;
  image: string | StaticImageData;
  href?: string;
};

export default function MobileOfferBannerCard({
  title,
  description,
  buttonText,
  image,
  bgColor,
  href = "#",
}: Props) {
  return (
    <div className="w-[85vw] max-w-sm mx-auto">
      <div
        className={`
        ${bgColor || "bg-soft-gradient"}
          rounded-2xl
          p-4
          flex flex-col gap-4
        `}
      >
        {/* CONTENT */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative w-26 h-24 shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="
            w-full
            bg-white
            text-center
            py-3
            rounded-xl
            font-medium
            text-foreground
            shadow-sm
            active:scale-[0.98]
            transition
          "
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
