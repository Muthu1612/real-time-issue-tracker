"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middlewares/error.middleware");
class IssueController {
    constructor(issueService) {
        this.issueService = issueService;
        this.getAllIssues = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const issues = await this.issueService.getAllIssues();
            res.status(200).json(response_1.ResponseFormatter.success(issues));
        });
        this.getIssueById = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
            const issue = await this.issueService.getIssueById(id);
            res.status(200).json(response_1.ResponseFormatter.success(issue));
        });
        this.createIssue = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const issue = await this.issueService.createIssue(req.body);
            res.status(201).json(response_1.ResponseFormatter.success(issue, "Issue created successfully"));
        });
        this.updateIssue = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
            const issue = await this.issueService.updateIssue(id, req.body);
            res.status(200).json(response_1.ResponseFormatter.success(issue, "Issue updated successfully"));
        });
        this.deleteIssue = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
            await this.issueService.deleteIssue(id);
            res.status(200).json(response_1.ResponseFormatter.success(null, "Issue deleted successfully"));
        });
    }
}
exports.IssueController = IssueController;
//# sourceMappingURL=issues.controller.js.map