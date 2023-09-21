import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import { vinylsApi } from "./vinylsApi";
import { favoritesApi } from "./favoritesApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [vinylsApi.reducerPath]: vinylsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vinylsApi.middleware)
      .concat(favoritesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

