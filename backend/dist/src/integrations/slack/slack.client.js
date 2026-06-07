"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackClient = void 0;
// src/integrations/slack/slack.client.ts
const web_api_1 = require("@slack/web-api");
exports.slackClient = new web_api_1.WebClient(process.env.SLACK_BOT_TOKEN);
//# sourceMappingURL=slack.client.js.map