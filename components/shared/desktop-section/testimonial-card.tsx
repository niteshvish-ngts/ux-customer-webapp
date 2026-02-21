  "use client"
import { Star } from "lucide-react";
import Image from "next/image";
import { HeroImage } from "../images/image";

type TestimonialCardProps = {
  rating: number;
  name: string;
  role: string;
  review: string;
};

export default function TestimonialCard({
  rating,
  name,
  role,
  review,
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
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1">
  <Image  
    src={HeroImage.HeroImg10} 
    alt="5 stars rating" 
    className="h-5 w-auto"
  />
</div>

          <span className="text-base text-prime font-bold font-lato">
            {rating} rated
          </span>
        </div>

        {/* TEXT */}
        
<p className="text-body-14 ">
  {review}
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
