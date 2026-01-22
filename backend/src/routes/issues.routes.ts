// Routes with dependency injection
import { Router } from "express";
import { IssueController } from "../controllers/issues.controller";
import { IssueService } from "../services/issues.service";
import { IssueRepository } from "../repositories/issue.repository";
import prisma from "../prisma";

// Dependency injection setup
const issueRepository = new IssueRepository(prisma);
const issueService = new IssueService(issueRepository);
const issueController = new IssueController(issueService);

const router = Router();

router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getIssueById);
router.post("/", issueController.createIssue);
router.put("/:id", issueController.updateIssue);
router.delete("/:id", issueController.deleteIssue);

export default router;

