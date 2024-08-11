import mongoose from "mongoose";

const resumeNameSlugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  slug: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
});

const customFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  value: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const profileSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  url: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  company: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  location: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 200,
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  level: {
    type: String,
    required: true,
    enum: ["Basic", "Conversational", "Fluent", "Native"],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  url: {
    type: String,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const customSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  items: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
});

const educationSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  degree: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  fieldOfStudy: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const resumeSchema = new mongoose.Schema({
  variant: {
    type: String,
    enum: ["blank", "classic", "modern", "elegant", "professional", "creative"],
    default: "blank",
  },
  resumeNameSlug: resumeNameSlugSchema,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  avatar: {
    url: {
      type: String,
    },
    size: {
      type: Number,
      min: 0,
      max: 5000,
    },
    aspectRatio: {
      type: String,
      enum: ["SQUARE", "PORTRAIT", "LANDSCAPE"],
      default: "SQUARE",
    },
    borderRadius: {
      type: String,
      enum: ["NONE", "SM", "MD", "LG", "FULL"],
      default: "NONE",
    },
    effects: {
      type: String,
      enum: ["HIDDEN", "BORDER", "SHADOW", "RING"],
      default: "HIDDEN",
    },
  },
  fullName: {
    type: String,
    minLength: 3,
    maxLength: 100,
  },
  headline: {
    type: String,
    minLength: 3,
    maxLength: 200,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
    minLength: 2,
    maxLength: 100,
  },
  summary: {
    type: String,
    minLength: 10,
    maxLength: 1000,
  },
  customFields: [customFieldSchema],
  profiles: [profileSchema],
  experiences: [experienceSchema],
  skills: [skillSchema],
  languages: [languageSchema],
  projects: [projectSchema],
  education: [educationSchema],
  customSections: [customSectionSchema],
});

const Resume = mongoose.model("Resume", resumeSchema);
const ResumeNameSlug = mongoose.model("ResumeNameSlug", resumeNameSlugSchema);
const CustomField = mongoose.model("CustomField", customFieldSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Experience = mongoose.model("Experience", experienceSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Language = mongoose.model("Language", languageSchema);
const Project = mongoose.model("Project", projectSchema);
const CustomSection = mongoose.model("CustomSection", customSectionSchema);
const Education = mongoose.model("Education", educationSchema);

export {
  Resume,
  ResumeNameSlug,
  CustomField,
  Profile,
  Experience,
  Skill,
  Language,
  Project,
  CustomSection,
  Education,
};
