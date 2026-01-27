"use client";

import { X, Plus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
};

export default function AddressModal({
  open,
  onClose,
  onProceed,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      {/* MODAL */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Select Address</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 space-y-4">

          {/* ADD NEW */}
          <button className="flex items-center gap-2 text-sm font-medium text-orange-600">
            <Plus size={18} />
            Add new address
          </button>

          <div className="border-t" />

          {/* ADDRESS LIST */}
          <AddressOption
            checked
            title="Home"
            address="Flat 302, Shree Residency, Vijay Nagar, Indore, MP 452010, India"
          />

          <AddressOption
            title="Shop"
            address="Shop No. 12, Ground Floor, Silver Mall, MG Road, Indore, MP 452001"
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={onProceed}
            className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-3 text-sm font-semibold"
          >
            Proceed to Slots
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENT ---------------- */

function AddressOption({
  title,
  address,
  checked,
}: {
  title: string;
  address: string;
  checked?: boolean;
}) {
  return (
    <label className="flex gap-3 cursor-pointer">
      <input
        type="radio"
        name="address"
        defaultChecked={checked}
        className="mt-1 accent-orange-500"
      />

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {address}
        </p>
      </div>
    </label>
  );
}