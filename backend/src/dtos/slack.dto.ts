// DTOs for type-safe data transfer
import { Issue, User } from "@prisma/client";
import { PrismaClient, IssueStatus, IssueType } from "@prisma/client";

/**
 * Legacy webhook payload (direct text-based issue creation)
 */
export interface CreateIssueFromSlackDTO {
  text: string;
  user_name: string;
  channel_name: string;
  title: string;
  description?: string;
  type: string; // "BUG" | "FEATURE" | "TASK"
  status?: IssueStatus;
  assignedTo?: number;
}

/**
 * Slash command payload structure
 */
export interface SlackSlashCommandPayload {
  command: string; // e.g., "/issue"
  trigger_id: string;
  user_id: string;
  user_name: string;
  channel_id: string;
  channel_name: string;
  text?: string;
}

/**
 * Modal submission payload structure
 */
export interface SlackModalSubmissionPayload {
  type: "view_submission";
  user: {
    id: string;
    username: string;
    name: string;
  };
  view: {
    callback_id: string;
    state: {
      values: {
        [blockId: string]: {
          [actionId: string]: {
            value?: string;
            selected_option?: {
              value: string;
              text: {
                type: string;
                text: string;
              };
            };
          };
        };
      };
    };
  };
}

