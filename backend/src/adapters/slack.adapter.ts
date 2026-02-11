import { Request, Response } from "express";
import { CreateIssueFromSlackDTO } from "../dtos/slack.dto";
import { IIssueService } from "../interfaces/IIssueService";
import { asyncHandler } from "../middlewares/error.middleware";
import { SlackIssueMapper } from "../mappers/slack.mapper";
import { slackClient } from "../integrations/slack/slack.client";
import { createIssueModal } from "../integrations/slack/slack.modal";
import { ValidationError } from "../utils/errors";

/**
 * Slack Adapter - Handles all Slack-specific interactions
 * Responsibilities:
 * - Route different Slack event types to appropriate handlers
 * - Transform Slack payloads to domain models via mappers
 * - Delegate business logic to service layer
 * - Format responses for Slack API
 */
export class SlackAdapter {
  constructor(private readonly issueService: IIssueService) {}

  /**
   * Main webhook handler - routes Slack events to specific handlers
   */
  handleSlackWebhook = asyncHandler(async (req: Request, res: Response) => {
    // Slack sends modal submissions as form data with payload string
    // Slash commands come as plain form data
    const payload = req.body.payload
      ? JSON.parse(req.body.payload)
      : req.body;

    // Validate payload structure exists
    if (!payload || typeof payload !== "object") {
      throw new ValidationError("Invalid Slack webhook payload");
    }

    // Route to appropriate handler based on payload type
    if (this.isSlashCommand(payload)) {
      return this.handleSlashCommand(payload, res);
    }

    if (this.isModalSubmission(payload)) {
      return this.handleModalSubmission(payload, res);
    }

    // Fallback: legacy text-based webhook
    if (this.isLegacyWebhook(payload)) {
      return this.handleLegacyWebhook(payload, res);
    }

    throw new ValidationError("Unsupported Slack event type");
  });

  /**
   * Handles /issue slash command - opens modal
   */
  private handleSlashCommand = async (
    payload: any,
    res: Response
  ): Promise<Response> => {
    // Open modal for user to fill in issue details
    await slackClient.views.open({
      trigger_id: payload.trigger_id,
      view: createIssueModal(),
    });

    // Respond immediately to avoid timeout
    return res.status(200).send();
  };

  /**
   * Handles modal submission - creates issue from structured data
   */
  private handleModalSubmission = async (
    payload: any,
    res: Response
  ): Promise<Response> => {
    const values = payload.view.state.values;

    // Extract values from modal submission
    const title = values.title_block.title_input.value;
    const description = values.desc_block.desc_input.value;
    const type = values.type_block.type_select.selected_option.value;
    const reporter = payload.user.username;

    // Enhance description with reporter information
    const enhancedDescription = description
      ? `${description}\n\n_Reported by: ${reporter} via Slack_`
      : `_Reported by: ${reporter} via Slack_`;

    // Create issue via service layer
    const issue = await this.issueService.createIssue({
      title,
      description: enhancedDescription,
      type,
    });

    // Return response to close modal
    return res.json({
      response_action: "clear", // Closes modal on success
    });
  };

  /**
   * Legacy handler for direct text-based webhooks
   */
  private handleLegacyWebhook = async (
    payload: CreateIssueFromSlackDTO,
    res: Response
  ): Promise<Response> => {
    // Map and validate Slack payload to internal DTO
    const dto = SlackIssueMapper.toCreateIssueDto(payload);

    // Create issue via service layer
    const issue = await this.issueService.createIssue(dto);

    // Return Slack-formatted response
    return res.status(200).json({
      text: `✅ Issue created: *${issue.title}* (ID: ${issue.id})`,
      response_type: "in_channel",
    });
  };

  // Type guards for routing
  private isSlashCommand(payload: any): boolean {
    return payload.command === "/issue";
  }

  private isModalSubmission(payload: any): boolean {
    return (
      payload.type === "view_submission" &&
      payload.view?.callback_id === "create_issue_modal"
    );
  }

  private isLegacyWebhook(payload: any): boolean {
    return payload.text && payload.user_name && payload.channel_name;
  }
}


