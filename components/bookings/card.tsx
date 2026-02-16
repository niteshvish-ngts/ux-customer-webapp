"use client";

import Image from "next/image";
import { Booking } from "../shared/images/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (

    <div
      className="
        w-full max-w-[630px]
        rounded-[20px]
        border border-[#E6EFFA]
        bg-[#F9FCFF]
        p-4 lg:p-5
        flex flex-col
      "
    >
      {/* TOP */}
      <div className="flex justify-between items-start gap-3 lg:gap-4">
        {/* LEFT - Icon + Info */}
        <div className="flex gap-3 lg:gap-4 flex-1 min-w-0">
          {/* ICON */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={Booking.bookingImg1}
              alt="Service Icon"
              width={38}
              height={38}
              className="w-8 h-8 lg:w-[38px] lg:h-[38px]"
            />
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-base lg:text-lg font-medium truncate">{title}</p>
            <p className="text-xs text-muted-foreground">{date}</p>

            {/* ID */}
            <p className="text-xs text-dark flex items-center gap-1">
              <Image
                src={Booking.bookingImg4}
                alt="star"
                width={14}
                height={14}
              />
              <span className="underline">ID: {id}</span>
            </p>

            {/* STATUS TAGS - Mobile: Below ID, Desktop: Hidden (shown on right) */}
            <div className="flex gap-1.5 lg:hidden mt-2">
              {statusTags.map((tag, i) => (
                <span
                  key={i}
                  className={`
                    px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap
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
          </div>
        </div>

        {/* RIGHT - Desktop: Status + Price, Mobile: Only Price */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* STATUS - Desktop only */}
          <div className="hidden lg:flex gap-2 flex-wrap justify-end">
            {statusTags.map((tag, i) => (
              <span
                key={i}
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
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

          {/* PRICE */}
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
      <div className="flex items-center justify-between gap-2 mt-2 lg:mt-0">
        {/* RATING */}
        <div className="flex items-center gap-2">
          {rating > 0 ? (
            <>
              <p className="text-sm text-black font-medium">
                Your Rating
              </p>
              <div className="flex gap-1 text-[#FFC107] text-base lg:text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < rating ? "★" : "☆"}</span>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-black font-medium">Give Rating</p>
              <div className="flex gap-0.5 text-slate-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">☆</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ACTION */}
       <button
  onClick={() => router.push("/rating-and-reviews")}
  className="text-xs text-primary underline whitespace-nowrap shrink-0"
>
  {action}
</button>
      </div>
    </div>
  );
}