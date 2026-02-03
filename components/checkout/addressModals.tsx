"use client";

import { X, Plus } from "lucide-react";
import { useState } from "react";
import AddAddressModal from "./addAddressModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  onAddressSelect?: (title: string, address: string) => void;
};

export default function AddressModal({
  open,
  onClose,
  onProceed,
  onAddressSelect,
}: Props) {
  const [selectedAddress, setSelectedAddress] = useState<{title: string, address: string} | null>(null);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState<boolean>(false);

  const handleSelect = (title: string, address: string) => {
    setSelectedAddress({ title, address });
  };

  const handleProceed = () => {
    if (selectedAddress && onAddressSelect) {
      onAddressSelect(selectedAddress.title, selectedAddress.address);
    }
    onProceed();
  };

  const handleAddAddress = (title: string, address: string) => {
    if (onAddressSelect) {
      onAddressSelect(title, address);
    }
    setAddAddressModalOpen(false);
    onProceed();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/40">

      {/* MODAL */}
      <div className="w-full max-w-md rounded-t-2xl lg:rounded-2xl bg-white shadow-lg max-h-[90vh] lg:max-h-none overflow-y-auto">

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
          <button 
            onClick={() => setAddAddressModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-prime hover:underline"
          >
            <Plus size={18} />
            Add new address
          </button>

          <div className="border-t" />

          {/* ADDRESS LIST */}
          <AddressOption
            checked
            title="Home"
            address="145, Sector B, Nagin Nagar, Indore, MP 452010, India"
            onClick={() => handleSelect("Home", "145, Sector B, Nagin Nagar, Indore, MP 452010, India")}
          />

          <AddressOption
            title="Shop"
            address="Shop No. 12, Ground Floor, Silver Mall, MG Road, Indore, MP 452001"
            onClick={() => handleSelect("Shop", "Shop No. 12, Ground Floor, Silver Mall, MG Road, Indore, MP 452001")}
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={handleProceed}
            disabled={!selectedAddress}
            className="w-full rounded-xl bg-prime hover:bg-prime disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 text-sm font-semibold"
          >
            Proceed to Slots
          </button>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        open={addAddressModalOpen}
        onClose={() => setAddAddressModalOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}

/* ---------------- SUB COMPONENT ---------------- */

function AddressOption({
  title,
  address,
  checked,
  onClick,
}: {
  title: string;
  address: string;
  checked?: boolean;
  onClick?: () => void;
}) {
  return (
    <label className="flex gap-3 cursor-pointer" onClick={onClick}>
      <input
        type="radio"
        name="address"
        defaultChecked={checked}
        className="mt-1 accent-prime"
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