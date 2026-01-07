import type { Metadata, Viewport } from "next";
import { Outfit, Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/store/store-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Urban Experts | Trusted experts for AC, Appliance, Electrical, Plumbing, and more with real-time tracking, verified visits, transparent pricing, and secure job completion.",
  description: "On Demand Service at Your Doorstep",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${lato.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
