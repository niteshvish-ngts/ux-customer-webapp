// app/service/page.tsx
"use client";

import ServiceCard from "@/components/service/service-card";
import CartSidebar from "@/components/service/cart";
import Image from "next/image";
import { Services } from "../shared/images/image";
import { useState, useRef, useEffect } from "react";
import Footer from "../common/footer/page";
import BottomNavbar from "../common/bottom-navbar/page";
import { useRouter } from "next/navigation";
import Navbar2 from "../common/navbar2/page";

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
  const [activeTab, setActiveTab] = useState("Maxx Saver");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate cart totals
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.oldPrice * item.qty,
    0
  );

  const savings = originalTotal - total;

  return (
    <>
      <Navbar2 />
      <div className=" bg-background " ref={headerRef}>
        <div className="container flex flex-col lg:flex-row lg:items-center lg:justify-between py-5 gap-4">
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

          {/* RIGHT FILTERS - Desktop: Right side, Mobile: Below title */}
          <div className="flex items-center gap-1 rounded-lg border bg-background p-1 w-full lg:w-auto">
            <button
              onClick={() => {
                setActiveTab("Maxx Saver");
                maxxSaverRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted flex-1 lg:flex-none ${
                activeTab === "Maxx Saver" ? "bg-muted" : ""
              }`}
            >
              Maxx Saver
            </button>

            <button
              onClick={() => {
                setActiveTab("Service");
                serviceRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted flex-1 lg:flex-none ${
                activeTab === "Service" ? "bg-muted" : ""
              }`}
            >
              Service
            </button>

            <button
              onClick={() => {
                setActiveTab("Repair");
                repairRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted flex-1 lg:flex-none ${
                activeTab === "Repair" ? "bg-muted" : ""
              }`}
            >
              Repair
            </button>

            <button
              onClick={() => {
                setActiveTab("Installation");
                installationRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold text-dark hover:bg-muted flex-1 lg:flex-none ${
                activeTab === "Installation" ? "bg-muted" : ""
              }`}
            >
              Installation
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-8 pb-24 lg:pb-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        {/* SERVICES */}
        <div className="min-w-0 space-y-10">
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

        {/* CART - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <CartSidebar
            cartItems={cartItems}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            updateItemQty={updateItemQty}
          />
        </div>
        
      </div>

      {/* Mobile Cart Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
          {savings > 0 && (
            <div className="bg-green-500 text-white text-center py-2 px-4 text-sm font-medium">
              Congratulations! you saved ₹{savings.toLocaleString('en-IN')} so far!
            </div>
          )}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-dark">
                ₹{total.toLocaleString('en-IN')}
              </span>
              {originalTotal > total && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalTotal.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/cart")}
              className="bg-prime text-white px-6 py-2.5 rounded-lg font-semibold text-sm"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      <Footer/>
      <BottomNavbar />
  </>
  );
}
