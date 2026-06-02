import express from "express";
import { checkPlagiarism } from "../controllers/plagiarismController.js";

const router = express.Router();

router.post("/check", checkPlagiarism);

export default router;