"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";
import { FooterImage } from "@/components/shared/images/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background section-spacer ">
      <div className="container py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COLUMN 1 */}
          <div>
            <h4 className="text-subheading mb-6">Important links</h4>
            <ul className="flex flex-col gap-5 text-body-sm cursor-pointer">
              <li className="leading-loose"><Link href="#">About Us</Link></li>
              <li className="leading-loose"><Link href="#">FAQ's</Link></li>
              <li className="leading-loose"><Link href="#">Terms & Conditions</Link></li>
              <li className="leading-loose"><Link href="#">Privacy Policy</Link></li>
              <li className="leading-loose"><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-subheading mb-6">For Customers</h4>
            <ul className="flex flex-col gap-5 text-body-sm cursor-pointer">
              <li className="leading-loose"><Link href="#">UrbanXperts Reviews</Link></li>
              <li className="leading-loose"><Link href="#">Popular Categories</Link></li>
              <li className="leading-loose"><Link href="#">Help</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-subheading mb-6">For Service Providers</h4>
            <ul className="flex flex-col gap-5 text-body-sm cursor-pointer">
              <li className="leading-loose"><Link href="#">Register as Service Provider</Link></li>
              <li className="leading-loose"><Link href="#">Help</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="text-subheading mb-6">Get the App</h4>

            <div className="flex gap-3 mb-6 max-w-full">
              <Image
                src={FooterImage.appStoreImg}
                alt="App Store"
                width={138}
                height={45}
                className="h-10 max-w-full object-contain"
              />
              <Image
                src={FooterImage.playStoreImg}
                alt="Google Play"
                width={138}
                height={45}
                className="h-10 max-w-full object-contain"
              />
            </div>

            <p className="text-caption mb-3 text-muted-foreground leading-loose">
              Follow Us
            </p>

            <div className="flex items-center gap-4 text-background cursor-pointer">
              <Youtube size={18} />
              <Facebook size={18} />
              <Twitter size={18} />
              <Instagram size={18} />
              <Linkedin size={18} />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px w-full bg-border opacity-40" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-caption leading-loose">
          <p className="text-center md:text-left">
            © Copyright 2025 UrbanXperts India Limited. All rights reserved.
            | CIN: 1345DFGT25RDF3RT2
          </p>

          <div className="flex items-center gap-6">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
            <span className="flex items-center gap-1">
              <Globe size={16} /> EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}