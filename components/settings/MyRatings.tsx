'use client';

import { Star, Pencil } from 'lucide-react';
import Image from 'next/image';
import { Booking } from '@/components/shared/images/image';

const RATING_CARDS = [
  {
    serviceName: 'Foam-jet service (2 ACs)',
    serviceId: '1703562385345',
    dateCompleted: 'Dec 19, 2025',
    serviceRating: 5,
    providerRating: 5,
  },
  {
    serviceName: 'Foam-jet service (2 ACs)',
    serviceId: '1703562385345',
    dateCompleted: 'Dec 19, 2025',
    serviceRating: 5,
    providerRating: 5,
  },
  {
    serviceName: 'Foam-jet service (2 ACs)',
    serviceId: '1703562385345',
    dateCompleted: 'Dec 19, 2025',
    serviceRating: 5,
    providerRating: 5,
  },
];

function RatingStars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function MyRatings() {
  return (
    <div className="bg-[#f9f9fc] rounded-2xl p-6 md:p-8">
      <h2 className="text-[1.875rem] font-bold text-gray-800 font-heading mb-6">
        My Ratings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RATING_CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4"
          >
            <p className="text-base font-semibold text-gray-800 font-body leading-tight">
              {card.serviceName}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-gray-500 font-body">
              <Image
                src={Booking.bookingImg4}
                alt=""
                width={14}
                height={14}
                className="shrink-0"
                aria-hidden
              />
              <span>
                SERVICE ID:{' '}
                <span className="underline">{card.serviceId}</span>
              </span>
            </p>

            <p className="text-xs text-gray-500 font-body">
              Date Completed: {card.dateCompleted}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800 font-body">
                Service Ratings
              </p>
              <RatingStars count={card.serviceRating} />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800 font-body">
                Service Provider Ratings
              </p>
              <RatingStars count={card.providerRating} />
            </div>

            <button
              type="button"
              className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition font-body"
            >
              Edit
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
