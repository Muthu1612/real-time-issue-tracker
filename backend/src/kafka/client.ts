import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "issue-tracker",
  brokers: [process.env.KAFKA_BROKER || "localhost:29092"],
});