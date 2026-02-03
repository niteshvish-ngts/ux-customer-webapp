"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, address: string) => void;
};

export default function AddAddressModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [saveAs, setSaveAs] = useState("");

  const fullAddress = "Flat 302, Shree Residency, Vijay Nagar, Indore, Madhya Pradesh 452010, India";

  const handleSave = () => {
    const addressTitle = saveAs || "Home";
    const completeAddress = `${houseNo ? houseNo + ", " : ""}${fullAddress}${landmark ? ", " + landmark : ""}`;
    onSave(addressTitle, completeAddress);
    // Reset form
    setHouseNo("");
    setLandmark("");
    setName("");
    setSaveAs("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center bg-black/40">
      {/* MODAL - Mobile: Full screen, Desktop: Centered */}
      <div className="w-full h-full lg:h-auto lg:max-w-6xl lg:max-h-[90vh] lg:rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate">Flat 302, Shree Residency</h2>
            <p className="text-xs text-muted-foreground truncate">{fullAddress}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ml-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* BODY - Mobile: Stacked, Desktop: Side by side */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* MAP SECTION - Mobile: Larger height, Desktop: Half width */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto bg-slate-100 relative flex-shrink-0 overflow-hidden">
            {/* Map Placeholder - Replace with actual Google Maps integration */}
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 relative">
              {/* Map pin with tooltip */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto flex items-center justify-center relative shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="mt-2 bg-black text-white text-xs px-3 py-1.5 rounded whitespace-nowrap">
                  Place the pin accurately on map
                </div>
              </div>
              
              {/* Map landmarks placeholder */}
              <div className="absolute top-4 left-4 text-xs text-slate-600 font-medium">Om heights building</div>
              <div className="absolute top-4 right-4 text-xs text-slate-600 font-medium">The Cream Studio Outlet</div>
              <div className="absolute bottom-16 left-4 text-xs text-slate-600 font-medium">Overhead Water Tank</div>
              <div className="absolute bottom-16 right-4 text-xs text-slate-600 font-medium">My Jio Store</div>
            </div>
            
            {/* Google Maps attribution */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-2 py-1 text-[10px] text-slate-600 flex items-center justify-between">
              <span className="font-medium">Google</span>
              <span className="text-[9px]">Keyboard shortcuts Map data ©2025 Terms Report a map error</span>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <h3 className="text-base font-semibold mb-4">Add Specific Details</h3>
            
            <div className="space-y-4">
              {/* House / Flat No. */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  House / Flat No.
                </label>
                <input
                  type="text"
                  placeholder="eg. 123/A"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Landmark (optional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Landmark (optional)
                </label>
                <input
                  type="text"
                  placeholder="eg. zyx building"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="eg. jhon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Save Address As */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Save Address As
                </label>
                <input
                  type="text"
                  placeholder="eg. Home"
                  value={saveAs}
                  onChange={(e) => setSaveAs(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-4 lg:px-6 py-4 border-t flex-shrink-0">
          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-prime hover:bg-prime text-white py-3 text-sm font-semibold"
          >
            <span className="lg:hidden">Add address Info</span>
            <span className="hidden lg:inline">Save & Select Address</span>
          </button>
        </div>
      </div>
    </div>
  );
}
