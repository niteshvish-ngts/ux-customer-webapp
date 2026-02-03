"use client";

import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Services } from '@/components/shared/images/image';

interface RatingsFaqModalProps {
  open: boolean;
  onClose: () => void;
  rating: string;
  account: number;
}

const faqs = [
  {
    id: 1,
    question: "Can I choose my meals?",
    answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget.",
    isOpen: true,
  },
  {
    id: 2,
    question: "When will I receive my order?",
    answer: "Your order will be delivered within the estimated time frame shown during checkout. You can track your order in real-time through our app.",
    isOpen: false,
  },
  {
    id: 3,
    question: "Can I skip a delivery?",
    answer: "Yes, you can skip deliveries from your account settings. Simply go to your subscription and select the delivery you want to skip.",
    isOpen: false,
  },
  {
    id: 4,
    question: "Can I add Extras to my delivery?",
    answer: "Absolutely! You can add extras to your delivery by selecting them during checkout or by modifying your order before it's confirmed.",
    isOpen: false,
  },
];

const reviews = [
  {
    id: 1,
    name: "Courtney Henry",
    rating: 4.5,
    time: "2 mins ago",
    comment: "Consequat velit qui adipisicing sunt do rependerit ad labom tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua",
    avatar: "/assets/images/Logo.png",
  },
  {
    id: 2,
    name: "Courtney Henry",
    rating: 4.5,
    time: "2 mins ago",
    comment: "Consequat velit qui adipisicing sunt do rependerit ad labom tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua",
    avatar: "/assets/images/Logo.png",
  },
];

export default function RatingsFaqModal({
  open,
  onClose,
  rating,
  account,
}: RatingsFaqModalProps) {
  const [faqList, setFaqList] = useState(faqs);

  if (!open) return null;

  const toggleFaq = (id: number) => {
    setFaqList((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-400/30 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[450px] h-[550px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border shrink-0">
          <h2 className="text-xl font-semibold text-black font-heading">
            Ratings & FAQ's
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4 scrollbar-hide">
          {/* Rating Summary */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-4">
              <Image
                src={Services.serviceImg1}
                alt="rating star"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-sm text-dark font-body underline">
                {rating} ({account}M reviews)
              </span>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Star bars */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-dark font-body w-4">{star}</span>
                      <Image
                        src={Services.serviceImg1}
                        alt="star"
                        width={12}
                        height={12}
                        className="object-contain"
                      />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-success rounded-full"
                          style={{
                            width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Average rating */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-1 font-heading">4.0</div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Image
                        key={star}
                        src={Services.serviceImg1}
                        alt="star"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-dark-50 font-body">
                    {account}M Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-4 font-heading">
              FAQ's
            </h3>
            <div className="space-y-2">
              {faqList.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-medium text-black font-body">
                      {faq.question}
                    </span>
                    {faq.isOpen ? (
                      <ChevronDown className="w-5 h-5 text-prime shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-prime shrink-0" />
                    )}
                  </button>
                  {faq.isOpen && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-dark-50 font-body leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-base font-semibold text-black mb-4 font-heading">
              Reviews
            </h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 flex items-center justify-center">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-black font-body">
                          {review.name}
                        </span>
                        <span className="text-xs text-dark-50 font-body">
                          {review.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Image
                            key={star}
                            src={Services.serviceImg1}
                            alt="star"
                            width={12}
                            height={12}
                            className={`object-contain ${
                              star <= Math.floor(review.rating)
                                ? 'opacity-100'
                                : star === Math.ceil(review.rating) && review.rating % 1 !== 0
                                ? 'opacity-50'
                                : 'opacity-20'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-dark-50 font-body leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
