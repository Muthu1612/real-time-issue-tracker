// Controller with dependency injection and proper error handling
import { Request, Response, NextFunction } from "express";
import { IIssueService } from "../interfaces/IIssueService";
import { ResponseFormatter } from "../utils/response";
import { asyncHandler } from "../middlewares/error.middleware";

export class IssueController {
  constructor(private readonly issueService: IIssueService) {}

  getAllIssues = asyncHandler(async (req: Request, res: Response) => {
    const issues = await this.issueService.getAllIssues();
    res.status(200).json(ResponseFormatter.success(issues));
  });

  getIssueById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
    const issue = await this.issueService.getIssueById(id);
    res.status(200).json(ResponseFormatter.success(issue));
  });

  createIssue = asyncHandler(async (req: Request, res: Response) => {
    const issue = await this.issueService.createIssue(req.body);
    res.status(201).json(ResponseFormatter.success(issue, "Issue created successfully"));
  });

  updateIssue = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
    const issue = await this.issueService.updateIssue(id, req.body);
    res.status(200).json(ResponseFormatter.success(issue, "Issue updated successfully"));
  });

  deleteIssue = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt((Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "0");
    await this.issueService.deleteIssue(id);
    res.status(200).json(ResponseFormatter.success(null, "Issue deleted successfully"));
  });
}

