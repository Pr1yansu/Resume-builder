import express from "express";
import {
  createResumeNameSlug,
  editResumeDetails,
  getAllResume,
  getResumeById,
  updateResumeVariant,
  addProfile,
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

export default router;
