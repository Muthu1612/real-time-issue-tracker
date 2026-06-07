"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncTopics = syncTopics;
const client_1 = require("./client");
const topic_loader_1 = require("./topic.loader");
async function syncTopics() {
    const admin = client_1.kafka.admin();
    await admin.connect();
    const existingTopics = await admin.listTopics();
    const configs = (0, topic_loader_1.loadTopicConfigs)();
    const topicsToCreate = configs
        .filter((t) => !existingTopics.includes(t.name))
        .map((t) => ({
        topic: t.name,
        numPartitions: t.partitions,
        replicationFactor: t.replicationFactor,
        configEntries: Object.entries(t.config || {}).map(([name, value]) => ({
            name,
            value: String(value), // Convert to string for KafkaJS
        })),
    }));
    if (topicsToCreate.length > 0) {
        await admin.createTopics({
            topics: topicsToCreate,
        });
        console.log("✅ Topics created:", topicsToCreate.map(t => t.topic));
    }
    else {
        console.log("✅ Topics already synced");
    }
    await admin.disconnect();
}
//# sourceMappingURL=topic-manager.js.map