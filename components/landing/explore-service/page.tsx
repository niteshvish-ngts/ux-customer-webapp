"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import { ServiceIcon } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";

const ExploreService = () => {
  const services = [
    { id: 1, mobileTitle: "AC & Appliances", desktopTitle: "AC & Appliances Repair Service", image: ServiceIcon.seviceImg1 },
    { id: 2, mobileTitle: "Painting & Renovation", desktopTitle: "Painting & Renovation Service", image: ServiceIcon.seviceImg2 },
    { id: 3, mobileTitle: "Pest Control", desktopTitle: "Pest & Insect Control Service", image: ServiceIcon.seviceImg3 },
    { id: 4, mobileTitle: "Cleaning Services", desktopTitle: "Home & Corporate Cleaning", image: ServiceIcon.seviceImg4 },
    { id: 5, mobileTitle: "Water & Plumbing", desktopTitle: "Water & Plumbing Service", image: ServiceIcon.seviceImg5 },
    { id: 6, mobileTitle: "Carpenter Furniture", desktopTitle: "Carpenter / Furniture Service", image: ServiceIcon.seviceImg6 },
    { id: 6, mobileTitle: "Carpenter Furniture", desktopTitle: "Carpenter / Furniture Service", image: ServiceIcon.seviceImg6 },
  ];

  return (
    <section className="section-spacer ">
      {/* DESKTOP/TABLET ONLY - Carousel */}
      <div className="hidden sm:block">
        <CarouselSection
          title="Explore Services"
          items={services}
          showArrows={true}
          controlsPosition="top"
          rightSlot={
            <a href="/services" className="text-sm font-medium text-primary hover:underline">
              View All Services
            </a>
          }
          renderItem={(service) => (
            <div
            className="
              flex-shrink-0
              basis-1/5        /* 📱 mobile = 5 */
              md:basis-1/4     /* 📟 tablet = 4 */
              lg:basis-1/6     /* 🖥 desktop = 6 */
            "
          >
              <ServiceCard
                title={service.desktopTitle}
                image={service.image}
                // Mobile par short title dikhane ke liye override
                mobileTitleOverride={service.mobileTitle}
                href="/service"
              />
              
            </div>
          )}
        />
      </div>

      {/* ONLY MOBILE - Grid */}
      <div className="sm:hidden px-4">
        <div className="flex items-center justify-between section-spacer-bottom">
          <div className="card-title text-2xl sm:text-4xl">Explore Services</div>
          <a href="/services" className="text-sm font-medium text-primary hover:underline">
            View All Services
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.mobileTitle}
              image={service.image}
                href="/service" 

            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreService;