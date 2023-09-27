import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";
import { vinylsApi } from "./rtkQuery/vinylsApi";
import { favoritesApi } from "./rtkQuery/favoritesApi";
import { historyApi } from "./rtkQuery/historyApi";
import { featureFlagApi } from "./rtkQuery/featureFlagApi";
import listenerMiddleware from "./middleware/loger";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    [vinylsApi.reducerPath]: vinylsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [featureFlagApi.reducerPath]: featureFlagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vinylsApi.middleware)
      .concat(favoritesApi.middleware)
      .concat(historyApi.middleware)
      .concat(featureFlagApi.middleware)
      .concat(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
