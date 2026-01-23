// components/service/cart.tsx
"use client";
import React from "react";

export default function CartSidebar() {
  const cartItems = [
    { name: "Foam-jet service (2 ACs) X1", price: 2000, oldPrice: 2500 },
    { name: "Window AC installation X1", price: 1240, oldPrice: 2500 },
  ];

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <aside className="sticky top-6">
  <div className="bg-white rounded-2xl border border-[#E6EFFA] p-4 w-full max-w-[320px]">
    <h2 className="text-sm font-semibold text-black mb-4">Cart</h2>

    <div className="space-y-4">
      {cartItems.map((item, i) => (
        <div key={i} className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium leading-snug">
              {item.name}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold">₹{item.price}</span>
              <span className="text-[11px] line-through text-muted-foreground">
                ₹{item.oldPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-orange-100 text-orange-600 text-sm">
              −
            </button>
            <span className="text-xs font-medium">1</span>
            <button className="w-6 h-6 rounded bg-orange-100 text-orange-600 text-sm">
              +
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-[#E6EFFA] mt-4 pt-3 flex justify-between text-sm font-semibold">
      <span>Total</span>
      <span>₹{total}</span>
    </div>

    <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-semibold">
      View Cart
    </button>
  </div>
</aside>

  );
}
