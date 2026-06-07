"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatter = void 0;
class ResponseFormatter {
    static success(data, message) {
        return {
            success: true,
            data,
            ...(message && { message }),
        };
    }
    static error(message, error) {
        return {
            success: false,
            message,
            ...(error && { error }),
        };
    }
}
exports.ResponseFormatter = ResponseFormatter;
//# sourceMappingURL=response.js.map