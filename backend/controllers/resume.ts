import { catchAsync } from "../lib/error";
import { Resume, ResumeNameSlug } from "../schema/resume";
import User from "../schema/user";
import type { UserDocument } from "../schema/user";
import type { Request, Response } from "express";
import type {
  EducationType,
  ExperienceType,
  LanguageType,
  ProfileType,
  ResumeType,
  SkillType,
} from "../types";

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

export const getAllResume = catchAsync(async (req: Request, res: Response) => {
  const resumes = await Resume.find();

  if (!resumes) {
    return res.status(404).json({
      status: 404,
      message: "Resumes not found",
    });
  }

  return res.status(200).json({
    status: 200,
    data: {
      resumes,
    },
  });
});

export const getResumeById = catchAsync(
  async (
    req: Request<{
      resumeId: string;
    }>,
    res: Response
  ) => {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      status: 200,
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
      ResumeType
    >,
    res: Response
  ) => {
    const {
      fullName,
      headline,
      location,
      email,
      phone,
      website,
      avatar,
      summary,
    } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        fullName,
        headline,
        location,
        email,
        phone,
        website,
        avatar,
        summary,
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateResumeVariant = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      {
        variant: string;
      }
    >,
    res: Response
  ) => {
    const { variant } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        variant,
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const addProfile = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      ProfileType
    >,
    res: Response
  ) => {
    const { network, url, username, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    resume.profiles.push({
      network,
      url,
      username,
      hidden,
    });

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateProfile = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
        profileId: string;
      },
      {},
      ProfileType
    >,
    res: Response
  ) => {
    const { network, url, username, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const profileIndex = resume.profiles.findIndex((profile) => {
      if (!profile._id) {
        return false;
      }
      return profile._id.toString() === req.params.profileId;
    });

    if (profileIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Profile not found",
      });
    }

    await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        $set: {
          "profiles.$[profile]": {
            network,
            url,
            username,
            hidden,
          },
        },
      },
      {
        arrayFilters: [{ "profile._id": req.params.profileId }],
      }
    );

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const addExperience = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      ExperienceType
    >,
    res: Response
  ) => {
    const { title, company, location, startDate, endDate, description } =
      req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    resume.experiences.push({
      title,
      company,
      location,
      startDate,
      endDate,
      description,
    });

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateExperience = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
        experienceId: string;
      },
      {},
      ExperienceType
    >,
    res: Response
  ) => {
    const { title, company, location, startDate, endDate, description } =
      req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const experienceIndex = resume.experiences.findIndex((experience) => {
      if (!experience._id) {
        return false;
      }
      return experience._id.toString() === req.params.experienceId;
    });

    if (experienceIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Experience not found",
      });
    }

    await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        $set: {
          "experiences.$[experience]": {
            title,
            company,
            location,
            startDate,
            endDate,
            description,
          },
        },
      },
      {
        arrayFilters: [{ "experience._id": req.params.experienceId }],
      }
    );

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const addSkill = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      SkillType
    >,
    res: Response
  ) => {
    const { level, name, description, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    resume.skills.push({
      level,
      name,
      description,
      hidden,
    });

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateSkill = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
        skillId: string;
      },
      {},
      SkillType
    >,
    res: Response
  ) => {
    const { level, name, description, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const skillIndex = resume.skills.findIndex((skill) => {
      if (!skill._id) {
        return false;
      }
      return skill._id.toString() === req.params.skillId;
    });

    if (skillIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Skill not found",
      });
    }

    await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        $set: {
          "skills.$[skill]": {
            level,
            name,
            description,
            hidden,
          },
        },
      },
      {
        arrayFilters: [{ "skill._id": req.params.skillId }],
      }
    );

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const addEducation = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      EducationType
    >,
    res: Response
  ) => {
    const {
      degree,
      description,
      endDate,
      fieldOfStudy,
      institute,
      startDate,
      hidden,
    } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    resume.education.push({
      degree,
      description,
      endDate,
      fieldOfStudy,
      institute,
      startDate,
      hidden,
    });

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateEducation = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
        educationId: string;
      },
      {},
      EducationType
    >,
    res: Response
  ) => {
    const {
      degree,
      description,
      endDate,
      fieldOfStudy,
      institute,
      startDate,
      hidden,
    } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const educationIndex = resume.education.findIndex((education) => {
      if (!education._id) {
        return false;
      }
      return education._id.toString() === req.params.educationId;
    });

    if (educationIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Education not found",
      });
    }

    await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        $set: {
          "education.$[education]": {
            degree,
            description,
            endDate,
            fieldOfStudy,
            institute,
            startDate,
            hidden,
          },
        },
      },
      {
        arrayFilters: [{ "education._id": req.params.educationId }],
      }
    );

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const addLanguage = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
      },
      {},
      LanguageType
    >,
    res: Response
  ) => {
    const { level, name, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    resume.languages.push({
      level,
      name,
      hidden,
    });

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);

export const updateLanguage = catchAsync(
  async (
    req: Request<
      {
        resumeId: string;
        languageId: string;
      },
      {},
      LanguageType
    >,
    res: Response
  ) => {
    const { level, name, hidden } = req.body;

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        status: 404,
        message: "Resume not found",
      });
    }

    const languageIndex = resume.languages.findIndex((language) => {
      if (!language._id) {
        return false;
      }
      return language._id.toString() === req.params.languageId;
    });

    if (languageIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Language not found",
      });
    }

    await Resume.findByIdAndUpdate(
      req.params.resumeId,
      {
        $set: {
          "languages.$[language]": {
            level,
            name,
            hidden,
          },
        },
      },
      {
        arrayFilters: [{ "language._id": req.params.languageId }],
      }
    );

    const updatedResume = await resume.save();

    if (!updatedResume) {
      return res.status(500).json({
        status: 500,
        message: "Resume not updated",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Resume updated",
      data: {
        resume: updatedResume,
      },
    });
  }
);
