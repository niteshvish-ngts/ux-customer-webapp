import Navbar from "@/components/common/navbar/page";
import Card from "@/components/shared/special-offers-cards/page";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="container">
      

      <Card/>
      <h1 className="font-heading text-2xl text-prime">Urban Xperts</h1>
      <p className="font-body text-dark-50">
        Welcome to the UX Customer Webapp
      </p>
    </div>
    </>
  );
}
