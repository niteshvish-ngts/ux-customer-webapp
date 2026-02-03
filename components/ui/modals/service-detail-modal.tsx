"use client";

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Services } from '@/components/shared/images/image';

interface ServiceDetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  rating: string;
  account: number;
  time: string;
  pricePerUnit: number;
  originalPrice?: number;
  discountedPrice: number;
  description: string;
  onAdd: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  cartQty?: number;
}

export default function ServiceDetailModal({
  open,
  onClose,
  title,
  rating,
  account,
  time,
  pricePerUnit,
  originalPrice,
  discountedPrice,
  description,
  onAdd,
  onIncrease,
  onDecrease,
  cartQty = 0,
}: ServiceDetailModalProps) {
  if (!open) return null;

  // Use cartQty directly, if 0 then show 1 for display in modal
  const displayQty = cartQty > 0 ? cartQty : 1;

  const handleIncrease = () => {
    if (cartQty > 0) {
      // If already in cart, increase quantity - this will update cart
      onIncrease?.();
    } else {
      // If not in cart, add it first - this will add to cart and trigger counter
      onAdd();
    }
  };

  const handleDecrease = () => {
    if (cartQty > 0) {
      // Decrease quantity in cart
      onDecrease?.();
    }
  };

  const handleAdd = () => {
    // Add to cart - this will make cartQty > 0 and show counter
    onAdd();
  };

  const totalPrice = discountedPrice * displayQty;
  const totalOriginalPrice = originalPrice ? originalPrice * displayQty : undefined;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-400/30 p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[450px] h-[550px] flex flex-col overflow-hidden"
      >
        {/* Header - Fixed */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border shrink-0">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-semibold text-black mb-2 font-heading">
              {title}
            </h2>
            <div className="flex items-center gap-1 mb-2">
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
            <p className="text-xs text-dark-50 font-body">
              Service will start from the selected service slot and will run till it's over.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4 scrollbar-hide" style={{ gap: '20px' }}>
          {/* Service Summary */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-sm text-dark mb-2 font-body">
                {time} worktime
              </p>
              <div className="flex items-center gap-1 text-sm text-success font-body">
                <Image
                  src={Services.serviceImg3}
                  alt="price tag"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                <span>₹{pricePerUnit} per unit</span>
              </div>
            </div>
            
            {/* Quantity Selector */}
            {cartQty > 0 ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrease}
                  disabled={cartQty <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed font-body"
                >
                  −
                </button>
                <span className="text-sm font-medium min-w-[30px] text-center text-dark font-body">
                  {cartQty}
                </span>
                <button
                  onClick={handleIncrease}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 font-body"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-prime hover:bg-prime/90 text-white rounded-lg text-sm font-semibold transition-all shadow-sm font-body"
              >
                Add
              </button>
            )}
          </div>

          {/* Service Description */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-3 font-heading">
              Service Description
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-50 font-body flex-1">
                  Applicable for both window or split ACs.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-50 font-body flex-1">
                  Indoor unit deep cleaning with foam & jet spray.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-50 font-body flex-1">
                  JET spray cleaning of outdoor unit.
                </p>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-4 font-heading">
              Our Process
            </h3>
            
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 bg-prime rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold font-body">1</span>
                </div>
                <div className="w-0.5 h-20 bg-prime mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h4 className="text-sm font-semibold text-black mb-1 font-heading">
                  Pre-service checks
                </h4>
                <p className="text-xs text-dark-50 font-body">
                  Complete AC check-up, including cooling gas level check
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 border-2 border-prime bg-orange-50 rounded-lg flex items-center justify-center">
                  <span className="text-prime text-sm font-semibold font-body">2</span>
                </div>
                <div className="w-0.5 h-24 bg-prime mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h4 className="text-sm font-semibold text-black mb-1 font-heading">
                  Indoor unit cleaning
                </h4>
                <p className="text-xs text-dark-50 font-body">
                  Foam & jet spray cleaning of filters, coils, fins & tray. AC is covered to prevent spillage.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 border-2 border-prime bg-orange-50 rounded-lg flex items-center justify-center">
                  <span className="text-prime text-sm font-semibold font-body">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-black mb-1 font-heading">
                  Outdoor unit cleaning
                </h4>
                <p className="text-xs text-dark-50 font-body">
                  The outer unit is dismantled & cleaned with a jet spray (if easily accessible)
                </p>
              </div>
            </div>
          </div>

          {/* What we'll need from you */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-4 font-heading">
              What we'll need from you
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {/* Buckets Card */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12L16 6L24 12V26C24 26.5304 23.7893 27.0391 23.4142 27.4142C23.0391 27.7893 22.5304 28 22 28H10C9.46957 28 8.96086 27.7893 8.58579 27.4142C8.21071 27.0391 8 26.5304 8 26V12Z" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V8C12 7.46957 12.2107 6.96086 12.5858 6.58579C12.9609 6.21071 13.4696 6 14 6H18C18.5304 6 19.0391 6.21071 19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8V12" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-dark font-body text-center">2 buckets</p>
              </div>

              {/* Socket Card */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="12" width="12" height="12" rx="2" stroke="#FF8836" strokeWidth="2"/>
                    <circle cx="16" cy="18" r="1.5" fill="#FF8836"/>
                    <path d="M16 12V10M16 24V26" stroke="#FF8836" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-xs text-dark font-body text-center">1 Socket</p>
              </div>

              {/* Stool or Ladder Card */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L10 26M22 8L24 26M10 14H22M10 20H22" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-dark font-body text-center">1 Stool or Ladder</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

