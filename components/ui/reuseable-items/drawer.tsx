"use client";

import * as React from "react";
import { Drawer as VaulDrawer } from "vaul";
import { cn } from "@/lib/utils";

function Drawer({
  open,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Root>) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </VaulDrawer.Root>
  );
}
Drawer.displayName = "Drawer";

const DrawerTrigger = VaulDrawer.Trigger;
const DrawerPortal = VaulDrawer.Portal;
const DrawerClose = VaulDrawer.Close;

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Overlay>) {
  return (
    <VaulDrawer.Overlay
      className={cn("fixed inset-0 z-50 bg-black/40", className)}
      {...props}
    />
  );
}
DrawerOverlay.displayName = "DrawerOverlay";

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Content>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <VaulDrawer.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-2xl border border-border bg-background",
          className
        )}
        {...props}
      >
        <VaulDrawer.Title className="sr-only">Modal</VaulDrawer.Title>
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </VaulDrawer.Content>
    </DrawerPortal>
  );
}
DrawerContent.displayName = "DrawerContent";

/** Left-side drawer content for nav/sidebar. Use with <Drawer direction="left">. High z-index for overlay. */
function DrawerContentLeft({
  className,
  children,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Content>) {
  return (
    <DrawerPortal>
      <VaulDrawer.Overlay className="fixed inset-0 z-80 bg-black/40" />
      <VaulDrawer.Content
        className={cn(
          "fixed inset-y-0 left-0 z-101 flex h-full w-[65%] max-w-sm flex-col border-r border-border bg-background",
          className
        )}
        {...props}
      >
        <VaulDrawer.Title className="sr-only">Menu</VaulDrawer.Title>
        {children}
      </VaulDrawer.Content>
    </DrawerPortal>
  );
}
DrawerContentLeft.displayName = "DrawerContentLeft";

function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
    />
  );
}
DrawerHeader.displayName = "DrawerHeader";

function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Title>) {
  return (
    <VaulDrawer.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}
DrawerTitle.displayName = "DrawerTitle";

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Description>) {
  return (
    <VaulDrawer.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerContentLeft,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
