"use client";

import CarouselSection from "@/components/shared/carousel/carousel";
import TestimonialCard from "@/components/shared/testimonial-card";

const testimonials = [
  {
    id: 1,
    rating: 4.8,
    text:
      "UrbanXperts handled everything seamlessly. The technician arrived on time and fixed my issue faster than expected. Great experience!",
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
  },
  {
    id: 2,
    rating: 4.8,
    text:
      "Professional, reliable, and super easy to book. I don’t think I’ll use any other service platform now.",
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
  },
  {
    id: 3,
    rating: 4.8,
    text:
      "My house hasn’t looked this clean in years! The team was polite and extremely thorough. Worth every rupee.",
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
  },
  {
    id: 4,
    rating: 4.8,
    text:
      "UrbanXperts is now my go-to for weekly cleaning. Super convenient!",
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
  },
  {
    id: 5,
    rating: 4.8,
    text:
      "Excellent service and transparent pricing. Highly recommended.",
    name: "Kylie Roberts",
    role: "Customer Web Consultant",
  },
];

export default function Testimonials() {
  return (
    <section className="section-spacing">
      
          <CarouselSection
  title="Love From the Platform"
  description="our client love & trust our platform"
  showArrows={true}                    
  rightSlot={
    <a
      href="/services"
      className="text-sm font-medium text-primary hover:underline"
    >
      View All Services
    </a>
  }
  items={testimonials}
  renderItem={(item) => (
          <TestimonialCard
            rating={item.rating}
            text={item.text}
            name={item.name}
            role={item.role}
          />
        )}
      />
    </section>
  );
}
