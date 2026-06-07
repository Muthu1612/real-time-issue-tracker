"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueService = void 0;
const errors_1 = require("../utils/errors");
class IssueService {
    constructor(issueRepository) {
        this.issueRepository = issueRepository;
    }
    async getAllIssues() {
        const issues = await this.issueRepository.findAll();
        return issues;
    }
    async getIssueById(id) {
        const issue = await this.issueRepository.findById(id);
        if (!issue) {
            throw new errors_1.NotFoundError(`Issue with id ${id} not found`);
        }
        return issue;
    }
    async createIssue(data) {
        const issue = await this.issueRepository.create(data);
        return issue;
    }
    async updateIssue(id, data) {
        // Check if issue exists
        await this.getIssueById(id);
        const updatedIssue = await this.issueRepository.update(id, data);
        return updatedIssue;
    }
    async deleteIssue(id) {
        // Check if issue exists
        await this.getIssueById(id);
        await this.issueRepository.delete(id);
    }
}
exports.IssueService = IssueService;
//# sourceMappingURL=issues.service.js.map