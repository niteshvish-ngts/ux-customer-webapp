"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import { ServiceIcon } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";

const ExploreService = () => {
  const services = [
    { id: 1, title: "AC & Appliances Repair Service", image: ServiceIcon.seviceImg1 },
    { id: 2, title: "Painting & Renovation Service", image: ServiceIcon.seviceImg2 },
    { id: 3, title: "Pest & Insect Control Service", image: ServiceIcon.seviceImg3 },
    { id: 4, title: "Home & Corporate Cleaning", image: ServiceIcon.seviceImg4 },
    { id: 5, title: "Water & Plumbing Service   ", image: ServiceIcon.seviceImg5 },
    { id: 6, title: "Carpenter / Furniture Service", image: ServiceIcon.seviceImg6 },
  ];

  return (
    
   <>
   <section className="section-spacer">
      {/* 📱 MOBILE GRID */}
      <div className="grid grid-cols-3 gap-3 sm:hidden">
        {services.slice(0, 6).map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            image={service.image}
          />
        ))}
      </div>
 
      {/* 🖥 DESKTOP CAROUSEL */}
      
      <div className="hidden sm:block ">
        <CarouselSection
          title="Explore Services"
          items={services}
          showArrows={true}
          rightSlot={
    <a
      href="/services"
      className="text-sm font-medium text-primary hover:underline"
    >
      View All Services
    </a>
  }

          renderItem={(service) => (
            <ServiceCard
              title={service.title}
              image={service.image}
            />
          )}
        />
      </div>
      </section>
    
    </>
  );
};

export default ExploreService;

