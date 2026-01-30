// app/service/page.tsx
"use client";

import ServiceCard from "@/components/service/service-card";
import CartSidebar from "@/components/service/cart";
import Navbar from "../common/navbar/page";
import Image from "next/image";
import { Booking, Services } from "../shared/images/image";
import Router from "next/router";
import { useState, useRef, useEffect } from "react";
import Footer from "../common/footer/page";

type CartItem = {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  qty: number;
};

export default function ServicePage() {
  const maxxSaverRef = useRef<HTMLDivElement>(null);
const serviceRef = useRef<HTMLDivElement>(null);
const repairRef = useRef<HTMLDivElement>(null);
const installationRef = useRef<HTMLDivElement>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "foam-jet-2-acs-2000",
      name: "Foam-jet service (2 ACs) X1",
      price: 2000,
      oldPrice: 2500,
      qty: 1,
    },
    {
      id: "window-ac-installation-1240",
      name: "Window AC installation X1",
      price: 1240,
      oldPrice: 2500,
      qty: 1,
    },
  ]);

  const getItemId = (title: string, price: number) => {
    return `${title.toLowerCase().replace(/\s+/g, "-")}-${price}`;
  };

  const addToCart = (
    title: string,
    discountedPrice: number,
    originalPrice?: number
  ) => {
    const itemId = getItemId(title, discountedPrice);
    const itemName = `${title} X1`;
    
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          name: itemName,
          price: discountedPrice,
          oldPrice: originalPrice || discountedPrice,
          qty: 1,
        };
        return [...prev, newItem];
      }
    });
  };

  const updateItemQty = (itemId: string, change: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === itemId);
      if (!item) return prev;

      const newQty = item.qty + change;
      if (newQty <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }

      return prev.map((item) =>
        item.id === itemId ? { ...item, qty: newQty } : item
      );
    });
  };

  const increaseQty = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (index: number) => {
    setCartItems((prev) => {
      const item = prev[index];
      if (item.qty <= 1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const getCartItemQty = (title: string, price: number) => {
    const itemId = getItemId(title, price);
    const item = cartItems.find((item) => item.id === itemId);
    return item?.qty || 0;
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        // When header section is scrolled past, make cart sticky
        setIsSticky(rect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className=" bg-background " ref={headerRef}>
        <div className="container flex items-center justify-between py-5">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl font-semibold text-dark leading-tight">
              AC Service & Repair
            </h1>

            {/* STARS + REVIEWS */}
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={Services.serviceImg2}
                alt="5 star rating"
                width={80}
                height={20}
                className="object-contain"
              />

              <span className="text-xs text-dark font-lato">
                2M reviews (11.9M Bookings)
              </span>
            </div>
          </div>

          {/* RIGHT FILTERS */}
          <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
            <button
  onClick={() =>
    maxxSaverRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted"
>
  Maxx Saver
</button>

<button
  onClick={() =>
    serviceRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted"
>
  Service
</button>

<button
  onClick={() =>
    repairRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted"
>
  Repair
</button>

<button
  onClick={() =>
    installationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted"
>
  Installation
</button>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SERVICES */}
        <div className="lg:col-span-2 space-y-10">
          <section  ref={maxxSaverRef}>
            <h2 className="text-2xl font-medium mb-4 font-outfit">
              Maxx Saver Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs
                Indoor unit deep cleaning with foam & jet spray"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet services (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet services (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
              
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (11.9M)"
                account={2}
                time="1 hr 30 mins"
                pricePerUnit={540}
                originalPrice={1240}
                discountedPrice={1240}
                description="Applicable for both window and split ACs"
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 1240)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
                isSaver
              />
            </div>
          </section>
          <hr className="my-12 border-[#E6EFFA]" />

          <section ref={serviceRef} className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">Service</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Foam-jet service (2 ACs)"
                rating="4.77 (1.9M reviews)"
                account={2}
                time="1 hr 30 mins worktime"
                pricePerUnit={540}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
    Indoor unit deep cleaning with foam & jet spray`}
                onAdd={() => addToCart("Foam-jet service (2 ACs)", 1240, 2500)}
                onIncrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Foam-jet service (2 ACs)", 1240), -1)}
                cartQty={getCartItemQty("Foam-jet service (2 ACs)", 1240)}
              />
            </div>
          </section>
          <section  ref={repairRef} className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">
              Repair & gas refill
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="AC less/no cooling repair"
                rating="4.4 (437K reviews)"
                time="2 hrs 30 mins worktime"
                pricePerUnit={540}
                account={2}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
    Indoor unit regular checkup included`}
                onAdd={() => addToCart("AC less/no cooling repair", 1240, 2500)}
                onIncrease={() => updateItemQty(getItemId("AC less/no cooling repair", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("AC less/no cooling repair", 1240), -1)}
                cartQty={getCartItemQty("AC less/no cooling repair", 1240)}
              />

              <ServiceCard
                title="AC noise/smell repair"
                rating="4.4 (437K reviews)"
                account={2}
                time="60 mins worktime"
                pricePerUnit={499}
                originalPrice={2500}
                discountedPrice={499}
                description={`Applicable for both window or split ACs
    Indoor unit regular checkup included`}
                onAdd={() => addToCart("AC noise/smell repair", 499, 2500)}
                onIncrease={() => updateItemQty(getItemId("AC noise/smell repair", 499), 1)}
                onDecrease={() => updateItemQty(getItemId("AC noise/smell repair", 499), -1)}
                cartQty={getCartItemQty("AC noise/smell repair", 499)}
              />

              <ServiceCard
                title="Gas refill & check-up"
                rating="4.79 (118K reviews)"
                account={2}
                time="2 hrs 30 mins worktime"
                pricePerUnit={540}
                originalPrice={2500}
                discountedPrice={1240}
                description={`Applicable for both window or split ACs
    Indoor unit regular checkup included`}
                onAdd={() => addToCart("Gas refill & check-up", 1240, 2500)}
                onIncrease={() => updateItemQty(getItemId("Gas refill & check-up", 1240), 1)}
                onDecrease={() => updateItemQty(getItemId("Gas refill & check-up", 1240), -1)}
                cartQty={getCartItemQty("Gas refill & check-up", 1240)}
              />

              <ServiceCard
                title="AC water leakage repair"
                rating="4.79 (118K reviews)"
                time="60 mins worktime"
                account={2}
                pricePerUnit={599}
                originalPrice={2500}
                discountedPrice={599}
                description={`Applicable for both window or split ACs
      Indoor unit regular checkup included`}
                onAdd={() => addToCart("AC water leakage repair", 599, 2500)}
                onIncrease={() => updateItemQty(getItemId("AC water leakage repair", 599), 1)}
                onDecrease={() => updateItemQty(getItemId("AC water leakage repair", 599), -1)}
                cartQty={getCartItemQty("AC water leakage repair", 599)}
              />
            </div>
          </section>
          {/* installetion */}
          <section  ref={installationRef} className="space-y-4">
            <h2 className="text-2xl font-medium font-outfit">
              Installation/uninstallation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Split AC installation"
                rating="4.70 (112K reviews)"
                time="2 hrs worktime"
                pricePerUnit={1499}
                account={2}
                originalPrice={2500}
                discountedPrice={1499}
                description={`Applicable for both window or split ACs
        Indoor unit regular checkup included`}
                onAdd={() => addToCart("Split AC installation", 1499, 2500)}
                onIncrease={() => updateItemQty(getItemId("Split AC installation", 1499), 1)}
                onDecrease={() => updateItemQty(getItemId("Split AC installation", 1499), -1)}
                cartQty={getCartItemQty("Split AC installation", 1499)}
              />

              <ServiceCard
                title="Window AC installation"
                rating="4.4 (437K reviews)"
                time="60 mins worktime"
                pricePerUnit={1099}
                account={2}
                originalPrice={2500}
                discountedPrice={1099}
                description={`Applicable for both window or split ACs
        Indoor unit regular checkup included`}
                onAdd={() => addToCart("Window AC installation", 1099, 2500)}
                onIncrease={() => updateItemQty(getItemId("Window AC installation", 1099), 1)}
                onDecrease={() => updateItemQty(getItemId("Window AC installation", 1099), -1)}
                cartQty={getCartItemQty("Window AC installation", 1099)}
              />
              <ServiceCard
                title="Window AC installation"
                rating="4.4 (437K reviews)"
                time="60 mins worktime"
                pricePerUnit={1099}
                account={2}
                originalPrice={2500}
                discountedPrice={1099}
                description={`Applicable for both window or split ACs
        Indoor unit regular checkup included`}
                onAdd={() => addToCart("Window AC installation", 1099, 2500)}
                onIncrease={() => updateItemQty(getItemId("Window AC installation", 1099), 1)}
                onDecrease={() => updateItemQty(getItemId("Window AC installation", 1099), -1)}
                cartQty={getCartItemQty("Window AC installation", 1099)}
              />
              
            </div>
          </section>
          
      </div>

        {/* CART */}
 
        <CartSidebar
          cartItems={cartItems}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          updateItemQty={updateItemQty}
        />
       
        
      </div>
      <Footer/>
  </>
  );
}
