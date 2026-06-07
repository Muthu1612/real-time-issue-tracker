"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes with dependency injection
const express_1 = require("express");
const slack_adapter_1 = require("../adapters/slack.adapter");
const issues_service_1 = require("../services/issues.service");
const issue_repository_1 = require("../repositories/issue.repository");
const prisma_1 = __importDefault(require("../prisma"));
// Dependency injection setup
const issueRepository = new issue_repository_1.IssueRepository(prisma_1.default);
const issueService = new issues_service_1.IssueService(issueRepository);
const slackAdapter = new slack_adapter_1.SlackAdapter(issueService);
const router = (0, express_1.Router)();
router.post("/slack", slackAdapter.handleSlackWebhook);
exports.default = router;
//# sourceMappingURL=webhooks.routes.js.map