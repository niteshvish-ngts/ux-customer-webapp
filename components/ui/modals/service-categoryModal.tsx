"use client";

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StaticImageData } from 'next/image';

interface Service {
  id: number;
  name: string;
  img: StaticImageData;
}

interface ServiceCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
  services: Service[];
  img?: StaticImageData;
}

export default function ServiceCategoryModal({ 
  open, 
  onClose, 
  category, 
  services 
}: ServiceCategoryModalProps) {
  const router = useRouter();
  
  if (!open) return null;

  const handleServiceClick = (service: Service) => {
    // Close modal first
    onClose();
    
    // Navigate to service page with query parameters
    const serviceName = service.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/service?name=${serviceName}&id=${service.id}`);
    
    // Alternative: Navigate with the service name in the URL path
    // router.push(`/service/${serviceName}`);
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-medium text-gray-900 font-outfit">{category}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-colors group"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  <Image 
                    src={service.img} 
                    alt={service.name} 
                    width={32} 
                    height={32} 
                  />
                </div>
                {/* Service Name */}
                <span className="text-[11px] font-medium text-gray-900 font-lato text-center leading-tight">
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}