"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import { HeroImage, ServiceIcon } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";

const ExploreService = () => {
  const services = [
  {
    id: 1,
    title: "AC & Appliances Repair Service",
    image: ServiceIcon.seviceImg1,
  },
  {
    id: 2,
    title: "Painting & Renovation Service",
    image: ServiceIcon.seviceImg2,
  },
  {
    id: 3,
    title: "Pest & Insect Control Service",
    image: ServiceIcon.seviceImg3,
  },
  {
    id: 4,
    title: "Home & Corporate Cleaning",
    image: ServiceIcon.seviceImg4,
  },
  {
    id: 5,
    title: "Water & Plumbing Service",
    image: ServiceIcon.seviceImg5,
  },
  {
    id: 6,
    title: "Carpenter / Furniture Service",
    image: ServiceIcon.seviceImg6,
  },
];


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
