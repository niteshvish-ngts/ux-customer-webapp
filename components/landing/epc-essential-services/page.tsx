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
    subtitle: "(issue diagnosis)",
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
    subtitle: "(single socket)",
    rating: 4.5,
    reviews: "10k reviews",
    price: "₹1350",
    originalPrice: "₹1600",
    discount: "50% off",
  },
];

const EpcEssentialServices = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="section-spacing md:px-0 px-2">
      <CarouselSection<ServiceOffer>
        title="EPC Essential Services"
        description="Quick fixes and essential home services"
        showArrows={true}
        controlsPosition="bottom"
        rightSlot={
          <a
            href="/services"
            className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
          >
            <span className="sm:hidden ">View All</span>
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

export default EpcEssentialServices;
