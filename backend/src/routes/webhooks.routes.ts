// Routes with dependency injection
import { Router } from "express";
import { SlackAdapter } from "../adapters/slack.adapter";
import { IssueService } from "../services/issues.service";
import { IssueRepository } from "../repositories/issue.repository";
import prisma from "../prisma";

// Dependency injection setup
const issueRepository = new IssueRepository(prisma);
const issueService = new IssueService(issueRepository);
const slackAdapter = new SlackAdapter(issueService);

const router = Router();

router.post("/slack", slackAdapter.handleSlackWebhook);

export default router;
