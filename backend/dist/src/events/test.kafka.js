"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../kafka/client");
const topic_manager_1 = require("../kafka/topic-manager");
const topics_1 = require("../kafka/topics");
async function testProducerConsumer() {
    console.log("========================================");
    console.log("Kafka Producer/Consumer Test");
    console.log("========================================\n");
    try {
        // Step 1: Sync topics (create if not exists)
        console.log("📋 Step 1: Syncing topics...");
        await (0, topic_manager_1.syncTopics)();
        console.log("✅ Topics ready\n");
        // Step 2: Setup consumer
        console.log("📋 Step 2: Setting up consumer...");
        const consumer = client_1.kafka.consumer({ groupId: "test-group" });
        await consumer.connect();
        console.log("✅ Consumer connected");
        await consumer.subscribe({
            topic: topics_1.TOPICS.ISSUE_CREATED,
            fromBeginning: true
        });
        console.log(`✅ Consumer subscribed to: ${topics_1.TOPICS.ISSUE_CREATED}\n`);
        let messageReceived = false;
        // Run consumer
        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("\n📨 Message Received:");
                console.log("  Topic:", topic);
                console.log("  Partition:", partition);
                console.log("  Offset:", message.offset);
                console.log("  Key:", message.key?.toString());
                console.log("  Value:", message.value?.toString());
                console.log("  Timestamp:", message.timestamp);
                messageReceived = true;
            },
        });
        // Step 3: Setup producer
        console.log("📋 Step 3: Setting up producer...");
        const producer = client_1.kafka.producer();
        await producer.connect();
        console.log("✅ Producer connected\n");
        // Step 4: Send test messages
        console.log("📋 Step 4: Sending test messages...");
        const testMessages = [
            {
                key: "issue-001",
                value: JSON.stringify({
                    id: "issue-001",
                    title: "Fix critical bug in authentication",
                    status: "open",
                    priority: "high",
                    createdAt: new Date().toISOString(),
                }),
            },
            {
                key: "issue-002",
                value: JSON.stringify({
                    id: "issue-002",
                    title: "Update documentation for API v2",
                    status: "open",
                    priority: "medium",
                    createdAt: new Date().toISOString(),
                }),
            },
        ];
        for (const msg of testMessages) {
            await producer.send({
                topic: topics_1.TOPICS.ISSUE_CREATED,
                messages: [msg],
            });
            console.log(`  ✅ Sent message with key: ${msg.key}`);
        }
        console.log(`\n✅ Successfully sent ${testMessages.length} messages\n`);
        // Wait for messages to be consumed
        console.log("⏳ Waiting for messages to be consumed (5 seconds)...\n");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Cleanup
        console.log("📋 Cleaning up...");
        await producer.disconnect();
        console.log("  ✅ Producer disconnected");
        await consumer.disconnect();
        console.log("  ✅ Consumer disconnected");
        console.log("\n========================================");
        if (messageReceived) {
            console.log("✅ TEST PASSED: Producer/Consumer working!");
        }
        else {
            console.log("⚠️  TEST WARNING: No messages received by consumer");
        }
        console.log("========================================");
        process.exit(0);
    }
    catch (error) {
        console.error("\n❌ TEST FAILED:", error);
        process.exit(1);
    }
}
// Run the test
testProducerConsumer();
//# sourceMappingURL=test.kafka.js.map