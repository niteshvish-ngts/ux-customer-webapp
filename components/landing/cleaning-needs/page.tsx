"use client";

import ServiceOfferCard from "@/components/shared/booked-services-card";
import CarouselSection from "@/components/shared/carousel/carousel";
import { HeroImage } from "@/components/shared/images/image";
import { StaticImageData } from "next/image";



type ServiceOffer = {
  id: number;
  image: any;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  originalPrice: string;
  discount: string;
};

export const serviceOffers: ServiceOffer[] = [
  {
    id: 1,
    image: HeroImage.heroImg1,
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
    image: HeroImage.heroImg2,
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
    image: HeroImage.heroImg3,
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
    image: HeroImage.heroImg4,
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
    image: HeroImage.heroImg5,
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
  return (
    <CarouselSection
      title="Cleaning Needs"
      items={serviceOffers}
      renderItem={(offer) => (
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
      )}
    />
  );
};

export default CleaningNeeds;
