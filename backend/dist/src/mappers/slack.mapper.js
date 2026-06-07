"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackIssueMapper = void 0;
const errors_1 = require("../utils/errors");
class SlackIssueMapper {
    static toCreateIssueDto(payload) {
        // Validate required fields
        this.validatePayload(payload);
        const parts = payload.text.trim().split(" ");
        // Extract type from last word if it matches valid types
        const lastWord = (parts[parts.length - 1] ?? "").toUpperCase();
        const isValidType = this.VALID_TYPES.includes(lastWord);
        const type = isValidType ? lastWord : "TASK";
        const title = isValidType
            ? parts.slice(0, -1).join(" ").trim()
            : payload.text.trim();
        // Validate title is not empty after extraction
        if (!title) {
            throw new errors_1.ValidationError("Issue title cannot be empty");
        }
        return {
            title,
            type,
            description: `Created from Slack by ${payload.user_name} in #${payload.channel_name}`,
        };
    }
    static validatePayload(payload) {
        if (!payload.text || payload.text.trim().length === 0) {
            throw new errors_1.ValidationError("Slack message text is required");
        }
        if (!payload.user_name) {
            throw new errors_1.ValidationError("Slack user_name is required");
        }
        if (!payload.channel_name) {
            throw new errors_1.ValidationError("Slack channel_name is required");
        }
        if (payload.text.trim().length > 500) {
            throw new errors_1.ValidationError("Issue title is too long (max 500 characters)");
        }
    }
}
exports.SlackIssueMapper = SlackIssueMapper;
SlackIssueMapper.VALID_TYPES = ["BUG", "FEATURE", "TASK"];
//# sourceMappingURL=slack.mapper.js.map