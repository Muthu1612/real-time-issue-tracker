export interface TopicConfig {
  name: string;
  partitions: number;
  replicationFactor: number;
  config?: Record<string, string>;
}