"use client";

import { useState } from "react";
import Navbar from "../common/navbar/page";
import Image from "next/image";
import { Booking } from "../shared/images/image";
import Router from "next/router";
import { useRouter } from "next/navigation";

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 text-[#FFC107] text-lg">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => onChange(i)}>
            {i <= value ? "★" : "☆"}
          </button>
        ))}
      </div>
      <span className="text-sm font-medium text-green-600">
        Excellent
      </span>
    </div>
  );
};

const ReviewCard = ({
  title,
  rating,
  setRating,
}: {
  title: string;
  rating: number;
  setRating: (v: number) => void;
}) => {
  return (
    <div className="border rounded-xl bg-white p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <h3 className="text-base font-medium">{title}</h3>

        <StarRating value={rating} onChange={setRating} />

        <div>
          <label className="text-xs font-medium">
            Review Title (optional)
          </label>
          <input
            placeholder="eg. awesome platform..."
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium">
            Description *
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
          📷
        </button>
      </div>

      <button className="mt-6 w-full bg-[#FF8A00] text-white py-2 rounded-lg font-medium hover:bg-[#ff7a00]">
        Submit
      </button>
    </div>
  );
};

export default function RatingsReviewsPage() {
  const [serviceRating, setServiceRating] = useState(5);
  const [providerRating, setProviderRating] = useState(5);
  const router = useRouter();
  return (
    <>  
    <Navbar />
     <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <div className="border-b bg-white">
        <div className="container py-4 flex justify-between items-start">
          <div>
           <button
             onClick={() => router.back()}
             className="flex items-center gap-2 text-sm text-muted-foreground"
           >
             <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
             back
           </button>
            <h1 className="flex items-center gap-2 text-xl font-medium">
              ⭐ Ratings & Reviews
            </h1>
          </div>

          <div className="text-sm text-muted-foreground text-right">
            <p className="font-medium text-foreground">
              Foam-jet service (2 ACs)
            </p>
            <p>Date Completed: Dec 19, 2025</p>
            <p className="text-xs text-dark flex items-center gap-1">
                          <Image
                            src={Booking.bookingImg4}
                            alt="star"
                            width={14}
                            height={14}
                          />
                          ID: 
                        </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-6">
          {/* LEFT INFO */}
          <div className="border rounded-xl bg-white p-6">
            <h3 className="font-medium mb-4">
              What creates a “good review” ?
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">
                  ➜ Have you took this service ?
                </p>
                <p>
                  Your review should be about your experience with the service.
                </p>
              </div>

              <hr />

              <div>
                <p className="font-medium text-foreground">
                  ➜ Why you should review a service/provider ?
                </p>
                <p>
                  Your valuable feedback will help others choose better services.
                </p>
              </div>

              <hr />

              <div>
                <p className="font-medium text-foreground">
                  ➜ How to write a product/provider review ?
                </p>
                <p>
                  Honest opinions with facts are always appreciated.
                  If you face an issue, contact help centre.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReviewCard
              title="Rate the Service"
              rating={serviceRating}
              setRating={setServiceRating}
            />

            <ReviewCard
              title="Rate the Service Provider"
              rating={providerRating}
              setRating={setProviderRating}
            />
          </div>
        </div>
      </div>
    </div>
    </>
 
  );
}
