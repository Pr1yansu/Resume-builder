import express from "express";
import { createResumeNameSlug } from "../controllers/resume";
import { checkAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/create", checkAuthenticated, createResumeNameSlug);

export default router;
