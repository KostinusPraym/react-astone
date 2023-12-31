import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://64fb0783cb9c00518f7a8b10.mockapi.io/";

interface QueryParams {
  search?: string | null;
  page?: number;
  limit?: number;
}

export type Vinyl = {
  id: string;
  author: string;
  price: string;
  genre: string[];
  mediaType: string;
  edition: string;
  coverImage: string;
};

export const vinylsApi = createApi({
  reducerPath: "vinylsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getVinyls: build.query<Vinyl[], void>({
      query: () => ({
        url: "records",
      }),
    }),
    getVinylsBySearch: build.query<Vinyl[], QueryParams>({
      query: ({ search }) => {
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
      query: ({ search = "", limit = 5, page = 1 }) => {
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
  useGetVinylsBySearchQuery,
} = vinylsApi;
