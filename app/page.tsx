import Navbar from "@/components/common/navbar/page";
import Landing from "@/components/landing/page";
import ServiceOfferCard from "@/components/shared/booked-services-card";
import { HeroImage } from "@/components/shared/images/image";
import OfferBannerCard from "@/components/shared/offer-banner";
import OfferBanner from "@/components/shared/offer-banner";
import ServiceCard from "@/components/shared/service-card";
import CardHeading from "@/components/shared/special-offers-cards/card-heading";
import Card from "@/components/shared/special-offers-cards/page";
import Image, { StaticImageData } from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Landing />
      </div>
    </>
  );
}
