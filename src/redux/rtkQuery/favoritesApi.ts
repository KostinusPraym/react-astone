import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getVinylsForFavorite } from "../../utils/getVinylsForFavorite";

import { Vinyl } from "./vinylsApi";

const BASE_URL = "https://react-astone-default-rtdb.firebaseio.com/";

interface QueryParams {
  id: string;
  uid: string;
}

export interface ResponseParams {
  [id: string]: {
    [uniqueId: string]: Vinyl;
  };
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  tagTypes: ["Favorites", "FavoritePage"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getFavorites: build.query<Vinyl[], string>({
      query: (uid) => {
        return {
          url: `favorites/${uid}.json`,
        };
      },
      providesTags: ["FavoritePage"],
      transformResponse: (data: ResponseParams | undefined) => getVinylsForFavorite(data),
    }),
    getFavoritesById: build.query<ResponseParams, QueryParams>({
      query: ({ id, uid }) => {
        return {
          url: `favorites/${uid}/${"isFavorite" + id}.json`,
        };
      },
      providesTags: (_, __, { id }) => [{ type: "Favorites", id }],
    }),
    addInFavorites: build.mutation({
      query: ({ vinyl, uid }) => {
        return {
          url: `favorites/${uid}/${"isFavorite" + vinyl.id}.json`,
          method: "POST",
          body: vinyl,
        };
      },
      invalidatesTags: (_, __, { vinyl }: { vinyl: Vinyl }) => {
        return [{ type: "Favorites", id: vinyl.id }, "FavoritePage"];
      },
    }),
    removeFromFavorites: build.mutation({
      query: ({ id, uid }) => {
        return {
          url: `favorites/${uid}/${"isFavorite" + id}.json`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_, __, { id }: { id: string }) => {
        return [{ type: "Favorites", id }, "FavoritePage"];
      },
    }),
  }),
});

export const {
  useGetFavoritesByIdQuery,
  useGetFavoritesQuery,
  useAddInFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoritesApi;
