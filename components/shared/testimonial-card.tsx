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
        min-h-[260px]
        flex-shrink-0
        flex flex-col
        justify-between
      "
    >
      {/* RATING */}
      <div>
        
        <div className="flex items-center gap-2 mb-3 justify-between">
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
        <p className="text-body text-muted-foreground">
          {text}
        </p>
      </div>

      {/* AUTHOR */}
      <div className="pt-4">
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
