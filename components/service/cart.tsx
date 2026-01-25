// components/service/cart.tsx
"use client";


import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function CartSidebar() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  useEffect(() => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.top,
      left: rect.left,
    });
  }
}, []);
  const [cartItems, setCartItems] = useState([
    {
      name: "Foam-jet service (2 ACs) X1",
      price: 2000,
      oldPrice: 2500,
      qty: 1,
    },
    {
      name: "Window AC installation X1",
      price: 1240,
      oldPrice: 2500,
      qty: 1,
    },
  ]);

  const increaseQty = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
const router = useRouter();
  return (
  <aside
  ref={ref}
  style={
    pos
      ? {
          position: "fixed",
          top: pos.top,
          left: pos.left,
          width: 320,
        }
      : undefined
  }
>
      <h2 className="mb-4 text-2xl font-semibold text-black font-outfit">
        Cart
      </h2>

      <div className="w-full max-w-[320px] rounded-2xl border border-[#E6EFFA] bg-white p-4">
        {/* ITEMS */}
        <div className="space-y-4">
          {cartItems.map((item, i) => (
            <div key={i}>
              <div className="flex items-start justify-between">
                {/* LEFT */}
                <div className="pr-2">
                  <p className="text-sm font-medium leading-snug text-black">
                    {item.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-black font-lato">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-muted-foreground line-through font-lato">
                      ₹{item.oldPrice}
                    </span>
                  </div>
                </div>

                {/* RIGHT QTY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(i)}
                    disabled={item.qty === 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime text-base disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="text-xs font-medium">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(i)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* DIVIDER */}
              {i !== cartItems.length - 1 && (
                <div className="mt-4 h-px w-full bg-[#E6EFFA]" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5">
          <button
  onClick={() => router.push("/cart")}
  className="flex w-full items-center justify-between rounded-xl bg-prime px-5 py-3 text-white font-semibold"
>
  <span className="text-base">₹{total}</span>
  <span className="text-sm">View Cart</span>
</button>
        </div>
      </div>
    </aside>
  );
}