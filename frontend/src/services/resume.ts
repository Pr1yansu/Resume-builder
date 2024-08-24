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
  Experience,
  Skill,
  Language,
  Education,
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

    // Mutations
    createResume: builder.mutation<ResumeNameSlugResponse, ResumeNameSlug>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    updateVariant: builder.mutation<variantUpdateResponse, variantUpdate>({
      query: (body) => ({
        url: `/update-variant/${body.resumeId}`,
        method: "PUT",
        body: { variant: body.variant },
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
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
      invalidatesTags: ["Resume"],
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
      invalidatesTags: ["Resume"],
    }),

    updateProfile: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; profileId: string; profile: Profile }
    >({
      query: ({ resumeId, profileId, profile }) => ({
        url: `/update-profile/${resumeId}/${profileId}`,
        method: "PUT",
        body: profile,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    addExperience: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; experience: Experience }
    >({
      query: ({ resumeId, experience }) => ({
        url: `/add-experience/${resumeId}`,
        method: "PUT",
        body: experience,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    updateExperience: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; experienceId: string; experience: Experience }
    >({
      query: ({ resumeId, experienceId, experience }) => ({
        url: `/update-experience/${resumeId}/${experienceId}`,
        method: "PUT",
        body: experience,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    addSkill: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; skill: Skill }
    >({
      query: ({ resumeId, skill }) => ({
        url: `/add-skill/${resumeId}`,
        method: "PUT",
        body: skill,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    updateSkill: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; skillId: string; skill: Skill }
    >({
      query: ({ resumeId, skillId, skill }) => ({
        url: `/update-skill/${resumeId}/${skillId}`,
        method: "PUT",
        body: skill,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    addLanguage: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; language: Language }
    >({
      query: ({ resumeId, language }) => ({
        url: `/add-language/${resumeId}`,
        method: "PUT",
        body: language,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    updateLanguage: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; languageId: string; language: Language }
    >({
      query: ({ resumeId, languageId, language }) => ({
        url: `/update-language/${resumeId}/${languageId}`,
        method: "PUT",
        body: language,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    addEducation: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; education: Education }
    >({
      query: ({ resumeId, education }) => ({
        url: `/add-education/${resumeId}`,
        method: "PUT",
        body: education,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
    }),

    updateEducation: builder.mutation<
      UpdateResumeResponse,
      { resumeId: string; educationId: string; education: Education }
    >({
      query: ({ resumeId, educationId, education }) => ({
        url: `/update-education/${resumeId}/${educationId}`,
        method: "PUT",
        body: education,
        credentials: "include",
      }),
      invalidatesTags: ["Resume"],
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
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useAddLanguageMutation,
  useUpdateLanguageMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
} = resumeApi;

export default resumeApi;
