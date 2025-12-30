import React from 'react'
import { HeroImage } from "@/components/shared/images/image";
import PremiumOfferBanner from '@/components/shared/premium-kit';

export const PremiumBanner = () => {
  return (
    <div>

<PremiumOfferBanner
  badgeText="Save up to ₹2,000"
  brand="UrbanXperts"
  title="Premium Cleaning Kit"
  subtitle="Deep cleaning made effortless"
  buttonText="Buy Now"
  image={HeroImage.heroImg3}
/>
</div>
  )
}
