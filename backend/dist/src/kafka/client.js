"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    clientId: "issue-tracker",
    brokers: [process.env.KAFKA_BROKER || "localhost:29092"],
});
//# sourceMappingURL=client.js.map