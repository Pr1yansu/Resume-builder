import * as z from "zod";

export const profileSchema = z.object({
  network: z.string().min(2).max(100),
  username: z.string().min(2).max(100),
  url: z.string().url(),
  hidden: z.boolean().optional(),
});

export const experienceSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(100),
  company: z
    .string()
    .min(2, {
      message: "Company must be at least 2 characters long",
    })
    .max(100),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters long",
    })
    .max(100),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date().optional(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .max(1000),
  hidden: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Name should have at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
    required_error: "Level is required",
  }),
  description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .optional(),
  hidden: z.boolean().optional().default(false),
});

export const languageSchema = z.object({
  name: z.string().min(2).max(100),
  level: z.enum(["Basic", "Conversational", "Fluent", "Native"]),
  hidden: z.boolean().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  startDate: z.date({}),
  endDate: z.date().optional(),
  url: z.string().url().optional(),
  hidden: z.boolean().optional(),
});

export const customFieldSchema = z.object({
  title: z.string().min(2).max(100),
  value: z.string().min(2).max(1000),
  hidden: z.boolean().optional(),
});

export const customSectionSchema = z.object({
  title: z.string().min(2).max(100),
  hidden: z.boolean().optional(),
  items: z.array(
    z.union([
      profileSchema,
      experienceSchema,
      skillSchema,
      languageSchema,
      projectSchema,
      customFieldSchema,
    ])
  ),
});

export const educationSchema = z.object({
  institution: z.string().min(2).max(100),
  degree: z.string().min(2).max(100),
  fieldOfStudy: z.string().min(2).max(100),
  startDate: z.date({}),
  endDate: z.date().optional(),
  describtion: z.string().min(10).max(1000),
  hidden: z.boolean().optional(),
});

export const resumeSchema = z.object({
  name: z.string().min(2).max(100),
  headline: z.string().min(3).max(200).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  phone: z.string().min(10).max(15).optional(),
  location: z.string().min(2).max(100).optional(),
  avatar: z
    .object({
      url: z.string().url(),
      alt: z.string().min(2).max(255),
      size: z.number().int().min(0).max(100),
      aspectRatio: z.enum(["SQUARE", "PORTRAIT", "LANDSCAPE"]),
      borderRadius: z.enum(["NONE", "SM", "MD", "LG", "FULL"]),
      effects: z.enum(["HIDDEN", "BORDER", "SHADOW", "RING"]),
    })
    .optional(),
  summary: z.string().min(10).max(1000).optional(),
  profiles: z.array(profileSchema).optional(),
  experiences: z.array(experienceSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  projects: z.array(projectSchema).optional(),
  education: z.array(educationSchema).optional(),
  customSections: z.array(customSectionSchema).optional(),
  customFields: z.array(customFieldSchema).optional(),
});
