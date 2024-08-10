import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserCreate,
  UserCreateResponse,
  UserDetailResponse,
  UserLogin,
  UserLoginResponse,
} from "../types";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/user`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserCreateResponse, UserCreate>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<UserLoginResponse, UserLogin>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
        credentials: "include",
        redirect: "follow",
      }),
    }),
    profile: builder.query<UserDetailResponse, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
        redirect: "follow",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation, useProfileQuery } =
  userApi;

export default userApi;
