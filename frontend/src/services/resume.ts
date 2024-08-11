import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResumeNameSlug, ResumeNameSlugResponse } from "@/types";

const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/resume`,
  }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    createResume: builder.mutation<ResumeNameSlugResponse, ResumeNameSlug>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateResumeMutation } = resumeApi;

export default resumeApi;
