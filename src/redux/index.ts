import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import { vinylsApi } from "./vinylsApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [vinylsApi.reducerPath]: vinylsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vinylsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
