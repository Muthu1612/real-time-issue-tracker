// src/integrations/slack/slack.client.ts
import { WebClient } from "@slack/web-api";

export const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
