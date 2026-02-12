"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Booking, Rating } from "../shared/images/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

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
  imagePreview,
  onImageSelect,
  onImageRemove,
}: {
  title: string;
  rating: number;
  setRating: (v: number) => void;
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
    e.target.value = "";
  };

  return (
    <div className="border rounded-xl bg-white p-7 flex flex-col justify-between">
      <div className="space-y-4">
        <h3 className="text-2xl font-medium font-outfit">{title}</h3>

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

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {imagePreview ? (
          <div className="relative w-full max-w-[140px] aspect-square rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-11 h-11 rounded-lg bg-muted hover:bg-slate-200 flex items-center justify-center overflow-hidden transition-colors cursor-pointer"
          >
            <Image
              src={Rating.ratingImg1}
              alt="Upload"
              className="w-6 h-6 object-cover"
            />
          </button>
        )}
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
  const [serviceImage, setServiceImage] = useState<{ file: File; preview: string } | null>(null);
  const [providerImage, setProviderImage] = useState<{ file: File; preview: string } | null>(null);
  const router = useRouter();

  const handleServiceImageSelect = (file: File) => {
    if (serviceImage?.preview) URL.revokeObjectURL(serviceImage.preview);
    setServiceImage({ file, preview: URL.createObjectURL(file) });
  };
  const handleServiceImageRemove = () => {
    if (serviceImage?.preview) URL.revokeObjectURL(serviceImage.preview);
    setServiceImage(null);
  };
  const handleProviderImageSelect = (file: File) => {
    if (providerImage?.preview) URL.revokeObjectURL(providerImage.preview);
    setProviderImage({ file, preview: URL.createObjectURL(file) });
  };
  const handleProviderImageRemove = () => {
    if (providerImage?.preview) URL.revokeObjectURL(providerImage.preview);
    setProviderImage(null);
  };

  return (
    <>  
    
     <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <div className="">
        <div className="container py-4 flex justify-between items-start">
          <div>
           <button
             onClick={() => router.back()}
             className="hidden md:flex items-center gap-2 text-sm text-muted-foreground"
           >
             <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
             back
           </button>
            <h1 className="flex items-center gap-2 text-4xl font-semibold font-outfit mt-2">
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
                          ID: 7642364246246
                        </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-6">
          {/* LEFT INFO */}
          <div className=" bg-white p-6">
            <h3 className="font-medium mb-4 text-2xl font-outfit">
              What creates a “good review” ?
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-black text-lg">
                  ➜ Have you took this service ?
                </p>
                <p>
                  Your review should be about your experience with the service.
                </p>
              </div>

              <hr />

              <div>
                <p className="font-medium text-black text-lg">
                  ➜ Why you should review a service/provider ?
                </p>
                <p>
                  Your valuable feedback will help others choose better services.
                </p>
              </div>

              <hr />

              <div>
                <p className="font-medium text-black text-lg">
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
              imagePreview={serviceImage?.preview ?? null}
              onImageSelect={handleServiceImageSelect}
              onImageRemove={handleServiceImageRemove}
            />

            <ReviewCard
              title="Rate the Service Provider"
              rating={providerRating}
              setRating={setProviderRating}
              imagePreview={providerImage?.preview ?? null}
              onImageSelect={handleProviderImageSelect}
              onImageRemove={handleProviderImageRemove}
            />
          </div>
        </div>
      </div>
    </div>
    </>
 
  );
}
