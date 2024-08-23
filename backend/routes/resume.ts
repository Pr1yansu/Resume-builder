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

export default router;
