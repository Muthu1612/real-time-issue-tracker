// DTOs for type-safe data transfer
import { Issue, User } from "@prisma/client";
import { PrismaClient, IssueStatus, IssueType } from "@prisma/client";

export interface IssueResponseDto extends Omit<Issue, 'assigned'> {
  assigned: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export interface CreateIssueDto {
  title: string;
  description?: string;
  type: string; // "BUG" | "FEATURE" | "TASK"
  status?: IssueStatus;
  assignedTo?: number;
}

export interface UpdateIssueDto {
  title?: string;
  description?: string;
  type?: string; // "BUG" | "FEATURE" | "TASK"
  status?: IssueStatus;
  assignedTo?: number;
}
