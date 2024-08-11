import { catchAsync } from "../lib/error";
import {
  CustomField,
  CustomSection,
  Education,
  Experience,
  Language,
  Profile,
  Project,
  Resume,
  ResumeNameSlug,
  Skill,
} from "../schema/resume";
import User from "../schema/user";
import type { UserDocument } from "../schema/user";
import type { NextFunction, Request, Response } from "express";

export const createResumeNameSlug = catchAsync(
  async (
    req: Request<
      {},
      {},
      {
        name: string;
        slug: string;
      }
    >,
    res: Response
  ) => {
    const user = req.user as UserDocument;
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({
        status: 400,
        message: "Name and slug are required",
      });
    }
    const isExist = await ResumeNameSlug.exists({ slug });
    if (isExist) {
      return res.status(400).json({
        status: 400,
        message: "Slug already exists",
      });
    }
    const resumeNameSlug = await ResumeNameSlug.create({ name, slug });

    const resume = await Resume.create({
      user: dbUser._id,
      resumeNameSlug: {
        name: resumeNameSlug.name,
        slug: resumeNameSlug.slug,
      },
      fullName: dbUser.name,
      avatar: {
        url: dbUser.avatar,
      },
    });

    dbUser.resumes.push(resume._id);
    await dbUser.save();
    if (!resume || !dbUser) {
      throw new Error("Resume not created");
    }
    return res.status(201).json({
      status: 201,
      message: "Resume created",
      data: {
        resume,
      },
    });
  }
);

export const editResumeDetails = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      {
        variant?:
          | "blank"
          | "classic"
          | "modern"
          | "elegant"
          | "professional"
          | "creative";
        fullName?: string;
        headline?: string;
        email?: string;
        website?: string;
        location?: string;
        summary?: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).send({
        status: 404,
        message: "Resume Not Found",
      });
    }

    const { email, fullName, headline, location, summary, variant, website } =
      req.body;

    const updatedResume = await Resume.findByIdAndUpdate(req.params.resumeId, {
      variant: variant ? variant : "blank",
      fullName: fullName ? fullName : resume.fullName,
      email: email ? email : resume.email,
      headline: headline ? headline : resume.headline,
      location: location ? location : resume.location,
      summary: summary ? summary : resume.summary,
      website: website ? website : resume.website,
    });

    if (!updatedResume)
      return res.status(400).json({
        status: 201,
        message: "Resume updated failed",
      });

    req.io.emit("edit_resume", {
      updatedResume,
    });

    return res.status(201).json({
      status: 201,
      message: "Resume updated",
    });
  }
);
