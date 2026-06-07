"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTopicConfigs = loadTopicConfigs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
function loadTopicConfigs() {
    const configDir = path_1.default.join(process.cwd(), "topic-config");
    const files = fs_1.default.readdirSync(configDir);
    return files.map((file) => {
        const filePath = path_1.default.join(configDir, file);
        const content = fs_1.default.readFileSync(filePath, "utf8");
        return js_yaml_1.default.load(content);
    });
}
//# sourceMappingURL=topic.loader.js.map