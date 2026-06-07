// Error handling middleware
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { logger } from "../utils/logger";

type RequestWithId = Request & { id?: string };

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn(
      {
        err,
        requestId: (req as RequestWithId).id,
        method: req.method,
        url: req.originalUrl,
        statusCode: err.statusCode,
      },
      err.message
    );

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Log unexpected errors
  logger.error(
    {
      err,
      requestId: (req as RequestWithId).id,
      method: req.method,
      url: req.originalUrl,
    },
    "Unexpected error"
  );

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

// Async handler wrapper to catch errors in async route handlers
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
