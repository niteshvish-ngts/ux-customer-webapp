"use client";

import Image from "next/image";
import { Booking } from "../shared/images/image";

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
  rating = 4,
}: BookingCardProps) {
  return (

    <div
      className="
        w-full max-w-[630px]
        rounded-[20px]
        border border-[#E6EFFA]
        bg-[#F9FCFF]
        p-5
        flex flex-col
      "
    >
      {/* TOP */}
      <div className="flex justify-between items-start gap-4">
        {/* LEFT */}
        <div className="flex gap-4">
          {/* ICON */}
          <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={Booking.bookingImg1}
              alt="Service Icon"
              width={38}
              height={38}
            />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium ">{title}</p>
            <p className="text-xs text-muted-foreground">{date}</p>

            {/* ID */}
            <p className="text-xs text-dark flex items-center gap-1">
              <Image
                src={Booking.bookingImg4}
                alt="star"
                width={14}
                height={14}
              />
              ID: {id}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-2">
          {/* STATUS */}
          <div className="flex gap-2">
            {statusTags.map((tag, i) => (
  <span
    key={i}
    className={`
      px-3 py-1 rounded-full text-xs font-semibold
      ${
        tag === "Completed"
          ? "bg-[#22C55E] text-white"
          : tag === "Cancelled"
          ? "bg-[#EF4444] text-white"
          : tag === "In Warranty"
          ? "bg-black text-white"
          : tag === "Warranty Expired"
          ? "bg-[#EF4444] text-white"
          : "bg-[#F97316] text-white"
      }
    `}
  >
    {tag}
  </span>
))}

          </div>

          {/* PRICE (same row as ID, before divider) */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">{price}</span>
            <span className="text-xs line-through text-muted-foreground">
              {oldPrice}
            </span>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-[#E6EFFA]" />

      {/* BOTTOM */}
      <div className="flex items-end justify-between">
        {/* RATING */}
        <div>
          {rating > 0 ? (
            <>
              <p className="text-sm text-black mb-1 font-medium">
                Your Rating
              </p>
              <div className="flex gap-1 text-[#FFC107] text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < rating ? "★" : "☆"}</span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-black font-medium">Give Rating</p>
          )}
        </div>

        {/* ACTION */}
        <button className="text-xs text-primary underline">
          {action}
        </button>
      </div>
    </div>
  );
}