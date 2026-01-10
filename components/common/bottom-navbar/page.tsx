'use client';

import React, { useState } from 'react';
import { Home, ShoppingCart, Calendar, User } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function BottomNavbar() {
  const [activeTab, setActiveTab] = useState('home');
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'account', label: 'Account', icon: User }
  ];

  // Only render on mobile
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors relative"
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${
                  isActive ? 'text-orange-500' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs font-medium ${
                  isActive ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-16 h-1 bg-orange-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}