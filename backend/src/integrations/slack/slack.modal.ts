// src/integrations/slack/slack.modal.ts
export function createIssueModal() {
  return {
    type: "modal" as const,
    callback_id: "create_issue_modal",
    title: {
      type: "plain_text" as const,
      text: "Create Issue"
    },
    submit: {
      type: "plain_text" as const,
      text: "Create"
    },
    close: {
      type: "plain_text" as const,
      text: "Cancel"
    },
    blocks: [
      {
        type: "input" as const,
        block_id: "title_block",
        label: { type: "plain_text" as const, text: "Title" },
        element: {
          type: "plain_text_input" as const,
          action_id: "title_input"
        }
      },
      {
        type: "input" as const,
        block_id: "desc_block",
        label: { type: "plain_text" as const, text: "Description" },
        element: {
          type: "plain_text_input" as const,
          multiline: true,
          action_id: "desc_input"
        }
      },
      {
        type: "input" as const,
        block_id: "type_block",
        label: { type: "plain_text" as const, text: "Type" },
        element: {
          type: "static_select" as const,
          action_id: "type_select",
          options: [
            { text: { type: "plain_text" as const, text: "Bug" }, value: "BUG" },
            { text: { type: "plain_text" as const, text: "Feature" }, value: "FEATURE" },
            { text: { type: "plain_text" as const, text: "Task" }, value: "TASK" }
          ]
        }
      }
    ]
  };
}
