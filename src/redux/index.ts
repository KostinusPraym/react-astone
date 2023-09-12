import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import itemsSlice from "./slices/itemsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    items: itemsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
