import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ResumeNameSlug,
  ResumeNameSlugResponse,
  GetAllResumesResponse,
  GetResumeResponse,
  UpdateResume,
  UpdateResumeResponse,
  variantUpdate,
  variantUpdateResponse,
  Profile,
} from "@/types";

const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/resume`,
  }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    getResumes: builder.query<GetAllResumesResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Resume"],
    }),
    getResumeById: builder.query<GetResumeResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Resume"],
    }),
    createResume: builder.mutation<ResumeNameSlugResponse, ResumeNameSlug>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateVariant: builder.mutation<variantUpdateResponse, variantUpdate>({
      query: (body) => ({
        url: `/update-variant/${body.resumeId}`,
        method: "PUT",
        body: {
          variant: body.variant,
        },
        credentials: "include",
      }),
    }),
    editResume: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; body: UpdateResume }
    >({
      query: ({ resumeId, body }) => ({
        url: `/edit/${resumeId}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
    addProfile: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; profile: Profile }
    >({
      query: ({ resumeId, profile }) => ({
        url: `/add-profile/${resumeId}`,
        method: "PUT",
        body: profile,
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; profile: Profile }
    >({
      query: ({ resumeId, profile }) => ({
        url: `/update-profile/${resumeId}`,
        method: "PUT",
        body: profile,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateResumeMutation,
  useGetResumesQuery,
  useGetResumeByIdQuery,
  useEditResumeMutation,
  useUpdateVariantMutation,
  useAddProfileMutation,
  useUpdateProfileMutation,
} = resumeApi;

export default resumeApi;
