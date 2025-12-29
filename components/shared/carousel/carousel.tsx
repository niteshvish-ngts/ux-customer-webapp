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
    <section>
      <CardHeading title={title} />

      <Carousel
        opts={{ align: "start" }}
        className="w-full mt-4"
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-auto"
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CarouselSection;
