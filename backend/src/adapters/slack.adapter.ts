import { Request, Response } from "express";
import { CreateIssueFromSlackDTO } from "../dtos/slack.dto";
import { IIssueService } from "../interfaces/IIssueService";
import { asyncHandler } from "../middlewares/error.middleware";
import { SlackIssueMapper } from "../mappers/slack.mapper";
import { ValidationError } from "../utils/errors";

export class SlackAdapter {
  constructor(private readonly issueService: IIssueService) {}

  handleSlackWebhook = asyncHandler(async (req: Request, res: Response) => {
    const payload: CreateIssueFromSlackDTO = req.body;

    // Validate payload structure exists
    if (!payload || typeof payload !== "object") {
      throw new ValidationError("Invalid Slack webhook payload");
    }

    // Map and validate Slack payload to internal DTO
    const dto = SlackIssueMapper.toCreateIssueDto(payload);

    // Create issue via service layer
    const issue = await this.issueService.createIssue(dto);

    // Return Slack-formatted response
    return res.status(200).json({
      text: `✅ Issue created: *${issue.title}* (ID: ${issue.id})`,
      response_type: "in_channel",
    });
  });
}


