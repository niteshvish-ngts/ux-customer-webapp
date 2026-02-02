"use client";

import React, { useState } from 'react';
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
  const [quantity, setQuantity] = useState(cartQty || 1);

  if (!open) return null;

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
    onIncrease?.();
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      onDecrease?.();
    }
  };

  const handleAdd = () => {
    onAdd();
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border flex-shrink-0">
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
              <span className="text-sm text-dark font-body">
                {rating} ({account}M reviews)
              </span>
            </div>
            <p className="text-xs text-dark-50 font-body">
              Service will start from the selected service slot and will run till it's over.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
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
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed font-body"
              >
                −
              </button>
              <span className="text-sm font-medium min-w-[30px] text-center text-dark font-body">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 font-body"
              >
                +
              </button>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-3 font-heading">
              Service Description
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-50 font-body flex-1">
                  Applicable for both window or split ACs.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#FF8836" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-dark-50 font-body flex-1">
                  Indoor unit deep cleaning with foam & jet spray.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
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
              <div className="flex flex-col items-center flex-shrink-0">
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
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 bg-prime rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold font-body">2</span>
                </div>
                <div className="w-0.5 h-20 bg-prime mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h4 className="text-sm font-semibold text-black mb-1 font-heading">
                  Deep Cleaning
                </h4>
                <p className="text-xs text-dark-50 font-body">
                  Foam and jet spray cleaning of indoor and outdoor units
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 bg-prime rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold font-body">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-black mb-1 font-heading">
                  Final Inspection
                </h4>
                <p className="text-xs text-dark-50 font-body">
                  Quality check and testing of AC functionality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-border p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-semibold text-black font-heading">
                ₹{discountedPrice * quantity}
              </span>
              {originalPrice && (
                <span className="ml-2 text-sm line-through text-muted-foreground font-body">
                  ₹{originalPrice * quantity}
                </span>
              )}
            </div>
          </div>
          
          {cartQty > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleDecrease}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 font-body"
              >
                −
              </button>
              <span className="text-base font-medium min-w-[40px] text-center text-dark font-body">
                {cartQty}
              </span>
              <button
                onClick={handleIncrease}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-prime text-lg hover:bg-orange-100 font-body"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full bg-prime hover:bg-prime/90 text-white py-3 rounded-xl text-button font-semibold transition-all shadow-sm font-body"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

