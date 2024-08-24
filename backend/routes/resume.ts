import express from "express";
import {
  createResumeNameSlug,
  editResumeDetails,
  getAllResume,
  getResumeById,
  updateResumeVariant,
  addProfile,
  updateProfile,
  addExperience,
  updateExperience,
  addSkill,
  updateSkill,
  addEducation,
  addLanguage,
  updateEducation,
  updateLanguage,
} from "../controllers/resume";
import { checkAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/", checkAuthenticated, getAllResume);
router.get("/:resumeId", checkAuthenticated, getResumeById);
router.post("/create", checkAuthenticated, createResumeNameSlug);
router.put("/edit/:resumeId", checkAuthenticated, editResumeDetails);
router.put(
  "/update-variant/:resumeId",
  checkAuthenticated,
  updateResumeVariant
);
router.put("/add-profile/:resumeId", checkAuthenticated, addProfile);
router.put(
  "/update-profile/:resumeId/:profileId",
  checkAuthenticated,
  updateProfile
);
router.put("/add-experience/:resumeId", checkAuthenticated, addExperience);
router.put(
  "/update-experience/:resumeId/:experienceId",
  checkAuthenticated,
  updateExperience
);
router.put("/add-skill/:resumeId", checkAuthenticated, addSkill);
router.put("/update-skill/:resumeId/:skillId", checkAuthenticated, updateSkill);
router.put("/add-education/:resumeId", checkAuthenticated, addEducation);
router.put(
  "/update-education/:resumeId/:educationId",
  checkAuthenticated,
  updateEducation
);
router.put("/add-language/:resumeId", checkAuthenticated, addLanguage);
router.put(
  "/update-language/:resumeId/:languageId",
  checkAuthenticated,
  updateLanguage
);

export default router;
