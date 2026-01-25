"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cart } from "../shared/images/image";

export default function CartPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* TOP BAR */}
      <div className="border-b">
        <div className="container h-14 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-black"
          >
            ← My Cart
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
              <span className="text-sm font-medium">Mihir Verma</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-8 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
        {/* LEFT – CART ITEMS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Your Service Cart
          </h2>

          <div className="space-y-4">
            <CartItem
              title="Window AC installation"
              category="AC service & repair"
              code="UXAC1241"
              price={2000}
              oldPrice={2500}
              discount="20% OFF"
              image="/ac-install.jpg"
            />

            <CartItem
              title="Foam-jet service (2 ACs)"
              category="AC service & repair"
              code="UXAC1242"
              price={2000}
              oldPrice={2500}
              discount="20% OFF"
              image="/ac-pack.jpg"
              badge="4 ACs PACK"
            />
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="space-y-4">
          {/* SUMMARY */}
          <div className="rounded-xl border border-[#E6EFFA] bg-white p-5 space-y-3">
            <h3 className="text-sm font-semibold">
              Cart Summary
            </h3>

            <SummaryRow label="Cart Total" value="₹ 229,985" />
            <SummaryRow
              label="Total Discount"
              value="- ₹22,999"
              danger
            />
            <SummaryRow label="Other Charges" value="₹0" />

            <p className="text-xs text-muted-foreground">
              Shipping charges to be calculated on Checkout
            </p>
          </div>

          {/* COUPON */}
          <div className="rounded-xl border border-[#E6EFFA] bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold">
              Coupon Code
            </h3>

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

          {/* TOTAL */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">
                  Total Payable
                </p>
                <p className="text-xs text-muted-foreground">
                  Inclusive of all taxes
                </p>
              </div>

              <span className="text-lg font-semibold">
                ₹ 354,487 /-
              </span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white py-3 text-sm font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
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
}: any) {
  return (
    <div className="rounded-xl border border-[#E6EFFA] bg-white p-4 flex gap-4">
      {/* IMAGE */}
      <div className="relative w-24 h-20 rounded-lg overflow-hidden border">
        {badge && (
          <span className="absolute top-1 left-1 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <p className="text-sm font-medium">
          {title} X1
        </p>
        <p className="text-xs text-muted-foreground">
          {category}
        </p>
        <p className="text-[11px] text-muted-foreground">
          PRODUCT CODE: {code}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button className="w-7 h-7 rounded bg-orange-50 text-orange-600">
            −
          </button>
          <span className="text-sm">1</span>
          <button className="w-7 h-7 rounded bg-orange-50 text-orange-600">
            +
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right space-y-1">
        <p className="text-sm font-semibold">
          ₹{price}
        </p>
        <p className="text-xs line-through text-muted-foreground">
          ₹{oldPrice}
        </p>
        <p className="text-xs text-green-600 font-medium">
          {discount}
        </p>

        <button className="text-red-500 text-sm mt-2">
          🗑
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
      <span className={danger ? "text-red-500" : ""}>
        {value}
      </span>
    </div>
  );
}