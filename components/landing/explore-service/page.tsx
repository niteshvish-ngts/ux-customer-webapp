"use client";

import { useState } from "react";
import CarouselSection from "@/components/shared/carousel/carousel";
import {  Modal2, Modal3, Modal4, Modal5, ServiceIcon } from "@/components/shared/images/image";
import ServiceCard from "@/components/shared/service-card";
import ServiceCategoryModal from "@/components/ui/modals/service-categoryModal";
import Image from "next/image";

const ExploreService = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Complete service data with sub-services
  const serviceCategories = [
    {
      id: 1,
      mobileTitle: "AC & Appliances",
      desktopTitle: "AC & Appliances Repair Service",
      image: ServiceIcon.seviceImg1,
      subServices: [
        { id: 1, name: 'AC Installation', img: Modal5.modalImg1 },
        { id: 2, name: 'AC Repair', img: Modal5.modalImg2 },
        { id: 3, name: 'AC Cleaning', img: Modal5.modalImg3 },
        { id: 4, name: 'Refrigerator Repair', img: Modal5.modalImg4 },
        { id: 5, name: 'Washing Machine Repair', img: Modal5.modalImg5 },
        { id: 6, name: 'Microwave Repair', img: Modal5.modalImg6 },
      ]
    },
    {
      id: 2,
      mobileTitle: "Painting & Renovation",
      desktopTitle: "Painting & Renovation Service",
      image: ServiceIcon.seviceImg2,
      subServices: [
        { id: 1, name: 'Wall Painting', img: Modal2.modalImg1 },
        { id: 2, name: 'Exterior Painting', img: Modal2.modalImg2 },
        { id: 3, name: 'Waterproofing', img: Modal2.modalImg3 },
        { id: 4, name: 'Floor Polishing', img: Modal2.modalImg4 },
      ]
    },
    {
      id: 3,
      mobileTitle: "Pest Control",
      desktopTitle: "Pest & Insect Control Service",
      image: ServiceIcon.seviceImg3,
      subServices: [
        { id: 1, name: 'Cockroach Control', img: Modal3.modalImg1 },
        { id: 2, name: 'Termite Control', img: Modal3.modalImg2 },
        { id: 3, name: 'Mosquito Control', img: Modal3.modalImg3 },
        { id: 4, name: 'Rat Control', img: Modal3.modalImg4 },
      ]
    },
    {
      id: 4,
      mobileTitle: "Cleaning Services",
      desktopTitle: "Home & Corporate Cleaning",
      image: ServiceIcon.seviceImg4,
      subServices: [
  { id: 1, name: 'Corporate Cleaning', img: Modal2.modalImg1 },
  { id: 2, name: 'Kitchen Cleaning', img: Modal2.modalImg2 },
  { id: 3, name: 'Bathroom Cleaning', img: Modal2.modalImg3 },
  { id: 4, name: 'Sofa Cleaning', img: Modal2.modalImg4 },
  { id: 5, name: 'Fridge Cleaning', img: Modal2.modalImg5 },
  { id: 6, name: 'Weekly House Cleaning', img: Modal2.modalImg6 },
]
    },
    {
      id: 5,
      mobileTitle: "Water & Plumbing",
      desktopTitle: "Water & Plumbing Service",
      image: ServiceIcon.seviceImg5,

      
  subServices: [
    { 
      id: 1, 
      name: "Tap Repair", 
      img: Modal5.modalImg1 
    },
    { 
      id: 2, 
      name: "Pipe Leakage", 
      img: Modal5.modalImg2 
    },
    { 
      id: 3, 
      name: "Toilet Repair", 
      img: Modal5.modalImg3 
    },
    { 
      id: 4, 
      name: "Water Tank Cleaning", 
      img: Modal5.modalImg4 
    },
  ]
},
    
    {
      id: 6,
      mobileTitle: "Carpenter Furniture",
      desktopTitle: "Carpenter / Furniture Service",
      image: ServiceIcon.seviceImg6,
      subServices: [
        { id: 1, name: 'Furniture Repair', img: Modal4.modalImg1 },
        { id: 2, name: 'Door Repair', img: Modal4.modalImg2 },
        { id: 3, name: 'Cupboard Installation', img: Modal4.modalImg3 },
        { id: 4, name: 'Bed Repair', img: Modal4.modalImg4 },
      ]
    },
  ];

  const handleCardClick = (categoryId: number) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(JSON.stringify({
        title: category.desktopTitle,
        subServices: category.subServices
      }));
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const parsedCategory = selectedCategory ? JSON.parse(selectedCategory) : null;

  return (
    <section className="section-spacer ">
      {/* DESKTOP/TABLET ONLY - Carousel */}
      <div className="hidden sm:block">
        <CarouselSection
          title="Explore Services"
          items={serviceCategories}
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
                mobileTitleOverride={service.mobileTitle}
                onClick={() => handleCardClick(service.id)}
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
          {serviceCategories.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.mobileTitle}
              image={service.image}
              onClick={() => handleCardClick(service.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {parsedCategory && (
        <ServiceCategoryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          category={parsedCategory.title}
          services={parsedCategory.subServices}
           img={parsedCategory.img}
        />
      )}
    </section>
  );
};

export default ExploreService;