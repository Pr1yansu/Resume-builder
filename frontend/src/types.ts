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

export interface variantUpdate {
  variant: Resume["variant"];
  resumeId: string;
}

export interface ResumeAvatar {
  url?: string;
  size?: number;
  aspectRatio?: "SQUARE" | "PORTRAIT" | "LANDSCAPE";
  borderRadius?: "NONE" | "SM" | "MD" | "LG" | "FULL";
  effects?: "HIDDEN" | "BORDER" | "SHADOW" | "RING";
}

export interface ResumeNameSlug {
  name: string;
  slug: string;
}

export interface CustomField {
  name: string;
  value: string;
  hidden?: boolean;
}

export interface Profile {
  _id: string;
  network: string;
  username: string;
  url: string;
  hidden?: boolean;
  icon: string;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  hidden?: boolean;
}

export interface Skill {
  _id: string;
  name: string;
  description?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  hidden?: boolean;
}

export interface Language {
  name: string;
  level: "Basic" | "Conversational" | "Fluent" | "Native";
  hidden?: boolean;
}

export interface Project {
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  hidden?: boolean;
}

export interface CustomSection {
  title: string;
  hidden?: boolean;
  items: [CustomField | Experience | Skill | Language | Project];
}

export interface Education {
  institute: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  hidden?: boolean;
}

export interface Resume {
  _id: string;
  variant?:
    | "blank"
    | "classic"
    | "modern"
    | "elegant"
    | "professional"
    | "creative";
  resumeNameSlug: ResumeNameSlug;
  user?: string;
  avatar?: ResumeAvatar;
  fullName?: string;
  headline?: string;
  email?: string;
  website?: string;
  phone?: string;
  location?: string;
  summary?: string;
  customFields?: CustomField[];
  profiles?: Profile[];
  experiences?: Experience[];
  skills?: Skill[];
  languages?: Language[];
  projects?: Project[];
  education?: Education[];
  customSections?: CustomSection[];
}

export interface GetAllResumesResponse {
  message: string;
  status: number;
  data: {
    resumes: Resume[];
  };
}

export interface GetResumeResponse {
  message: string;
  status: number;
  data: {
    resume: Resume;
  };
}

export interface UpdateResume {
  fullName?: string;
  headline?: string;
  email?: string;
  website?: string;
  phone?: string;
  location?: string;
  avatar?: ResumeAvatar;
  summary?: string;
  customFields?: CustomField[];
  profiles?: Profile[];
  experiences?: Experience[];
  skills?: Skill[];
  languages?: Language[];
  projects?: Project[];
  education?: Education[];
  customSections?: CustomSection[];
}
export interface UpdateResumeResponse {
  message: string;
  status: number;
}

export interface variantUpdateResponse {
  message: string;
  status: number;
}
