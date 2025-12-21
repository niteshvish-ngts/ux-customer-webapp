// StoreProvider.ts
"use client";

import { Provider } from "react-redux";
import { store } from "./make-store";
import type { PropsWithChildren } from "react";

export default function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}