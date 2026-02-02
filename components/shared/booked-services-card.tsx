"use client";

import Image, { StaticImageData } from "next/image";
import { Star } from "lucide-react";
import { HeroImage } from "./images/image";

type ServiceOfferCardProps = {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  discount?: string;
  originalPrice?: string;
};

export default function ServiceOfferCard({
  image,
  title,
  subtitle,
  rating,
  reviews,
  price,
  discount,
  originalPrice,
}: ServiceOfferCardProps) {
  return (
    <div
      className="
        relative overflow-hidden
        w-[240px] h-[363px]
        border border-border

        /* bottom radius only */
        rounded-[30px]
      "
    >
      {/* DISCOUNT BADGE */}
      {discount && (
        <span
          className="
            absolute top-0 left-0 z-10
            bg-[var(--green)] text-white
            text-xs font-semibold
            px-5 py-2
            rounded-tr-2xl
            rounded-bl-2xl
            rounded-br-full
            
          "
        >
          {discount}
        </span>
      )}

      {/* IMAGE */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-card-overlay-gradient" />

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 p-4 space-y-3 text-white">
        {/* RATING */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1">
  <Image 
    src={HeroImage.HeroImg10} 
    alt="5 stars rating" 
    className="h-4 w-auto"
  />
</div>
          <span className="text-body-sm">
            {rating} rated ({reviews})
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-offer-title">
          {title}
        </h3>

        {/* SUBTITLE */}
        <p className="text-offer-subtitle text-white/80">
          {subtitle}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <span className="text-sm font-lato font-semibold ">
            Book Service @
            <span className="font-semibold text-prime text-sm">
              {price}
            </span>
            {originalPrice && (
              <span className="line-through text-white/60 ml-1">
                {originalPrice}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
