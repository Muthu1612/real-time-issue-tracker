"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes with dependency injection
const express_1 = require("express");
const issues_controller_1 = require("../controllers/issues.controller");
const issues_service_1 = require("../services/issues.service");
const issue_repository_1 = require("../repositories/issue.repository");
const prisma_1 = __importDefault(require("../prisma"));
// Dependency injection setup
const issueRepository = new issue_repository_1.IssueRepository(prisma_1.default);
const issueService = new issues_service_1.IssueService(issueRepository);
const issueController = new issues_controller_1.IssueController(issueService);
const router = (0, express_1.Router)();
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getIssueById);
router.post("/", issueController.createIssue);
router.put("/:id", issueController.updateIssue);
router.delete("/:id", issueController.deleteIssue);
exports.default = router;
//# sourceMappingURL=issues.routes.js.map