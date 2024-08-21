export interface ResumeNameSlug {
  name: string;
  slug: string;
}

export interface ResumeNameSlugResponse {
  message: string;
  status: number;
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

export interface ProfileType {
  network: string;
  username: string;
  url: string;
  hidden?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  hidden?: boolean;
}

export interface Skill {
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

export interface ResumeType {
  _id: string;
  variant?:
    | "blank"
    | "classic"
    | "modern"
    | "elegant"
    | "professional"
    | "creative";
  resumeNameSlug: ResumeNameSlug;
  user?: string; // ObjectId type, usually represented as a string in TypeScript
  avatar?: ResumeAvatar;
  fullName?: string;
  headline?: string;
  email?: string;
  website?: string;
  phone?: string;
  location?: string;
  summary?: string;
  customFields?: CustomField[];
  profiles?: ProfileType[];
  experiences?: Experience[];
  skills?: Skill[];
  languages?: Language[];
  projects?: Project[];
  education?: Education[];
  customSections?: CustomSection[];
}