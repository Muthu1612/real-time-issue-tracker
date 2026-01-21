export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

export type IssueType = 'BUG' | 'FEATURE' | 'TASK';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  type: IssueType;
  createdAt: Date;
  assignedTo?: string;
}
