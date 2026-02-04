"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CreditCard, Check, Pencil } from 'lucide-react';
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
  const [selectedAddress, setSelectedAddress] = useState<{title: string, address: string} | null>(null);
  const [contactFormOpen, setContactFormOpen] = useState<boolean>(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{day: string, date: number, time: string} | null>(null);
  
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactError, setContactError] = useState<string>("");
  
  // Cart items with quantities
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Foam-Jet service (2 AC's) X 1", price: 2000, originalPrice: 3200, quantity: 1 },
    { id: 2, name: "Window AC Installation X 1", price: 1240, originalPrice: 2400, quantity: 1 },
  ]);

  // Calculate totals
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalCartTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const discount = originalCartTotal - cartTotal;
  const taxes = 25.12;
  const otherCharges = 0;
  const totalPayable = cartTotal + taxes + otherCharges;

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const submitContactInfo = () => {
    const firstName = contactInfo.firstName.trim();
    const lastName = contactInfo.lastName.trim();
    const phone = contactInfo.phone.trim();
    const email = contactInfo.email.trim();

    if (!firstName || !lastName || !phone || !email) {
      setContactError("Please fill all contact details.");
      return false;
    }

    setContactError("");
    setContactSubmitted(true);
    setContactFormOpen(false);
    return true;
  };

  const handleAddressSelect = (title?: string, address?: string) => {
    setAddressSelected(true);
    if (title && address) {
      setSelectedAddress({ title, address });
    } else {
      setSelectedAddress({ title: "Home", address: "145, Sector B, Nagin Nagar, Indore, MP 452010, India" });
    }
    setAddressModalOpen(false);
  };

  const handleSlotSelect = (day?: string, date?: number, time?: string) => {
    setSlotSelected(true);
    if (day && date && time) {
      setSelectedTimeSlot({ day, date, time });
    } else {
      setSelectedTimeSlot({ day: "Sat", date: 20, time: "08:00 AM" });
    }
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
              {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg> */}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                N
              </div>
              <span className="text-sm font-medium">Nitesh </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 pb-36 lg:pb-8">
        {/* Checkout Heading and Savings Banner - Top (Both Mobile & Desktop) */}
        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-4">Checkout</h2>
          {/* Savings Banner */}
          <div className="text-sm flex items-center gap-1 font-lato">
            <Image src={Checkout.checkoutImg1} alt="" className="w-6 h-6" />
            Saving ₹200 on this order
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6 order-2 lg:order-1">
            
            {/* Mobile: Cart Summary Section - First */}
            <div className="lg:hidden">
              <h2 className="font-semibold text-slate-900 mb-4">Cart Summary</h2>
              <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Cart Total</span>
                    <span className="font-medium text-slate-900">₹ {cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & Fee</span>
                    <span className="text-slate-900">₹ {taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Discount</span>
                    <span className="text-red-600 font-medium">(-) ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Other Charges</span>
                    <span className="text-slate-900">₹{otherCharges}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Shipping charges to be calculated on Checkout</p>
                </div>
              </div>
            </div>

            {/* Mobile: Total Payable Section - After Cart Summary */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-xl text-slate-900">Total Payable</h2>
                <span className="text-2xl font-bold text-slate-900">₹ {totalPayable.toLocaleString('en-IN')} /-</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <span>Inclusive of all taxes</span>
                <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600">i</span>
                </div>
              </div>
            </div>

            {/* Mobile: Summary Cards View */}
            <div className="lg:hidden space-y-3">
              {/* Contact Information Card - Mobile Summary */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image src={Checkout.checkoutImg4} alt="" className="w-5 h-5" />
                    <span className="text-sm font-semibold text-slate-900">Contact Information</span>
                  </div>
                  <button
                    onClick={() => setContactFormOpen(!contactFormOpen)}
                    className="p-1"
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </button>
                </div>
                {/* Contact Form Fields - Mobile Expandable */}
                {contactFormOpen && (
                  <>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <InputField
                        label="First Name"
                        value={contactInfo.firstName}
                        onChange={(v) =>
                          setContactInfo((p) => ({ ...p, firstName: v }))
                        }
                      />
                      <InputField
                        label="Last Name"
                        value={contactInfo.lastName}
                        onChange={(v) =>
                          setContactInfo((p) => ({ ...p, lastName: v }))
                        }
                      />
                      <InputField
                        label="Phone"
                        value={contactInfo.phone}
                        onChange={(v) => setContactInfo((p) => ({ ...p, phone: v }))}
                      />
                      <InputField
                        label="Email"
                        value={contactInfo.email}
                        onChange={(v) => setContactInfo((p) => ({ ...p, email: v }))}
                      />
                    </div>
                    {contactError && (
                      <p className="mt-3 text-xs text-red-600">{contactError}</p>
                    )}
                    {contactSubmitted && !contactError && (
                      <p className="mt-3 text-xs text-green-600">
                        Contact details saved.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => submitContactInfo()}
                      className="mt-4 w-full bg-prime hover:bg-prime text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Save Details
                    </button>
                  </>
                )}
              </div>

              {/* Address Card - Mobile Summary */}
              {addressSelected ? (
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Image src={Checkout.checkoutImg5} alt="" className="w-5 h-5 shrink-0" />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="text-sm font-semibold text-slate-900">{selectedAddress?.title} - </span>
                      <span className="text-sm text-slate-600 truncate block">{selectedAddress?.address}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAddressModalOpen(true)}
                    className="p-1 shrink-0"
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={Checkout.checkoutImg5} alt="" className="w-5 h-5" />
                    <span className="text-sm font-semibold text-slate-900">Service Address</span>
                  </div>
                  <button
                    onClick={() => setAddressModalOpen(true)}
                    className="p-1"
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </button>
                </div>
              )}

              {/* Time Slot Card - Mobile Summary */}
              {slotSelected ? (
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={Checkout.checkoutImg3} alt="" className="w-5 h-5" />
                    <span className="text-sm font-semibold text-slate-900">
                      Time Slot - {selectedTimeSlot?.day}, Dec {selectedTimeSlot?.date} - {selectedTimeSlot?.time}
                    </span>
                  </div>
                  <button
                    onClick={() => setSlotModalOpen(true)}
                    className="p-1"
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={Checkout.checkoutImg3} alt="" className="w-5 h-5" />
                    <span className="text-sm font-semibold text-slate-900">Time Slot</span>
                  </div>
                  <button
                    onClick={() => addressSelected && setSlotModalOpen(true)}
                    className="p-1"
                    disabled={!addressSelected}
                  >
                    <Pencil className="w-4 h-4 text-black" />
                  </button>
                </div>
              )}
            </div>

            {/* Desktop: Contact Information Card - Hidden on mobile */}
            <div className="hidden lg:block bg-white rounded-lg border border-[#E6EFFA] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                <Image src={Checkout.checkoutImg4} alt="" className="w-5 h-5" />
                <h2 className="text-base font-semibold text-black">Contact Information</h2>
                </div>
                {/* Desktop: Save button */}
                <button
                  type="button"
                  onClick={() => submitContactInfo()}
                  className="hidden lg:inline text-xs text-prime font-medium underline"
                >
                  Save
                </button>
                {/* Edit button - only on mobile */}
                <button
                  onClick={() => setContactFormOpen(!contactFormOpen)}
                  className="lg:hidden p-1 hover:bg-slate-100 rounded transition-colors"
                >
                  <Pencil className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Contact Form Fields - Desktop: always visible, Mobile: toggle */}
              <div className={`${contactFormOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InputField
                  label="First Name"
                  value={contactInfo.firstName}
                  onChange={(v) => setContactInfo((p) => ({ ...p, firstName: v }))}
                />
                <InputField
                  label="Last Name"
                  value={contactInfo.lastName}
                  onChange={(v) => setContactInfo((p) => ({ ...p, lastName: v }))}
                />
                <InputField
                  label="Phone"
                  value={contactInfo.phone}
                  onChange={(v) => setContactInfo((p) => ({ ...p, phone: v }))}
                />
                <InputField
                  label="Email"
                  value={contactInfo.email}
                  onChange={(v) => setContactInfo((p) => ({ ...p, email: v }))}
                />
              </div>
              </div>

              {/* Dotted divider - Mobile only when form is open or desktop always */}
              <div className={`border-t border-dashed border-gray-300 mb-6 ${contactFormOpen ? 'block' : 'hidden lg:block'}`}></div>

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
                  <>
                    {/* Desktop: Original format */}
                    <div className="hidden lg:flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-black">Address Selected</p>
                    </div>
                    <button
                      onClick={() => setAddressModalOpen(true)}
                      className="text-xs text-green-700 hover:text-green-900 font-medium underline"
                    >
                      Edit
                    </button>
                  </div>
                    {/* Mobile: New format with address display */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Image src={Checkout.checkoutImg5} alt="" className="w-5 h-5 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1 break-words">
                            <span className="text-sm font-semibold text-black">{selectedAddress?.title} - </span>
                            <span className="text-sm text-gray-500 break-words">{selectedAddress?.address}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setAddressModalOpen(true)}
                          className="p-1 hover:bg-slate-100 rounded transition-colors shrink-0"
                        >
                          <Pencil className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </div>
                  </>
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
                    <>
                      {/* Desktop: Show button, Mobile: Hidden (shown as sticky bottom button) */}
                    <button
                      onClick={() => setSlotModalOpen(true)}
                        className="hidden lg:block w-full bg-prime hover:bg-prime text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Select Time Slot
                    </button>
                      {/* Mobile: Hidden - shown as sticky bottom button instead */}
                      <div className="lg:hidden w-full py-2.5 rounded-lg bg-slate-50 text-slate-400 text-sm font-medium text-center border border-slate-200">
                        Select Time Slot
                      </div>
                    </>
                  ) : (
                    <div className="w-full py-2.5 rounded-lg bg-slate-50 text-slate-400 text-sm font-medium text-center border border-slate-200">
                      Select Time Slot
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-green">Time Slot Selected</p>
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

            {/* Cancellation Policy - Desktop only */}
            {slotSelected && (
              <div className="hidden lg:block bg-white rounded-lg border border-[#E6EFFA] p-6">
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

          {/* RIGHT COLUMN - Mobile: Show first, Desktop: Show on right */}
          <div className="space-y-6 order-1 lg:order-2 lg:-mt-24">
                          <h2 className="hidden lg:block font-semibold text-slate-900 mb-2">Items in Cart</h2>

            {/* Items in Cart */}
            <div className="bg-white rounded-lg border border-[#E6EFFA] p-6">
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    quantity={item.quantity}
                    onQuantityChange={(qty) => updateCartItemQuantity(item.id, qty)}
                  />
                ))}
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

            {/* Payment Summary - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block bg-white rounded-lg border border-[#E6EFFA] p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Payment Summary</h2>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Total</span>
                  <div className="text-right">
                    <span className="line-through text-slate-400 text-xs mr-1">₹{originalCartTotal.toLocaleString('en-IN')}</span>
                    <span className="font-medium text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Fee</span>
                  <span className="text-slate-900">₹ {taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Discount</span>
                  <span className="text-red-600 font-medium">(-) ₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Amount To Pay</span>
                  <span className="text-xl font-bold text-slate-900">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button for Mobile - Sequence: Select Address -> Select Time Slot -> Proceed To Pay */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-4">
        {contactFormOpen ? (
          <button
            onClick={() => submitContactInfo()}
            className="w-full bg-prime hover:bg-prime text-white py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Save Details
          </button>
        ) : !addressSelected ? (
          <button
            onClick={() => setAddressModalOpen(true)}
            className="w-full bg-prime hover:bg-prime text-white py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Select Address
          </button>
        ) : !slotSelected ? (
          <button
            onClick={() => setSlotModalOpen(true)}
            className="w-full bg-prime hover:bg-prime text-white py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Select Time Slot
          </button>
        ) : (
          <button
            onClick={() => {}}
            className="w-full bg-prime hover:bg-prime text-white py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Proceed To Pay
          </button>
        )}
      </div>

      {/* User's own modals */}
      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onProceed={handleAddressSelect}
        onAddressSelect={handleAddressSelect}
      />

      <SlotModal
        open={slotModalOpen}
        onClose={() => setSlotModalOpen(false)}
        onProceed={handleSlotSelect}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!onChange}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
      />
    </div>
  );
}

interface CartItemProps {
  name: string;
  price: number;
  originalPrice: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

function CartItem({ name, price, originalPrice, quantity: initialQuantity = 1, onQuantityChange }: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Update local state when prop changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    const newQty = Math.max(1, quantity - 1);
    setQuantity(newQty);
    if (onQuantityChange) onQuantityChange(newQty);
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (onQuantityChange) onQuantityChange(newQty);
  };

  const totalPrice = price * quantity;
  const totalOriginalPrice = originalPrice * quantity;

  return (
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 mb-1">{name}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
          <span className="text-xs text-slate-400 line-through">₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-orange-50 rounded px-1 py-0.5">
        <button
          onClick={handleDecrease}
          className="w-6 h-6 flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded transition-colors text-lg"
        >
          −
        </button>
        <span className="w-6 text-center font-medium text-sm">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-6 h-6 flex items-center justify-center text-prime hover:bg-prime rounded transition-colors text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}