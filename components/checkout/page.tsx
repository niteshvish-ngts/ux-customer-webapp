"use client";

import Image from "next/image";
import Navbar from "../common/navbar/page";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="container py-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

          {/* LEFT – CHECKOUT */}
          <div className="space-y-6">
            {/* HEADER */}
            <div>
              <h1 className="text-xl font-semibold">Checkout</h1>
              <p className="mt-1 text-sm text-green-600">
                🎉 Saving ₹200 on this order
              </p>
            </div>

            {/* CONTACT INFO */}
            <div className="bg-white rounded-xl border border-[#E6EFFA] p-6 space-y-6">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                📇 Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" value="Jhon" />
                <Input label="Last Name" value="Doe" />
                <Input label="Phone" value="+91 9876543210" />
                <Input label="Email" value="johndoe@email.com" />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="text-xs font-medium mb-1 block">
                  📍 Service Address
                </label>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium">
                  Select Address
                </button>
              </div>

              {/* COLLAPSIBLE */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="border-t pt-3">⏱ Time Slot</div>
                <div className="border-t pt-3">💳 Payment Method</div>
              </div>
            </div>
          </div>

          {/* RIGHT – CART */}
          <div className="space-y-6">

            {/* ITEMS */}
            <div className="bg-white rounded-xl border border-[#E6EFFA] p-5">
              <h2 className="text-sm font-semibold mb-4">
                Items in Cart
              </h2>

              <CartItem
                title="Foam-jet service (2 ACs)"
                price={2000}
                oldPrice={2500}
              />

              <div className="my-4 h-px bg-[#E6EFFA]" />

              <CartItem
                title="Window AC installation"
                price={1240}
                oldPrice={2500}
              />
            </div>

            {/* COUPON */}
            <div className="bg-white rounded-xl border border-[#E6EFFA] p-5 space-y-3">
              <h2 className="text-sm font-semibold">
                Coupon Code
              </h2>

              <div className="flex gap-2">
                <input
                  placeholder="eg. UX10OFF"
                  className="flex-1 rounded-lg border px-3 py-2 text-sm"
                />
                <button className="px-4 rounded-lg bg-muted text-sm font-medium">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="bg-white rounded-xl border border-[#E6EFFA] p-5 space-y-3">
              <h2 className="text-sm font-semibold">
                Payment Summary
              </h2>

              <SummaryRow label="Cart Total" value="₹1,298" old="₹1,098" />
              <SummaryRow label="Taxes & Fee" value="₹25.12" />
              <SummaryRow
                label="Total Discount"
                value="-₹123.19"
                danger
              />

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Amount To Pay</span>
                <span>₹1000</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-medium mb-1 block">
        {label}
      </label>
      <input
        value={value}
        readOnly
        className="w-full rounded-lg bg-muted px-3 py-2 text-sm"
      />
    </div>
  );
}

function CartItem({
  title,
  price,
  oldPrice,
}: {
  title: string;
  price: number;
  oldPrice: number;
}) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium">{title} X1</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold">₹{price}</span>
          <span className="text-xs line-through text-muted-foreground">
            ₹{oldPrice}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <QtyBtn>-</QtyBtn>
        <span className="text-sm">1</span>
        <QtyBtn>+</QtyBtn>
      </div>
    </div>
  );
}

function QtyBtn({ children }: { children: string }) {
  return (
    <button className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-base">
      {children}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  old,
  danger,
}: {
  label: string;
  value: string;
  old?: string;
  danger?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span
        className={
          danger ? "text-red-500 font-medium" : "text-black"
        }
      >
        {old && (
          <span className="mr-2 text-xs line-through text-muted-foreground">
            {old}
          </span>
        )}
        {value}
      </span>
    </div>
  );
}