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
    originalPrice: "₹1300",
    discount: "27% off",
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
    discount: "16% off",
  },
  {
    id: 3,
    image: ServicesImage.imageService3,
    title: "Home Painting Service",
    subtitle: "(1 BHK)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹20000",
    originalPrice: "₹2500",
    discount: "20% off",
  },
  {
    id: 4,
    image: ServicesImage.imageService4,
    title: "Full Pest Control",
    subtitle: "(1 BHK)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹20000",
    originalPrice: "₹2500",
    discount: "20% off",
  },
  {
    id: 5,
    image: ServicesImage.imageService5,
    title: "Leakage Fix Service",
    subtitle: "(upto 3 leakages)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹2000",
    originalPrice: "₹2500",
    discount: "20% off",
  },
  {
    id: 6,
    image: ServicesImage.imageService5,
    title: "Leakage Fix Service",
    subtitle: "(upto 3 leakages)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹2000",
    originalPrice: "₹2500",
    discount: "20% off",
  },
  {
    id: 7,
    image: ServicesImage.imageService5,
    title: "Leakage Fix Service",
    subtitle: "(upto 3 leakages)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹2000",
    originalPrice: "₹2500",
    discount: "20% off",
  },
  
  
];


const MostBookedService = () => {
  return (
    <section>
    <CarouselSection
      title="Most Booked Services"
      showArrows={true} 
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

export default MostBookedService;
