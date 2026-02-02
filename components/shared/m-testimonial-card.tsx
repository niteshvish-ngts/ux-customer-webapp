"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";
import { HeroImage } from "./images/image";

type Props = {
  name: string;
  role: string;
  rating: number;
  review: string;
  image?: string | StaticImageData;
};

export default function TestimonialCardMobile({
  name,
  role,
  rating,
  review,
  image,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full max-w-[191px]">
      {/* Rating */}
      <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
        <Image  
          src={HeroImage.HeroImg10} 
          alt="5 stars rating" 
          className="h-4 w-auto"
        />
      </div>
      
                <span className="text-sm text-prime font-semibold font-lato">
                  {rating} rated
                </span>
              </div>
      {/* Review */}
      <p className="text-xs text-gray-800  mb-3 font-lato">
        {review}
      </p>

      {/* User Info */}
      <div>
        <h4 className="font-semibold text-base font-outfit">{name}</h4>
        <p className="text-xs text-dark mt-0.5 font-lato">{role}</p>
      </div>
    </div>
  );
}
