"use client";

import * as React from "react";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerContent as DrawerContentBase,
  DrawerOverlay,
  DrawerPortal,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type ModalDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Optional: hide the drag handle on drawer (mobile) */
  showDrawerHandle?: boolean;
  /** Content wrapper class - e.g. max-w-md, max-h-[90vh] */
  contentClassName?: string;
};

/**
 * On mobile (max-width: 1024px): renders as a bottom drawer (slide up).
 * On desktop: renders as a centered modal overlay.
 */
export function ModalDrawer({
  open,
  onClose,
  children,
  showDrawerHandle = true,
  contentClassName,
}: ModalDrawerProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      if (!value) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContentBase
            className={cn(
              "max-h-[90vh] overflow-y-auto",
              !showDrawerHandle && "[&>div:first-child]:hidden",
              contentClassName
            )}
          >
            {children}
          </DrawerContentBase>
        </DrawerPortal>
      </Drawer>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={cn(
          "w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
