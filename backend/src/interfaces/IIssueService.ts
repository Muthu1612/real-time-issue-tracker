// Service interface - business logic abstraction
import { IssueResponseDto, CreateIssueDto, UpdateIssueDto } from "../dtos/issue.dto";

export interface IIssueService {
  getAllIssues(): Promise<IssueResponseDto[]>;
  getIssueById(id: number): Promise<IssueResponseDto>;
  createIssue(data: CreateIssueDto): Promise<IssueResponseDto>;
  updateIssue(id: number, data: UpdateIssueDto): Promise<IssueResponseDto>;
  deleteIssue(id: number): Promise<void>;
}
