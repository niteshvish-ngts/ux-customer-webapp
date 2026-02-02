"use client";

import { HeroImage } from "@/components/shared/images/image";
import OfferBannerCard from "@/components/shared/offer-banner";
import CarouselSection from "@/components/shared/carousel/carousel";
import { StaticImageData } from "next/image";
import { useMediaQuery } from "react-responsive";

import MobileOfferBannerCard from "@/components/shared/m-offer-banner";

type Offer = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string | StaticImageData;
  href?: string;
  bgColor?: string;
};

const offers: Offer[] = [
  {
    id: 1,
    title: "Save Upto 50% off on your first booking",
    description: "Order your first booking and get heavy discounts",
    buttonText: "Explore Now",
    image: HeroImage.heroImgbanner1,
    href: "/services",
    bgColor: "bg-hero1-gradient",
  },
  {
    id: 2,
    title: "Flat 25% off on Home Painting",
    description: "Order our painting service on year end",
    buttonText: "Book Service",
    image: HeroImage.heroImgbanner2,
    href: "/painting",
    bgColor: "bg-hero2-gradient",
  },
  {
    id: 3,
    title: "Upto 60% off on Home Cleaning",
    description: "Order your home cleaning service on year end",
    buttonText: "Book Service",
    image: HeroImage.heroImgbanner3,
    href: "/cleaning",
    bgColor: "bg-hero3-gradient",
  },
];

const SpecialOfferForYou = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="section-spacing md:px-0 px-3">
    <CarouselSection
      title="Special Offers For You"
    
      showArrows={true}
      rightSlot={
    <a
      href="/services"
      className="text-sm font-medium text-primary hover:underline"
    >
      View All Services
    </a>
  }  items={offers}
  
      renderItem={(offer) =>
        
  isMobile ? (
    <MobileOfferBannerCard
      title={offer.title}
      description={offer.description}
      buttonText={offer.buttonText}
      image={offer.image}
      href={offer.href}
      bgColor={offer.bgColor}
    />
  ) : (
    <OfferBannerCard
      title={offer.title}
      description={offer.description}
      buttonText={offer.buttonText}
      image={offer.image}
      href={offer.href}
      bgColor={offer.bgColor}
    />
  )
}

    />
    </section>
  );
};

export default SpecialOfferForYou;
