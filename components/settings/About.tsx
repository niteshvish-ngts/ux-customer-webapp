'use client';

const WHAT_WE_DO = [
  '🛠️ Connect customers with verified service experts',
  '🗓️ Easy booking & real-time scheduling',
  '💳 Transparent pricing & secure payments',
  '⭐ Ratings & reviews for better trust',
  '📍 Location-based service matching',
];

const WHY_CHOOSE = [
  'Background-verified professionals',
  'Standardized service quality',
  'Real-time tracking & updates',
  'Secure transactions',
  'Dedicated customer support',
];

export default function About() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <h2 className="text-[1.625rem] font-bold text-[#1a1a1a] font-heading mb-6 leading-tight">
        About UX
      </h2>

      <div className="space-y-4 text-[15px] font-normal text-[#555] font-body leading-relaxed">
        <p>
          Urban Experts is a trusted service marketplace platform that connects
          customers with verified, skilled professionals for everyday home and
          business needs.
        </p>
        <p>
          From repairs and maintenance to specialized services, we make it
          simple to book reliable experts with just a few taps.
        </p>
        <p>
          Our goal is to bring transparency, trust, and convenience to the
          service industry by combining technology with high-quality service
          professionals.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-[17px] font-semibold text-[#333] font-heading mb-4">
          🚀 What We Do
        </h3>
        <ul className="list-none space-y-2 pl-0 text-[15px] font-normal text-[#555] font-body leading-relaxed">
          {WHAT_WE_DO.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-black shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-[17px] font-semibold text-[#333] font-heading mb-4">
          🎯 Our Mission
        </h3>
        <p className="text-[15px] font-normal text-[#555] font-body leading-relaxed">
          To simplify the way people hire service professionals by building a
          platform that is fast, reliable, and customer-focused — while
          empowering local experts with better earning opportunities.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-[17px] font-semibold text-[#333] font-heading mb-4">
          💡 Why Choose Urban Experts?
        </h3>
        <ul className="list-none space-y-2 pl-0 text-[15px] font-normal text-[#555] font-body leading-relaxed">
          {WHY_CHOOSE.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-black shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-[15px] font-normal text-[#555] font-body leading-relaxed">
        Urban Experts is built to deliver convenience for customers and growth
        for service providers — creating a smarter and more efficient service
        ecosystem.
      </p>
    </div>
  );
}
