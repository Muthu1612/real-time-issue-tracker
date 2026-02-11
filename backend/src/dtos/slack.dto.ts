// DTOs for type-safe data transfer
import { Issue, User } from "@prisma/client";
import { PrismaClient, IssueStatus, IssueType } from "@prisma/client";

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
