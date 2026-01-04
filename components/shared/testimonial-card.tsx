import { Star } from "lucide-react";

type TestimonialCardProps = {
  rating: number;
  text: string;
  name: string;
  role: string;
};

export default function TestimonialCard({
  rating,
  text,
  name,
  role,
}: TestimonialCardProps) {
  return (
    <div
      className="
        bg-card
        border border-border
        rounded-[30px]
        p-5
        w-[240px]
        h-[260px]
        flex-shrink-0
        flex flex-col
        justify-between
      "
    >
      {/* TOP CONTENT */}
      <div>
        {/* RATING */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-ter text-ter"
              />
            ))}
          </div>

          <span className="text-caption text-primary">
            {rating} rated
          </span>
        </div>

        {/* TEXT */}
        <p className="text-body-14 ">
  {text}
</p>

      </div>

      {/* AUTHOR */}
      <div>
        <p className="text-sm font-semibold">
          {name}
        </p>
        <p className="text-[10px] text-muted-foreground ">
          {role}
        </p>
      </div>
    </div>
  );
}
