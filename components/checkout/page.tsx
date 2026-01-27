"use client";
import React, { useState } from 'react';
import { MapPin, Clock, CreditCard, Check } from 'lucide-react';
import AddressModal from './addressModals';
import SlotModal from './slotModals';
import Image from 'next/image';
import { Booking, Checkout } from '../shared/images/image';
import { useRouter } from 'next/navigation';

export default function CheckoutFlow() {
  const [addressModalOpen, setAddressModalOpen] = useState<boolean>(false);
  const [slotModalOpen, setSlotModalOpen] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<boolean>(false);
  const [slotSelected, setSlotSelected] = useState<boolean>(false);

  const handleAddressSelect = () => {
    setAddressSelected(true);
    setAddressModalOpen(false);
  };

  const handleSlotSelect = () => {
    setSlotSelected(true);
    setSlotModalOpen(false);
  };
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
                      onClick={() => router.back()}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Image
                        src={Booking.bookingImg3}
                        alt="Back"
                        width={16}
                        height={16}
                      />
Checkout                    </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                N
              </div>
              <span className="text-sm font-medium">Nitesh </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
                                      <h2 className="font-semibold text-xl mb-4">Checkout</h2>

            {/* Savings Banner */}
            <div className="text-sm  flex items-center gap-1 font-lato">
              <Image src={Checkout.checkoutImg1} alt="" className="w-6 h-6" />
              Saving ₹200 on this order
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Image src={Checkout.checkoutImg4} alt="" className="w-5 h-5" />
                <h2 className="text-base font-semibold text-black">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InputField label="First Name" value="" />
                <InputField label="Last Name" value="" />
                <InputField label="Phone" value="" />
                <InputField label="Email" value="" />
              </div>

              {/* Service Address Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                <Image src={Checkout.checkoutImg5} alt="" className="w-5 h-5" />
                  <label className="text-base font-semibold text-black">Service Address</label>
                </div>
                
                {!addressSelected ? (
                  <button
                    onClick={() => setAddressModalOpen(true)}
                    className="w-full bg-prime hover:bg-prime text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Select Address
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-base font-semibold text-black">Address Selected</p>
                    </div>
                    <button
                      onClick={() => setAddressModalOpen(true)}
                      className="text-xs text-green-700 hover:text-green-900 font-medium underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Time Slot Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                        <Image src={Checkout.checkoutImg3} alt="" className="w-5 h-5" />
                  <label className="text-base font-semibold text-black">Time Slot</label>
                </div>

                {!slotSelected ? (
                  addressSelected ? (
                    <button
                      onClick={() => setSlotModalOpen(true)}
                      className="w-full bg-prime hover:bg-prime text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Select Time Slot
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-lg bg-slate-50 text-slate-400 text-sm font-medium text-center border border-slate-200">
                      Select Time Slot
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-green-900">Time Slot Selected</p>
                    </div>
                    <button
                      onClick={() => setSlotModalOpen(true)}
                      className="text-xs text-green-700 hover:text-green-900 font-medium underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image src={Checkout.checkoutImg2} alt="" className="w-5 h-5" />
                  <label className="text-base font-semibold text-black">Payment Method</label>
                </div>

                {slotSelected ? (
                  <button className="w-full bg-prime hover:bg-prime text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                    Proceed To Pay
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-lg bg-slate-50 text-slate-400 text-sm font-medium text-center border border-slate-200">
                    Payment Method
                  </div>
                )}
              </div>
            </div>

            {/* Cancellation Policy */}
            {slotSelected && (
              <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Cancellation policy</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">
                  Free cancellations if done more than 12 hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.
                </p>
                <button className="text-sm text-prime font-medium hover:text-prime">
                  Read Full Policy
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
                          <h2 className="font-semibold text-slate-900 mb-4">Items in Cart</h2>

            {/* Items in Cart */}
            <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
              
              <div className="space-y-4">
                <CartItem
                  name="Foam-Jet service (2 AC's) X 1"
                  price="₹2000"
                  originalPrice="₹3200"
                />
                <CartItem
                  name="Window AC Installation X 1"
                  price="₹1240"
                  originalPrice="₹2400"
                />
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Coupon Code</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="eg. UX10OFF"
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Payment Summary</h2>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Total</span>
                  <div className="text-right">
                    <span className="line-through text-slate-400 text-xs mr-1">₹3,298</span>
                    <span className="font-medium text-slate-900">₹1,098</span>
                  </div>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Fee</span>
                  <span className="text-slate-900">₹ 25.12</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Discount</span>
                  <span className="text-red-600 font-medium">(-) ₹1123.19</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Amount To Pay</span>
                  <span className="text-xl font-bold text-slate-900">₹1000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's own modals */}
      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onProceed={handleAddressSelect}
      />

      <SlotModal
        open={slotModalOpen}
        onClose={() => setSlotModalOpen(false)}
        onProceed={handleSlotSelect}
      />
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
}

function InputField({ label, value }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
      />
    </div>
  );
}

interface CartItemProps {
  name: string;
  price: string;
  originalPrice: string;
}

function CartItem({ name, price, originalPrice }: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 mb-1">{name}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">{price}</span>
          <span className="text-xs text-slate-400 line-through">{originalPrice}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-orange-50 rounded px-1 py-0.5">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-6 h-6 flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded transition-colors text-lg"
        >
          −
        </button>
        <span className="w-6 text-center font-medium text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-6 h-6 flex items-center justify-center text-prime hover:bg-prime rounded transition-colors text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}