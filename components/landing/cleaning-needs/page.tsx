"use client";

import ServiceOfferCard from "@/components/shared/booked-services-card";
import CarouselSection from "@/components/shared/carousel/carousel";
import { HeroImage, ServicesImage } from "@/components/shared/images/image";
import { StaticImageData } from "next/image";
import Link from "next/link";



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
  return (
    <section className="section-spacing">

    <CarouselSection
  title="Cleaning Needs"
  description="Basic cleaning required for your home"
  showArrows={true} 
  controlsPosition="bottom"   
      
  rightSlot={
    <a
      href="/services"
      className="text-sm font-medium text-primary hover:underline"
    >
      View All Services
    </a>
  }
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
    </section>
  );
};

export default CleaningNeeds;
