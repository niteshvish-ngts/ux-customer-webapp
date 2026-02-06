"use client";

import CleaningNeeds from "./cleaning-needs/page";
import EpcEssentialServices from "./epc-essential-services/page";
import ExploreService from "./explore-service/page";
import HeroSection from "./hero-section/page";
import MostBookedService from "./most-booked-service/page";
import { PremiumBanner } from "./premium-kit/page";
import SpecialOfferForYou from "./special-offer-for-you/page";
import Testimonials from "./testimonial-card/page";

export default function Landing() {
  return (
    <section>
      <HeroSection />
      <ExploreService />
      <SpecialOfferForYou />
      <MostBookedService />
      <CleaningNeeds />
      <EpcEssentialServices />
      <PremiumBanner />
      <Testimonials />
    </section>
  );
}
