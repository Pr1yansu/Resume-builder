enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export interface UserCreate {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  address?: string;
}
export interface UserCreateResponse {
  message: string;
  status: number;
}
export interface UserLogin {
  username: string;
  password: string;
}
export interface UserLoginResponse {
  message: string;
  status: number;
  redirect: string;
}
export interface UserDetailResponse {
  message: string;
  status: number;
  redirect: string;
  user?: {
    id: string;
    email: string;
    avatar?: string;
    emailVerified: boolean;
    provider?: string;
    address?: string;
    name: string;
    role: UserRole;
  };
}

export interface ResumeNameSlug {
  name: string;
  slug: string;
}

export interface ResumeNameSlugResponse {
  message: string;
  status: number;
}
