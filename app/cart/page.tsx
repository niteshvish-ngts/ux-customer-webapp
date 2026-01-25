import CartPage from "@/components/cart/fillcart";
import EmptyCartPage from "@/components/cart/page";
import React from "react";

function CartRoot() {
  // 👉 yahan real cart data aayega (state / context / redux / api)
  const cartItems: any[] = []; // empty cart example

  return (
    <>
      {cartItems.length === 1 ? (
        <EmptyCartPage />
      ) : (
        <CartPage />
      )}
    </>
  );
}

export default CartRoot;