// components/service/service-card.tsx
"use client";
import React from "react";

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
  isSaver,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EFFA] p-4 flex flex-col justify-between h-full">
  {/* TOP */}
  <div>
    <div className="flex justify-between">
      <div>
        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
          ⭐ {rating}
        </p>

        <h3 className="text-sm font-semibold text-black leading-snug">
          {title}
        </h3>
      </div>

      {isSaver && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
          Maxx Saver
        </span>
      )}
    </div>

    <p className="text-xs text-muted-foreground mt-2">
      ⏱ {time}
    </p>

    <p className="text-xs text-green-600 mt-1">
      ₹{pricePerUnit} per unit
    </p>

    <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
      {description}
    </p>
  </div>

  {/* BOTTOM */}
  <div className="flex justify-between items-center mt-4">
    <div>
      <span className="text-sm font-semibold text-black">
        ₹{discountedPrice}
      </span>
      {originalPrice && (
        <span className="ml-2 text-xs line-through text-muted-foreground">
          ₹{originalPrice}
        </span>
      )}
    </div>

    <button
      onClick={onAdd}
      className="
        px-4 py-1.5
        border border-orange-500
        text-orange-500
        rounded-md
        text-xs font-medium
        hover:bg-orange-50
      "
    >
      Add
    </button>
  </div>
</div>

  );
}
