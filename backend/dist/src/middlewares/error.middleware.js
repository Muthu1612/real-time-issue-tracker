"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
exports.errorHandler = errorHandler;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
function errorHandler(err, req, res, next) {
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn({
            err,
            requestId: req.id,
            method: req.method,
            url: req.originalUrl,
            statusCode: err.statusCode,
        }, err.message);
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // Log unexpected errors
    logger_1.logger.error({
        err,
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
    }, "Unexpected error");
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
// Async handler wrapper to catch errors in async route handlers
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map