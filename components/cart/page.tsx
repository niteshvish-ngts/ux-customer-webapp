"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking, Cart } from "../shared/images/image";
import BottomNavbar from "../common/bottom-navbar/page";

export default function EmptyCartPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* TOP BAR */}
      <div className="border-b">
        <div className="container h-14 flex items-center">
          
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm  text-black"
          >
            <Image src={Booking.bookingImg3} alt="Back" width={16} height={16} />
           My Cart
          </button>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-56px)] px-4 pb-24">
        {/* ICON */}
        <div className="relative mb-7">
          <div className="w-22 h-22 rounded-full bg-orange-50 flex items-center justify-center">
            <Image
              src={Cart.cartImg1} 
              alt="Empty cart"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-black mb-3">
          Your cart is empty!
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm text-muted-foreground max-w-[320px] mb-8">
          Looks like you haven’t added anything to your cart yet.
          Please add some services.
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className="px-28 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90"
        >
          Back Home
        </button>
      </div>
      <BottomNavbar />
    </div>
  );
}