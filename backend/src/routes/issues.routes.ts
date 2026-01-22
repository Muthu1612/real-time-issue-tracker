import { Router } from "express";
import { getIssues } from "../controllers/issues.controller";

const router = Router();

router.get("/", getIssues);

export default router;
