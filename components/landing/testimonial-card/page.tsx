"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import TestimonialCard from "@/components/shared/desktop-section/testimonial-card";
import TestimonialCardMobile from "@/components/shared/mobile-screen/m-testimonial-card";
import { StaticImageData } from "next/image";
import { useMediaQuery } from "react-responsive";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  review: string;
  image?: string | StaticImageData;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
  {
    id: 2,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
  {
    id: 3,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
  {
    id: 4,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
  {
    id: 5,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
  {
    id: 6,
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
    rating: 4.8,
    review: "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
  },
];

const TestimonialSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="section-spacing md:px-0 px-2">
      <CarouselSection<Testimonial>
        title="Love From the Platform"
        description="our client love & trust our platform"
        showArrows={true}
        controlsPosition="top"
        items={testimonials}
        
        renderItem={(item) =>
          isMobile ? (
            <TestimonialCardMobile
              name={item.name}
              role={item.role}
              rating={item.rating}
              review={item.review}
              image={item.image}
            />
          ) : (
            <TestimonialCard
              name={item.name}
              role={item.role}
              rating={item.rating}
              review={item.review}

            />
          )
        }
      />
    </section>
  );
};

export default TestimonialSection;