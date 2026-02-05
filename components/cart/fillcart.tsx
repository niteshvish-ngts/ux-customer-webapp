"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking, Cart } from "../shared/images/image";
import { useState } from "react";
import BottomNavbar from "../common/bottom-navbar/page";

export default function CartPage() {
  const router = useRouter();

  //  Cart state (single source of truth)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Window AC installation",
      category: "AC service & repair",
      code: "UXAC1241",
      price: 2000,
      oldPrice: 2500,
      discount: "20% OFF",
      image: Cart.cartImg4,
      qty: 1,
    },
    {
      id: 2,
      title: "Foam-jet service (2 ACs)",
      category: "AC service & repair",
      code: "UXAC1242",
      price: 2000,
      oldPrice: 2500,
      discount: "20% OFF",
      image: Cart.cartImg3,
      badge: "4 ACs PACK",
      qty: 1,
    },
  ]);

  // ✅ Quantity update handler
  const updateQty = (id: number, type: "inc" | "dec") => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                type === "inc"
                  ? item.qty + 1
                  : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  // ✅ Cart total
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  // ✅ Total discount
const totalDiscount = cartItems.reduce(
  (sum, item) =>
    sum + (item.oldPrice - item.price) * item.qty,
  0
);

// ✅ Final payable amount
const totalPayable = cartTotal - totalDiscount;

  return (
    <div className="min-h-screen bg-white">
      {/* TOP BAR */}
      <div className="border-b">
        <div className="container h-14 flex items-center justify-between">
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
            My Cart
          </button>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border flex items-center justify-center">
              🛒
            </button>
            <div className="flex items-center gap-2">
              <Image
                src={Cart.cartImg1}
                alt="user"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">
                Nitesh Vishwakarma
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-8 pb-24 lg:pb-8 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
        {/* LEFT – CART ITEMS */}
        <div>
          <h2 className="text-xl font-medium font-outfit mb-4">
            Your Service Cart
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onIncrease={() => updateQty(item.id, "inc")}
                onDecrease={() => updateQty(item.id, "dec")}
              />
            ))}
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium font-outfit">
            Cart Summary
          </h3>

          <div className="rounded-xl border border-[#E6EFFA] bg-white p-5 space-y-3">
            <SummaryRow
              label="Cart Total"
              value={`₹ ${cartTotal.toLocaleString()}`}
            />
            <SummaryRow
  label="Total Discount"
  value={`- ₹${totalDiscount.toLocaleString()}`}
  danger
/>
            <SummaryRow label="Other Charges" value="₹0" />

            <p className="text-xs text-muted-foreground font-body">
              Shipping charges to be calculated on Checkout
            </p>
          </div>

          {/* COUPON */}
          <div className="rounded-xl bg-white p-5 space-y-2">
            <h3 className="text-xl font-medium font-body">
              Coupon Code
            </h3>
            <div className="flex gap-2">
              <input
                placeholder="eg. UX10OFF"
                className="flex-1 rounded-lg border px-3 py-2 text-sm font-regular outline-none focus:border-prime"
              />
              <button className="px-4 rounded-lg bg-dark-50 text-sm font-medium text-white">
                Apply Coupon
              </button>
            </div>
          </div>

          {/* TOTAL */}
          <div className="space-y-3">
            <hr className="border-t border-dashed border-border my-6" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">
                  Total Payable
                </p>
                <p className="text-xs text-muted-foreground text-lato">
                  Inclusive of all taxes
                </p>
              </div>

              <span className="text-2xl font-semibold">
  ₹ {totalPayable.toLocaleString()} /-
</span> 
            </div>

            <hr className="border-t border-dashed border-border my-6" />

            <button
              onClick={() => router.push("/checkout")}
              className="w-full rounded-md bg-prime hover:bg-prime text-white py-3 text-sm font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function CartItem({
  title,
  category,
  code,
  price,
  oldPrice,
  discount,
  image,
  badge,
  qty,
  onIncrease,
  onDecrease,
}: any) {
  return (
    <div className="rounded-xl border border-[#E6EFFA] bg-white p-4 flex gap-4">
      {/* IMAGE */}
      <div className="relative w-33 h-33 rounded-lg overflow-hidden border">
        {badge && (
          <span className="absolute top-1 left-1 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <p className="text-lg font-medium font-outfit">
          {title} X{qty}
        </p>
        <p className="text-sm text-dark">{category}</p>
        <p className="text-[10px] text-black mt-1 font-lato">
          PRODUCT CODE: {code}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={onDecrease}
            disabled={qty === 1}
            className="w-8 h-8 rounded bg-orange-50 text-orange-600 disabled:opacity-40"
          >
            −
          </button>

          <span className="text-sm font-medium">{qty}</span>

          <button
            onClick={onIncrease}
            className="w-8 h-8 rounded bg-orange-50 text-orange-600"
          >
            +
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right space-y-1">
        <p className="text-base font-semibold font-lato">
          ₹{price * qty}
        </p>
        <p className="text-sm line-through text-muted-foreground font-lato">
          ₹{oldPrice * qty}
        </p>
        <p className="text-xs text-[#3CBE81] font-semibold">
          {discount}
        </p>
        <button className="mt-2">
          <Image
            src={Cart.cartImg2}
            alt="Remove item"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className={danger ? "text-red-500" : ""}>{value}</span>
    </div>
  );
}