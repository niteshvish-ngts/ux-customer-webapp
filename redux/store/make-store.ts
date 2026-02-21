import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";
import userReducer from "../features/user/user-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === "development"
        ? getDefaultMiddleware().concat(reduxLogger)
        : getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the `AppThunk` type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
