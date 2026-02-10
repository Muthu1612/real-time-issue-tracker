import { CreateIssueFromSlackDTO } from "../dtos/slack.dto";
import { CreateIssueDto } from "../dtos/issue.dto";
import { ValidationError } from "../utils/errors";

export class SlackIssueMapper {
  private static readonly VALID_TYPES = ["BUG", "FEATURE", "TASK"] as const;

  static toCreateIssueDto(payload: CreateIssueFromSlackDTO): CreateIssueDto {
    // Validate required fields
    this.validatePayload(payload);

    const parts = payload.text.trim().split(" ");
    
    // Extract type from last word if it matches valid types
    const lastWord = (parts[parts.length - 1] ?? "").toUpperCase();
    const isValidType = this.VALID_TYPES.includes(lastWord as any);
    
    const type = isValidType ? lastWord : "TASK";
    const title = isValidType 
      ? parts.slice(0, -1).join(" ").trim() 
      : payload.text.trim();

    // Validate title is not empty after extraction
    if (!title) {
      throw new ValidationError("Issue title cannot be empty");
    }

    return {
      title,
      type,
      description: `Created from Slack by ${payload.user_name} in #${payload.channel_name}`,
    };
  }

  private static validatePayload(payload: CreateIssueFromSlackDTO): void {
    if (!payload.text || payload.text.trim().length === 0) {
      throw new ValidationError("Slack message text is required");
    }

    if (!payload.user_name) {
      throw new ValidationError("Slack user_name is required");
    }

    if (!payload.channel_name) {
      throw new ValidationError("Slack channel_name is required");
    }

    if (payload.text.trim().length > 500) {
      throw new ValidationError("Issue title is too long (max 500 characters)");
    }
  }
}
