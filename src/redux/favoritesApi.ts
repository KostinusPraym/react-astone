import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Vinyl } from "../pages/Home/Home";

const BASE_URL = "https://react-astone-default-rtdb.firebaseio.com/";

interface QueryParams {
  id: string;
  uid: string;
}

export interface ResponseParams {
  id: {
    [uniqueId: string]: Vinyl;
  };
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getFavorites: build.query<ResponseParams, string>({
      query: (uid) => {
        return {
          url: `favorites/${uid}.json`,
        };
      },
      providesTags: ["Favorites"],
    }),
    getFavoritesById: build.query<ResponseParams, QueryParams>({
      query: ({ id, uid }) => {
        return {
          url: `favorites/${uid}/${"0" + id}.json`,
        };
      },
      providesTags: ["Favorites"],
    }),
    addInFavorites: build.mutation({
      query: ({ vinyl, uid }) => {
        return {
          url: `favorites/${uid}/${"0" + vinyl.id}.json`,
          method: "POST",
          body: vinyl,
        };
      },
      invalidatesTags: ["Favorites"],
    }),
    removeFromFavorites: build.mutation({
      query: ({ id, uid }) => {
        return {
          url: `favorites/${uid}/${"0" + id}.json`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesByIdQuery,
  useGetFavoritesQuery,
  useAddInFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoritesApi;
