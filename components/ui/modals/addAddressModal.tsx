"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { createAddress, type CustomerAddress } from "@/services/address";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, address: string) => void;
};

const FULL_ADDRESS =
  "Flat 302, Shree Residency, Vijay Nagar, Indore, Madhya Pradesh 452010, India";
const MAIN_ADDRESS = "Flat 302, Shree Residency";

const DEFAULT_LAT = 59.076;
const DEFAULT_LNG = 66.8777;
const DEFAULT_CITY = "Indore";
const DEFAULT_STATE = "MP";
const DEFAULT_PINCODE = "452010";

function normalizeAddressType(s: string): string {
  const t = s.trim().toUpperCase();
  if (t === "HOME" || t === "WORK" || t === "OFFICE" || t === "OTHER") return t;
  if (t.includes("OFFICE")) return "OFFICE";
  if (t.includes("WORK")) return "WORK";
  if (t.includes("OTHER")) return "OTHER";
  return "HOME";
}

function formatAddressLine(a: CustomerAddress): string {
  const parts: string[] = [];
  if (a.line1) parts.push(a.line1);
  if (a.line2) parts.push(a.line2);
  if (a.landmark) parts.push(a.landmark);
  const cityState = [a.city, a.state].filter(Boolean).join(", ");
  if (cityState) parts.push(cityState);
  if (a.pincode) parts.push(a.pincode);
  return parts.join(", ").trim();
}

function addressTypeToLabel(type: string): string {
  const map: Record<string, string> = {
    HOME: "Home",
    WORK: "Work",
    OFFICE: "Office",
    OTHER: "Other",
  };
  return map[type] ?? type;
}

export default function AddAddressModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [saveAs, setSaveAs] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);
    const line1Trim = houseNo.trim();
    if (!line1Trim) {
      setError("Please enter House / Flat No.");
      return;
    }
    setSaving(true);
    createAddress({
      addressType: normalizeAddressType(saveAs),
      line1: line1Trim,
      landmark: landmark.trim() || null,
      city: DEFAULT_CITY,
      state: DEFAULT_STATE,
      pincode: DEFAULT_PINCODE,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    })
      .then((res) => {
        if (res?.success && res.data) {
          const title = addressTypeToLabel(res.data.addressType);
          const address = formatAddressLine(res.data);
          onSave(title, address);
          setHouseNo("");
          setLandmark("");
          setName("");
          setSaveAs("");
          onClose();
        } else {
          setError("Failed to save address.");
        }
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ??
          err?.response?.data?.errors?.[0] ??
          err?.message ??
          "Failed to save address.";
        setError(msg);
      })
      .finally(() => setSaving(false));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-black/40">
      <div className="w-full h-full lg:h-auto lg:max-w-4xl lg:max-h-[90vh] lg:rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Body: Map (left) + Form (right) */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* LEFT: Map */}
          <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] bg-[#e8e8e8] relative shrink-0">
            <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-200">
              {/* Yellow teardrop pin + tooltip */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
                <div className="relative">
                  <svg
                    width="36"
                    height="48"
                    viewBox="0 0 36 48"
                    fill="none"
                    className="drop-shadow-lg"
                  >
                    <path
                      d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z"
                      fill="#FACC15"
                    />
                    <circle cx="18" cy="18" r="8" fill="white" />
                  </svg>
                </div>
                <div className="mt-1 px-3 py-1.5 rounded-md bg-[#2D3748] text-white text-xs font-medium whitespace-nowrap shadow-md">
                  Place the pin accurately on map
                </div>
              </div>
            </div>
            {/* Map attribution bar */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/95 px-3 flex items-center justify-between text-[10px] text-[#5f6368]">
              <span className="font-medium text-[#1a73e8]">Google</span>
              <span>
                Keyboard shortcuts · Map data ©2025 · Terms · Report a map error
              </span>
            </div>
            {/* Locate / fullscreen control */}
            <div className="absolute bottom-10 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-600"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="flex-1 overflow-y-auto flex flex-col bg-white">
            {/* Address header + Close - same row, left-aligned text */}
            <div className="flex items-start justify-between gap-4 px-5 lg:px-8 pt-5 lg:pt-6 pb-2">
              <div className="flex-1 min-w-0 text-left">
                <h2 className="text-xl font-medium font-outfit  leading-tight">
                  {MAIN_ADDRESS}
                </h2>
                <p className="text-xs text-dark-50 mt-1 leading-snug font-lato">
                  {FULL_ADDRESS}
                </p>
                <div className="border-b  py-2 "></div>
              </div>
              
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[#4A5568] hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Add Specific Details + fields */}
            <div className="px-5 lg:px-8 pb-6 lg:pb-8">
              <h3 className="text-lg font-medium  mb-4 font-outfit">
                Add Specific Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-outfit">
                    House / Flat No.
                  </label>
                  <input
                    type="text"
                    placeholder="eg. 123/A"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 font-outfit">
                    Landmark (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="eg. zyx building"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 font-outfit">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="eg. jhon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-outfit">
                    Save Address As
                  </label>
                  <input
                    type="text"
                    placeholder="eg. Home"
                    value={saveAs}
                    onChange={(e) => setSaveAs(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8936] focus:border-[#ED8936]"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600 font-outfit">{error}</p>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-6 py-3 rounded-lg bg-prime hover:bg-prime-20 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide transition font-outfit"
              >
                {saving ? "Saving…" : "Save & Select Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
