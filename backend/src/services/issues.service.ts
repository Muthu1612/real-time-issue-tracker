// Service implementation with dependency injection
import { IIssueService } from "../interfaces/IIssueService";
import { IIssueRepository } from "../interfaces/IIssueRepository";
import { IssueResponseDto, CreateIssueDto, UpdateIssueDto } from "../dtos/issue.dto";
import { NotFoundError } from "../utils/errors";

export class IssueService implements IIssueService {
  constructor(private readonly issueRepository: IIssueRepository) {}

  async getAllIssues(): Promise<IssueResponseDto[]> {
    const issues = await this.issueRepository.findAll();
    return issues;
  }

  async getIssueById(id: number): Promise<IssueResponseDto> {
    const issue = await this.issueRepository.findById(id);
    
    if (!issue) {
      throw new NotFoundError(`Issue with id ${id} not found`);
    }
    
    return issue;
  }

  async createIssue(data: CreateIssueDto): Promise<IssueResponseDto> {
    const issue = await this.issueRepository.create(data);
    return issue;
  }

  async updateIssue(id: number, data: UpdateIssueDto): Promise<IssueResponseDto> {
    // Check if issue exists
    await this.getIssueById(id);
    
    const updatedIssue = await this.issueRepository.update(id, data);
    return updatedIssue;
  }

  async deleteIssue(id: number): Promise<void> {
    // Check if issue exists
    await this.getIssueById(id);
    
    await this.issueRepository.delete(id);
  }
}

