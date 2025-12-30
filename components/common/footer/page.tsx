"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { FooterImage } from "@/components/shared/images/image";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container section-spacer">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-10 ">
          
          {/* COLUMN 1 */}
          <div>
            <h4 className="text-subheading mb-4">Important links</h4>
            <ul className="space-y-2 text-body-sm text-muted">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">FAQ’s</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-subheading mb-4">For Customers</h4>
            <ul className="space-y-2 text-body-sm text-muted">
              <li><Link href="#">UrbanXperts Reviews</Link></li>
              <li><Link href="#">Popular Categories</Link></li>
              <li><Link href="#">Help</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-subheading mb-4">For Service Providers</h4>
            <ul className="space-y-2 text-body-sm text-muted">
              <li><Link href="#">Register as Service Provider</Link></li>
              <li><Link href="#">Help</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="text-subheading mb-4">Get the App</h4>

            <div className="flex gap-3 mb-4">
              <Image
                src={FooterImage.appStoreImg}
                    
                alt="App Store"
                className="h-10"
              />
              <Image
                src={FooterImage.playStoreImg}
                alt="Google Play"
                className="h-10"
              />
            </div>

            <p className="text-caption mb-2">Follow Us</p>
            <div className="flex gap-3">
              <Youtube size={18} />
              <Facebook size={18} />
              <Twitter size={18} />
              <Instagram size={18} />
              <Linkedin size={18} />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider-gradient my-8" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-muted">
          <p>
            © Copyright 2025 UrbanXperts India Limited. All rights reserved.
            | CIN: 1345DFGT25RDF3RT2
          </p>

          <div className="flex items-center gap-4">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
            <span className="flex items-center gap-1">
              🌐 EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
