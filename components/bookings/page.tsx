"use client";

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
        w-[630px] h-[185px]
        border border-border
        rounded-[20px]
        p-5
        bg-card
        flex flex-col justify-between
      "
    >
      {/* TOP */}
      <div className="flex justify-between">
        {/* LEFT */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            🛠️
          </div>

          <div className="space-y-1">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              ⭐ ID: {id}
            </p>
          </div>
        </div>

        {/* STATUS TAGS */}
        <div className="flex gap-2">
          {statusTags.map((tag, i) => (
            <span
              key={i}
              className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${
                  tag === "Completed"
                    ? "bg-green-100 text-green-700"
                    : tag === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : tag === "In Warranty"
                    ? "bg-black text-white"
                    : "bg-orange-100 text-orange-700"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex items-end justify-between">
        {/* LEFT ACTION */}
        <div className="space-y-1">
          {rating > 0 ? (
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < rating ? "★" : "☆"}</span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Give Rating</p>
          )}
        </div>

        {/* RIGHT PRICE */}
        <div className="text-right space-y-1">
          <p className="font-medium">{price}</p>
          <p className="text-xs line-through text-muted-foreground">
            {oldPrice}
          </p>
          <button className="text-sm text-primary underline">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
