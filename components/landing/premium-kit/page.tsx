"use client";

import React from 'react'
// import { HeroImage } from "@/components/shared/images/image";
// import PremiumOfferBanner from '@/components/shared/premium-kit';

// export const PremiumBanner = () => {
//   return (
//     <div>

// <PremiumOfferBanner
//   badgeText="Save up to ₹2,000"
//   brand="UrbanXperts"
//   title="Premium Cleaning Kit"
//   subtitle="Deep cleaning made effortless"
//   buttonText="Buy Now"
//   image={HeroImage.heroImg3}
// />
// </div>
//   )
// }

import { useMediaQuery } from "react-responsive";
import { HeroImage } from "@/components/shared/images/image";
import PremiumOfferBanner from "@/components/shared/premium-kit";
import MobilePremiumOfferBanner from '@/components/shared/m-premium-kit';

export const PremiumBanner = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const bannerProps = {
    badgeText: "Save up to ₹2,000",
    brand: "UrbanXperts",
    title: "Premium Cleaning Kit",
    subtitle: "Deep cleaning made effortless",
    buttonText: "Buy Now",
    image: HeroImage.heroImg3,
  };

  return (
    <>
      {isMobile ? (
        <MobilePremiumOfferBanner {...bannerProps} />
      ) : (
        <PremiumOfferBanner {...bannerProps} />
      )}
    </>
  );
};

