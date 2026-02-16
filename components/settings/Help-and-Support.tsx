'use client';

import { ChevronRight, Mail } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How do I create an account?',
    answer:
      "Download the app, sign up using your mobile/email, verify with OTP, and you're ready.",
  },
  {
    question: 'How do I cancel or reschedule?',
    answer:
      'Open the booking and tap Cancel or Reschedule (subject to policy).',
  },
  {
    question: 'How do I update my profile details?',
    answer:
      'Navigate to Profile → Edit Information → Save Changes.',
  },
  {
    question: 'How do I track my booking/order?',
    answer:
      'Go to My Bookings → Select the Order → View Status.',
  },
];

export default function HelpAndSupport() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:gap-0">
        {/* Left: Help & Support (FAQs) */}
        <section className="flex flex-col lg:flex-1 lg:pr-8">
          <h2 className="text-[1.875rem] font-bold text-[#101828] font-heading mb-6 leading-tight">
            Help & Support
          </h2>

          <div className="divide-y divide-[#E5E7EB]">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="py-5 first:pt-0 last:pb-0">
                <p className="flex items-start gap-2 text-base font-bold text-[#101828] font-body leading-snug">
                  <ChevronRight
                    className="w-5 h-5 shrink-0 mt-0.5 text-black"
                    aria-hidden
                  />
                  {item.question}
                </p>
                <p className="mt-2 ml-7 text-sm font-normal text-[#667085] font-body leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 text-sm font-normal text-[#667085] font-body hover:underline text-left"
          >
            View all FAQs
          </button>
        </section>

        {/* Vertical divider - visible on desktop */}
        <div className="hidden lg:block w-px min-h-[320px] bg-[#E5E7EB] shrink-0" aria-hidden />

        {/* Right: Contact Support */}
        <section className="flex flex-col lg:flex-1 lg:pl-8 mt-8 lg:mt-0">
          <div className="flex items-center gap-2 mb-2">
            <Mail
              className="w-6 h-6 shrink-0 text-[#E74C3C]"
              aria-hidden
            />
            <h2 className="text-xl font-bold text-[#101828] font-heading leading-tight">
              Contact Support
            </h2>
          </div>

          <p className="text-sm font-normal text-[#667085] font-body mb-6">
            Still need help? Our support team is ready.
          </p>

          <div className="space-y-5">
            <div>
              <p className="text-base font-bold text-[#101828] font-body mb-1">
                Email Support
              </p>
              <p className="text-sm font-normal text-[#667085] font-body">
                support@yourapp.com
              </p>
              <p className="mt-1 text-xs font-normal text-[#667085] font-body">
                Response time: Within 24 hours
              </p>
            </div>

            <div className="pt-2">
              <p className="text-base font-bold text-[#101828] font-body mb-1">
                Phone Support (Optional)
              </p>
              <p className="text-sm font-normal text-[#667085] font-body">
                +91-XXXXXXXXXX
              </p>
              <p className="mt-1 text-xs font-normal text-[#667085] font-body">
                Available: Mon-Sat, 10 AM - 6 PM
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
