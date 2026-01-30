"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  qty: number;
};

type CartSidebarProps = {
  cartItems: CartItem[];
  increaseQty: (index: number) => void;
  decreaseQty: (index: number) => void;
  updateItemQty?: (itemId: string, change: number) => void;
};

export default function CartSidebar({
  cartItems,
  increaseQty,
  decreaseQty,
  updateItemQty,
}: CartSidebarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isFixed, setIsFixed] = useState(false);
  const [startTop, setStartTop] = useState(0);
  const [left, setLeft] = useState(0);

  // cart ka initial position ek baar calculate
  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setStartTop(rect.top + window.scrollY);
    setLeft(rect.left);
  }, []);

  // scroll handler
  useEffect(() => {
    const onScroll = () => {
      // 80px ka buffer (thoda scroll ke baad fix)
      if (window.scrollY > startTop - 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [startTop]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const router = useRouter();

  return (
    <aside
      ref={ref}
      style={
        isFixed
          ? {
              position: "fixed",
              top: 96, // navbar ke niche
              left: left,
              width: 320,
            }
          : {
              position: "relative",
              width: 320,
            }
      }
    >
      <h2 className="mb-4 text-2xl font-semibold text-black font-outfit">
        Cart
      </h2>

      <div className="w-full rounded-2xl border border-[#E6EFFA] bg-white p-4">
        {/* ITEMS */}
        <div className="space-y-4">
          {cartItems.map((item, i) => (
            <div key={item.id}>
              <div className="flex items-start justify-between">
                <div className="pr-2">
                  <p className="text-sm font-medium text-black">
                    {item.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      ₹{item.price}
                    </span>
                    <span className="text-xs line-through text-muted-foreground">
                      ₹{item.oldPrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateItemQty
                        ? updateItemQty(item.id, -1)
                        : decreaseQty(i)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime"
                  >
                    −
                  </button>

                  <span className="text-xs font-medium">
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      updateItemQty
                        ? updateItemQty(item.id, 1)
                        : increaseQty(i)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-prime"
                  >
                    +
                  </button>
                </div>
              </div>

              {i !== cartItems.length - 1 && (
                <div className="mt-4 h-px bg-[#E6EFFA]" />
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
            <span>₹{total}</span>
            <span>View Cart</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
