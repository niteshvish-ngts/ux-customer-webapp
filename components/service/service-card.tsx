// components/service/service-card.tsx
"use client";
import Image from "next/image";
import React from "react";
import { Services } from "../shared/images/image";
interface ServiceCardProps {
  title: string;
  rating: string;
  account: number;
  time: string;
  pricePerUnit: number;
  originalPrice?: number;
  discountedPrice: number;
  description: string;
  onAdd: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  cartQty?: number;
  isSaver?: boolean;
}

export default function ServiceCard({
  title,
  rating,
  account,
  time,
  pricePerUnit,
  originalPrice,
  discountedPrice,
  description,
  onAdd,
  onIncrease,
  onDecrease,
  cartQty = 0,
  isSaver,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EFFA] p-4 flex flex-col justify-between h-full">
  {/* TOP */}
  <div>
    <div className="flex justify-between">
      <div>
        <p className="text-xs text-dark mb-1 flex items-center gap-1 font-lato font-regular">
<Image
src={Services.serviceImg1}
alt="rating star"
width={14}
height={14}
className="object-contain"
/>
{rating}
</p>

        <h3 className="text-lg font-medium text-black leading-snug font-outfit">
          {title}
        </h3>
      </div>

      
    </div>

    <p className="text-xs text-muted-foreground mt-2">
       {time} worktime
    </p>

  

<p className="mt-1 flex items-center gap-1 text-sm font-regular text-success">
  <Image
    src={Services.serviceImg3}
    alt="price tag"
    width={14}
    height={14}
    className="object-contain"
  />
  ₹{pricePerUnit} per unit
</p>
    <p className="text-xs text-dark-30 mt-3 leading-relaxed font-lato">
      {description}
    </p>
  </div>

  {/* BOTTOM */}
  <div className="flex justify-between items-center mt-4">
    <div>
      <span className="text-base font-semibold text-black">
        ₹{discountedPrice}
      </span>
      {originalPrice && (
        <span className="ml-2 text-sm line-through text-muted-foreground">
          ₹{originalPrice}
        </span>
      )}
    </div>

    {cartQty > 0 ? (
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime text-base hover:bg-orange-100"
        >
          −
        </button>
        <span className="text-xs font-medium min-w-[20px] text-center">
          {cartQty}
        </span>
        <button
          onClick={onIncrease}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime text-base hover:bg-orange-100"
        >
          +
        </button>
      </div>
    ) : (
      <button
        onClick={onAdd}
        className="
          px-4 py-1.5
          border border-prime
          text-prime
          rounded-md
          text-xs font-medium
          hover:bg-orange-50
        "
      >
        Add
      </button>
    )}
  </div>
</div>

  );
}
