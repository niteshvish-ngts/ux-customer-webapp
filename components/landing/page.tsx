"use client";

import ExploreService from "./explore-service/page";
import HeroSection from "./hero-section/page";
import MostBookedService from "./most-booked-service/page";
import SpecialOfferForYou from "./special-offer-for-you/page";


export default function Landing() {
  return (
    <section>   
      <HeroSection />
      <ExploreService />
      {/* <SpecialOfferForYou /> */}
      {/* <MostBookedService /> */}
    </section>
  );
}
