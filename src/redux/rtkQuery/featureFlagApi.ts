import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Feature = {
  isTelegramShareEnabled: boolean;
};

export const featureFlagApi = createApi({
  reducerPath: "featureFlagApi",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

  endpoints: (builder) => ({
    getFeatureFlag: builder.query<Feature, void>({
      query: () => "api/feature-flags",
    }),
  }),
});

export const { useGetFeatureFlagQuery } = featureFlagApi;
