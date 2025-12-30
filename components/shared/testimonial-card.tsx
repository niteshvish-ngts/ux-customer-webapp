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
        rounded-2xl
        p-5
        w-[260px]
        flex-shrink-0
      "
    >
      {/* RATING */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
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
      <p className="text-body text-muted-foreground mb-4">
        {text}
      </p>

      {/* AUTHOR */}
      <div>
        <p className="text-body font-semibold">
          {name}
        </p>
        <p className="text-caption text-muted-foreground">
          {role}
        </p>
      </div>
    </div>
  );
}
