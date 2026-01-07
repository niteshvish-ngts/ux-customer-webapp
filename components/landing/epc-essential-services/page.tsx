"use client";

import ServiceOfferCard from "@/components/shared/booked-services-card";
import CarouselSection from "@/components/shared/carousel/carousel";
import { ServicesImage } from "@/components/shared/images/image";
import { StaticImageData } from "next/image";

type ServiceOffer = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  discount: string;
  originalPrice?: string;
};

const serviceOffers: ServiceOffer[] = [
  {
    id: 1,
    image: ServicesImage.imageService11,
    title: "Washing Machine Check",
    subtitle: "(only issue checkup)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹950",
    originalPrice: "₹1300",
    discount: "45% off",
  },
  {
    id: 2,
    image: ServicesImage.imageService12,
    title: "Washing Machine Repair",
    subtitle: "(checkup + repair)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "20% off",
  },
  {
    id: 3,
    image: ServicesImage.imageService13,
    title: "Microwave Repair",
    subtitle: "(checkup + repair)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "12% off",
  },
  {
    id: 4,
    image: ServicesImage.imageService14,
    title: "AC Repair",
    subtitle: "(1 carpet)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "50% off",
  },
  {
    id: 5,
    image: ServicesImage.imageService15,
    title: "Socket Fitting",
    subtitle: "(1 tank only)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "50% off",
  },
  // Agar aur items add karne hain to yahan add kar sakte ho
];

const EpcEssentialServices = () => {
  return (
    <CarouselSection
      title="EPC Essential Services"
      description="Basic cleaning required for your home"
      showArrows={true}
      controlsPosition="bottom"
      rightSlot={
        <a
          href="/services"
          className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
        >
          <span className="sm:hidden">View All</span>
          <span className="hidden sm:inline">View All Services</span>
        </a>
      }
      items={serviceOffers}
      renderItem={(offer) => (
        // Responsive basis classes
        <div
          className="
            basis-full          /* Mobile: 1 item → but we want 4, so override below */
            md:basis-1/2         /* Tablet (md): 2 items */
            lg:basis-1/6         /* Desktop (lg+): 6 items */
            pl-0                 /* spacing between items */
          "
        >
          <div className="w-full h-full">
            <ServiceOfferCard
              image={offer.image}
              title={offer.title}
              subtitle={offer.subtitle}
              rating={offer.rating}
              reviews={offer.reviews}
              price={offer.price}
              discount={offer.discount}
              originalPrice={offer.originalPrice}
            />
          </div>
        </div>
      )}
    />
  );
};

export default EpcEssentialServices;