import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Vinyl } from "../pages/Home/Home";

const BASE_URL = "https://64fb0783cb9c00518f7a8b10.mockapi.io/";

export const vinylsApi = createApi({
  reducerPath: "vinylsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getVinyls: build.query<void, void>({
      query: () => "records",
    }),
    getVinylsById: build.query<Vinyl, string>({
      query: (id) => ({
        url: `records/${id}`,
      }),
    }),
  }),
});

export const { useGetVinylsQuery, useGetVinylsByIdQuery } = vinylsApi;
