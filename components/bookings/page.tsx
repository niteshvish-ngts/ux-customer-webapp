"use client";

import Image from "next/image";
import { auth, Booking } from "../shared/images/image";

type BookingCardProps = {
  title: string;
  date: string;
  id: string;
  price: string;
  oldPrice: string;
  statusTags: string[];
  action: string;
  rating?: number;
};

export default function BookingCard({
  title,
  date,
  id,
  price,
  oldPrice,
  statusTags,
  action,
  rating = 0,
}: BookingCardProps) {
  return (
    <div
      className="
        w-full max-w-[630px]
        min-h-[185px]
        rounded-[20px]
        border border-[#E6EFFA]
        bg-[#F9FCFF]
        p-5
        flex flex-col justify-between
      "
    >
      {/* TOP */}
      <div className="flex justify-between items-start gap-4">
        {/* LEFT */}
        <div className="flex gap-4">
          {/* ICON */}
          <div className="w-21 h-21 rounded-lg bg-secondary flex items-center justify-center shrink-0">
  <Image
    src={Booking.bookingImg1}
    alt="Service Icon"
    width={38}
    height={38}
    className="object-contain"
  />
</div>

          <div className="space-y-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
            <p className="text-xs text-muted-foreground">⭐ ID: {id}</p>
          </div>
        </div>

        {/* STATUS */}
        <div className="flex flex-wrap gap-2 justify-end">
          {statusTags.map((tag, i) => (
            <span
              key={i}
              className={`
                px-2.5 py-1 rounded-full text-[11px] font-medium
                ${
                  tag === "Completed"
                    ? "bg-[#22C55E] text-white"
                    : tag === "Cancelled"
                    ? "bg-[#EF4444] text-white"
                    : tag === "In Warranty"
                    ? "bg-black text-white"
                    : "bg-[#F97316] text-white"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex items-end justify-between mt-4">
        {/* RATING */}
        <div>
          {rating > 0 ? (
            <>
              <p className="text-xs text-muted-foreground mb-1">
                Your Rating
              </p>
              <div className="flex gap-1 text-[#FFC107]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < rating ? "★" : "☆"}</span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Give Rating
            </p>
          )}
        </div>

        {/* PRICE */}
        <div className="text-right space-y-1">
          <div className="flex gap-2 justify-end items-center">
            <span className="text-sm font-medium">{price}</span>
            <span className="text-xs line-through text-muted-foreground">
              {oldPrice}
            </span>
          </div>
          <button className="text-xs text-primary underline">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
