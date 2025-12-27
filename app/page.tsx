import Navbar from "@/components/common/navbar/page";
import Hero from "@/components/landing/page";
import { HeroImage } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";
import Card from "@/components/shared/special-offers-cards/page";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="container">
      
<Hero/>
<ServiceCard
  title="AC & Appliances Repair"
  image={HeroImage.heroImg1}  
/>

      <Card/>
      <h1 className="font-heading text-2xl text-prime">Urban Xperts</h1>
      <p className="font-body text-dark-50">
        Welcome to the UX Customer Webapp
      </p>
    </div>
    </>
  );
}
