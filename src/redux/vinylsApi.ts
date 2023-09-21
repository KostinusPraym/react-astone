import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Vinyl } from "../pages/Home/Home";

const BASE_URL = "https://64fb0783cb9c00518f7a8b10.mockapi.io/";

interface QueryParams {
  search?: string | null;
  page?: number;
  limit?: number;
}

export const vinylsApi = createApi({
  reducerPath: "vinylsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getVinyls: build.query<Vinyl[], QueryParams>({
      query: ({ search}) => {
        return {
          url: "records",
          params: { search },
        };
      },
    }),
    getVinylsById: build.query<Vinyl, string>({
      query: (id) => ({
        url: `records/${id}`,
      }),
    }),
    getSearchSuggest: build.query<Vinyl[], QueryParams>({
      query: ({ search = "", limit = 0, page = 1 }) => {
        return {
          url: "records",
          params: { search, limit, page },
        };
      },
    }),
  }),
});

export const {
  useGetVinylsQuery,
  useGetVinylsByIdQuery,
  useGetSearchSuggestQuery,
} = vinylsApi;
