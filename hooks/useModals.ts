"use client";

import { useState } from "react";

export function useModal(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    toggle: () => setOpen((v) => !v),
  };
}