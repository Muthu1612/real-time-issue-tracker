"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const issues_routes_1 = __importDefault(require("./routes/issues.routes"));
const webhooks_routes_1 = __importDefault(require("./routes/webhooks.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use((0, pino_http_1.default)({
    logger: logger_1.logger,
    customProps: (req) => ({
        requestId: req.id,
    }),
}));
// Slack sends form data, not JSON
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Routes
app.use("/api/issues", issues_routes_1.default);
app.use("/api/webhooks", webhooks_routes_1.default);
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Error handling middleware (must be last)
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logger_1.logger.info(`Backend running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map