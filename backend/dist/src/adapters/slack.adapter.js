"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackAdapter = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const slack_mapper_1 = require("../mappers/slack.mapper");
const slack_client_1 = require("../integrations/slack/slack.client");
const slack_modal_1 = require("../integrations/slack/slack.modal");
const errors_1 = require("../utils/errors");
/**
 * Slack Adapter - Handles all Slack-specific interactions
 * Responsibilities:
 * - Route different Slack event types to appropriate handlers
 * - Transform Slack payloads to domain models via mappers
 * - Delegate business logic to service layer
 * - Format responses for Slack API
 */
class SlackAdapter {
    constructor(issueService) {
        this.issueService = issueService;
        /**
         * Main webhook handler - routes Slack events to specific handlers
         */
        this.handleSlackWebhook = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            // Slack sends modal submissions as form data with payload string
            // Slash commands come as plain form data
            const payload = req.body.payload
                ? JSON.parse(req.body.payload)
                : req.body;
            // Validate payload structure exists
            if (!payload || typeof payload !== "object") {
                throw new errors_1.ValidationError("Invalid Slack webhook payload");
            }
            // Slack Events API URL verification handshake
            if (payload.type === "url_verification" && payload.challenge) {
                return res.status(200).json({ challenge: payload.challenge });
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
            throw new errors_1.ValidationError("Unsupported Slack event type");
        });
        /**
         * Handles /issue slash command - opens modal
         */
        this.handleSlashCommand = async (payload, res) => {
            // Open modal for user to fill in issue details
            await slack_client_1.slackClient.views.open({
                trigger_id: payload.trigger_id,
                view: (0, slack_modal_1.createIssueModal)(),
            });
            // Respond immediately to avoid timeout
            return res.status(200).send();
        };
        /**
         * Handles modal submission - creates issue from structured data
         */
        this.handleModalSubmission = async (payload, res) => {
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
        this.handleLegacyWebhook = async (payload, res) => {
            // Map and validate Slack payload to internal DTO
            const dto = slack_mapper_1.SlackIssueMapper.toCreateIssueDto(payload);
            // Create issue via service layer
            const issue = await this.issueService.createIssue(dto);
            // Return Slack-formatted response
            return res.status(200).json({
                text: `✅ Issue created: *${issue.title}* (ID: ${issue.id})`,
                response_type: "in_channel",
            });
        };
    }
    // Type guards for routing
    isSlashCommand(payload) {
        return payload.command === "/issue";
    }
    isModalSubmission(payload) {
        return (payload.type === "view_submission" &&
            payload.view?.callback_id === "create_issue_modal");
    }
    isLegacyWebhook(payload) {
        return payload.text && payload.user_name && payload.channel_name;
    }
}
exports.SlackAdapter = SlackAdapter;
//# sourceMappingURL=slack.adapter.js.map