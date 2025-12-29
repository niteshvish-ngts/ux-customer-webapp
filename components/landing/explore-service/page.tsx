"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import { HeroImage } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";

const ExploreService = () => {
  const services = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: "AC & Appliances Repair",
    image: HeroImage.heroImg8,
  }));

  return (
    <CarouselSection
      title="Explore Services"
      items={services}
      renderItem={(service) => (
        <ServiceCard
          title={service.title}
          image={service.image}
        />
      )}
    />
  );
};

export default ExploreService;
