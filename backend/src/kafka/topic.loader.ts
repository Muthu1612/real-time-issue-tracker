import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { TopicConfig } from "./interfaces/topic-config.interface";

export function loadTopicConfigs(): TopicConfig[] {
  const configDir = path.join(process.cwd(), "topic-config");

  const files = fs.readdirSync(configDir);

  return files.map((file) => {
    const filePath = path.join(configDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    return yaml.load(content) as TopicConfig;
  });
}