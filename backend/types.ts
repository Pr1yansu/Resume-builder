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
  icon: string;
  network: string;
  username: string;
  url: string;
  hidden: boolean;
}

export interface ExperienceType {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  hidden?: boolean;
}

export interface SkillType {
  name: string;
  description?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  hidden?: boolean;
}

export interface LanguageType {
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
  items: [CustomField | ExperienceType | SkillType | LanguageType | Project];
}

export interface EducationType {
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
  experiences?: ExperienceType[];
  skills?: SkillType[];
  languages?: LanguageType[];
  projects?: Project[];
  education?: EducationType[];
  customSections?: CustomSection[];
}
