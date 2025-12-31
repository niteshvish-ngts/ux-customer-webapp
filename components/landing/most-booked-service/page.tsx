"use client";

import ServiceOfferCard from "@/components/shared/booked-services-card";
import CarouselSection from "@/components/shared/carousel/carousel";
import { HeroImage, ServicesImage } from "@/components/shared/images/image";
import { StaticImageData } from "next/image";

type ServiceOffer = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  rating: number;
  reviews: string;
  price: string;
  discount:string;
  originalPrice?: string;
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
    discount: "50% off",
    originalPrice: "₹1300",
  },
  {
    id: 2,
    image: ServicesImage.imageService2,
    title: "Kitchen Deep Cleaning",
    subtitle: "(Full kitchen)",
    rating: 4.6,
    reviews: "8k reviews",
    price: "₹1199",
    discount: "50% off",
    originalPrice: "₹1600",
  },
  {
    id: 3,
    image: ServicesImage.imageService3,
    title: "Full Home Cleaning",
    subtitle: "(3 BHK)",
    rating: 4.7,
    reviews: "12k reviews",
    price: "₹2499",
    discount: "50% off",
    originalPrice: "₹3200",
  },
  {
    id: 4,
    image: ServicesImage.imageService4,
    title: "Full Home Cleaning",
    subtitle: "(3 BHK)",
    rating: 4.7,
    reviews: "12k reviews",
    price: "₹2499",
    discount: "50% off",
    originalPrice: "₹3200",
  },
  {
    id: 5,
    image: ServicesImage.imageService5,
    title: "Full Home Cleaning",
    subtitle: "(3 BHK)",
    rating: 4.7,
    reviews: "12k reviews",
    price: "₹2499",
    discount: "50% off",
    originalPrice: "₹3200",
  },
];

const MostBookedService = () => {
  return (
    <CarouselSection
      title="Most Booked Services"
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

export default MostBookedService;
