"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIssueModal = createIssueModal;
// src/integrations/slack/slack.modal.ts
function createIssueModal() {
    return {
        type: "modal",
        callback_id: "create_issue_modal",
        title: {
            type: "plain_text",
            text: "Create Issue"
        },
        submit: {
            type: "plain_text",
            text: "Create"
        },
        close: {
            type: "plain_text",
            text: "Cancel"
        },
        blocks: [
            {
                type: "input",
                block_id: "title_block",
                label: { type: "plain_text", text: "Title" },
                element: {
                    type: "plain_text_input",
                    action_id: "title_input"
                }
            },
            {
                type: "input",
                block_id: "desc_block",
                label: { type: "plain_text", text: "Description" },
                element: {
                    type: "plain_text_input",
                    multiline: true,
                    action_id: "desc_input"
                }
            },
            {
                type: "input",
                block_id: "type_block",
                label: { type: "plain_text", text: "Type" },
                element: {
                    type: "static_select",
                    action_id: "type_select",
                    options: [
                        { text: { type: "plain_text", text: "Bug" }, value: "BUG" },
                        { text: { type: "plain_text", text: "Feature" }, value: "FEATURE" },
                        { text: { type: "plain_text", text: "Task" }, value: "TASK" }
                    ]
                }
            }
        ]
    };
}
//# sourceMappingURL=slack.modal.js.map