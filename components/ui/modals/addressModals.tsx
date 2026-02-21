"use client";

import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AddAddressModal from "./addAddressModal";
import { getAllAddresses, type CustomerAddress } from "@/services/address";
import { ModalDrawer } from "@/components/ui/reuseable-items/ModalDrawer";

function labelFromAddressType(addressType: string | null | undefined): string {
  const t = (addressType ?? "").toUpperCase();
  if (t === "HOME") return "Home";
  if (t === "WORK" || t === "OFFICE") return t === "WORK" ? "Work" : "Office";
  if (t === "OTHER") return "Other";
  return t ? t.charAt(0) + t.slice(1).toLowerCase() : "Address";
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
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setAddresses([]);
    setSelectedAddress(null);
    getAllAddresses()
      .then((res) => {
        if (cancelled) return;
        const list = (res?.data ?? []).filter((a) => !a.isDeleted);
        setAddresses(list);
        const defaultAddr = list.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr);
        else if (list.length > 0) setSelectedAddress(list[0]);
      })
      .catch(() => {
        if (!cancelled) setAddresses([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleProceed = () => {
    if (selectedAddress && onAddressSelect) {
      onAddressSelect(
        labelFromAddressType(selectedAddress.addressType),
        formatAddressLine(selectedAddress)
      );
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
    <>
      <ModalDrawer
        open={open}
        onClose={onClose}
        contentClassName="w-full max-w-md bg-white shadow-lg max-h-[90vh] overflow-y-auto"
      >
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
          <button
            onClick={() => setAddAddressModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-prime hover:underline"
          >
            <Plus size={18} />
            Add new address
          </button>

          <div className="border-t" />

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading addresses…</p>
          ) : addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved addresses. Add one above.</p>
          ) : (
            addresses.map((addr) => (
              <AddressOption
                key={addr.id}
                title={labelFromAddressType(addr.addressType)}
                address={formatAddressLine(addr)}
                checked={selectedAddress?.id === addr.id}
                onClick={() => setSelectedAddress(addr)}
              />
            ))
          )}
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
      </ModalDrawer>

      <AddAddressModal
        open={addAddressModalOpen}
        onClose={() => setAddAddressModalOpen(false)}
        onSave={handleAddAddress}
      />
    </>
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
    <label className="flex gap-3 cursor-pointer">
      <input
        type="radio"
        name="address"
        checked={checked ?? false}
        onChange={() => onClick?.()}
        className="mt-1 accent-prime"
      />
      <div className="flex-1 min-w-0" onClick={() => onClick?.()}>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {address}
        </p>
      </div>
    </label>
  );
}