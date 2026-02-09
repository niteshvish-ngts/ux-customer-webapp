"use client";
import CartPage from "@/components/cart/fillcart";
import EmptyCartPage from "@/components/cart/page";
import Navbar3 from "@/components/common/navbar3/page";
import React from "react";

function CartRoot() {
  // 👉 yahan real cart data aayega (state / context / redux / api)
  const cartItems: any[] = []; // empty cart example

  return (
    <>
    <Navbar3 /> {/* Common navbar for cart page */}
      {cartItems.length === 1 ? (
        <EmptyCartPage />
      ) : (
        <CartPage />
      )}
    </>
  );
}

export default CartRoot;