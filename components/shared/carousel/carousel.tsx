import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardHeading from "../special-offers-cards/card-heading";

type CarouselSectionProps<T> = {
  title?: string;
  description?: string;
  showArrows?: boolean;
  controlsPosition?: "top" | "bottom";
  rightSlot?: React.ReactNode;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const CarouselSection = <T,>({
  title,
  description,
  items,
  showArrows = false,
  controlsPosition = "top",
  rightSlot,
  renderItem,
}: CarouselSectionProps<T>) => {
  return (
    <section className=" ">

      <Carousel opts={{ align: "start" }} className="w-full">
<div className="section-spacer">
        {/* ✅ HEADER + ARROWS (SAME ROW, INSIDE CAROUSEL) */}
        {(title || rightSlot) && (
          <div className="flex items-center justify-between section-spacer-bottom ">
            <CardHeading title={title} description={description} />

            <div className="flex items-center gap-2 mt-6">
              {showArrows && controlsPosition === "top" ? (
                <>
                  <CarouselPrevious className="static bg-black text-white hover:bg-white hover:text-black" />
                  <CarouselNext className="static bg-black text-white hover:bg-white hover:text-black" />
                </>
              ) : (
                rightSlot
              )}
            </div>
          </div>
        )}

        {/* ✅ CAROUSEL CONTENT */}
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-4 basis-auto">
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
</div>
        {/* ✅ OPTIONAL BOTTOM CONTROLS */}
        {showArrows && controlsPosition === "bottom" && (
          <div className="mt-10 flex justify-center gap-3">
            <CarouselPrevious className="static bg-black text-white hover:bg-white hover:text-black" />
            <CarouselNext className="static bg-black text-white hover:bg-white hover:text-black" />
          </div>
        )}

      </Carousel>
    </section>
  );
};


export default CarouselSection;
