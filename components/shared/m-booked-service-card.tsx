"use client";

import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  image: any;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  discount?:string;
  originalPrice?: string;
};

export default function ServiceOfferCardMobile({
  image,
  title,
  subtitle,
  rating,
  reviews,
  price,
  originalPrice,
}: Props) {
  return (
    <div className="w-41 leading-2 ">
      {/* IMAGE */}
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div> 

      {/* CONTENT */}
      <div className="mt-3 space-y-1">
        <p className="text-sm font-medium leading-tight font-outfit">
          {title}
          <br />
          <span className="font-medium ">
            {subtitle}
          </span>
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3.5 h-3.5 fill-ter text-ter" />
          <span>{rating} rated</span>
          <span>({reviews})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-prime">
            {price}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
