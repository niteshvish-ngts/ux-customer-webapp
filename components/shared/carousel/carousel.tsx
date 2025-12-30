"use client";

import React from "react";
import CardHeading from "@/components/shared/special-offers-cards/card-heading";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselSectionProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const CarouselSection = <T,>({
  title,
  items,
  renderItem,
}: CarouselSectionProps<T>) => {
  return (
    <section className="space-y-4 section-spacer">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
      >
        {/* HEADER + ARROWS (INSIDE Carousel) */}
        <div className="flex items-center justify-between section-spacer-bottom">
          <CardHeading title={title} />

          <div className="flex items-center gap-2 ">
            <CarouselPrevious className="static translate-y-0 bg-black text-white hover:text-black cursor-pointer hover:bg-white " />
            <CarouselNext className="static translate-y-0 bg-black text-white hover:text-black cursor-pointer hover:bg-white " />
          </div>
        </div>

        {/* CONTENT */}
        <CarouselContent className="-ml-4 mt-4 ">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-auto"
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CarouselSection;
