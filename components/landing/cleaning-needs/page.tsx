"use client";

import ServiceOfferCard from "@/components/shared/booked-services-card";
import CarouselSection from "@/components/shared/carousel/carousel";
import { ServicesImage } from "@/components/shared/images/image";
import ServiceOfferCardMobile from "@/components/shared/m-booked-service-card";
import { StaticImageData } from "next/image";
import { useMediaQuery } from "react-responsive";


type ServiceOffer = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  originalPrice: string;
  discount?: string;
};

const serviceOffers: ServiceOffer[] = [
  {
    id: 1,
    image: ServicesImage.imageService1,
    title: "Deep Bathroom Cleaning",
    subtitle: "(2 bathrooms)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹950",
    originalPrice: "₹1300",
    discount: "45% off",
  },
  {
    id: 2,
    image: ServicesImage.imageService2,
    title: "Intense Cleaning",
    subtitle: "(3 bathrooms)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "20% off",
  },
  {
    id: 3,
    image: ServicesImage.imageService8,
    title: "Kitchen Cleaning",
    subtitle: "(upto 2 kitchens)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "12% off",
  },
  {
    id: 4,
    image: ServicesImage.imageService9,
    title: "Carpet Cleaning",
    subtitle: "(1 carpet)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "50% off",
  },
  {
    id: 5,
    image: ServicesImage.imageService10,
    title: "Tank Cleaning",
    subtitle: "(1 tank only)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "50% off",
  },
];

const CleaningNeeds = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="section-spacing">
      <CarouselSection<ServiceOffer>
        title="Cleaning Needs"
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
        renderItem={(item) =>
          isMobile ? (
            <ServiceOfferCardMobile
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
              discount={item.discount}
              originalPrice={item.originalPrice}
            />
          ) : (
            <ServiceOfferCard
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
              discount={item.discount}
              originalPrice={item.originalPrice}
            />
          )
        }
      />
    </section>
  );
};

export default CleaningNeeds;
