import { HeroImage } from '@/components/shared/images/image';
import OfferBannerCard from '@/components/shared/offer-banner';
import CardHeading from '@/components/shared/special-offers-cards/card-heading';
import { StaticImageData } from 'next/image';
import React from 'react'

const SpecialOfferForYou = () => {
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
          description: "order your first booking and get heavy discounts",
          buttonText: "Explore Now",
          image: HeroImage.heroImgbanner,
          href: "/services",
          bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
        },
        {
          id: 2,
          title: "Flat 25% off on Home Painting",
          description: "order our painting service on year end",
          buttonText: "Book Service",
          image: HeroImage.heroImgbanner,
          href: "/painting",
          bgColor: "bg-gradient-to-r from-blue-500 via-green-500 to-teal-500",
        },
        {
          id: 3,
          title: "Upto 60% off on Home Cleaning",
          description: "order your home cleaning service on year end",
          buttonText: "Book Service",
          image: HeroImage.heroImgbanner,
          href: "/cleaning",
          bgColor: "bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500",
        },
      ];
  return (
    <div>
        <section className="">
          <CardHeading title={"Special Offers For You"} />
          <div className="">
                {offers.map((offer) => (
                  <OfferBannerCard
                    key={offer.id}
                    title={offer.title}
                    description={offer.description}
                    buttonText={offer.buttonText}
                    image={offer.image}
                    href={offer.href}
                    bgColor={offer.bgColor}
                  />
                ))}
          </div>
        </section>
    </div>
  )
}

export default SpecialOfferForYou