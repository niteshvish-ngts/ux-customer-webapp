import Navbar from "@/components/common/navbar/page";
import Landing from "@/components/landing/page";
import ServiceOfferCard from "@/components/shared/desktop-section/booked-services-card";
import { HeroImage } from "@/components/shared/images/image";
import OfferBannerCard from "@/components/shared/desktop-section/offer-banner";
import OfferBanner from "@/components/shared/desktop-section/offer-banner";
import ServiceCard from "@/components/shared/desktop-section/service-card";
import CardHeading from "@/components/shared/card-heading-and carousel/card-heading";
import Card from "@/components/shared/card-heading-and carousel/page";
import Image, { StaticImageData } from "next/image";
  import Footer from "@/components/common/footer/page";
import BottomNavbar from "@/components/common/bottom-navbar/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Landing />
      </div>
      <Footer />
      <BottomNavbar />
    </>
  );
}
