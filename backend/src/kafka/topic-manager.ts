import { kafka } from "./client";
import { loadTopicConfigs } from "./topic.loader";

export async function syncTopics() {
  const admin = kafka.admin();

  await admin.connect();

  const existingTopics = await admin.listTopics();
  const configs = loadTopicConfigs();

  const topicsToCreate = configs
    .filter((t) => !existingTopics.includes(t.name))
    .map((t) => ({
      topic: t.name,
      numPartitions: t.partitions,
      replicationFactor: t.replicationFactor,
      configEntries: Object.entries(t.config || {}).map(
        ([name, value]) => ({
          name,
          value: String(value), // Convert to string for KafkaJS
        })
      ),
    }));

  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate,
    });

    console.log("✅ Topics created:", topicsToCreate.map(t => t.topic));
  } else {
    console.log("✅ Topics already synced");
  }

  await admin.disconnect();
}