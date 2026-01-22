// Standard API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ResponseFormatter {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      ...(message && { message }),
    };
  }

  static error(message: string, error?: string): ApiResponse<never> {
    return {
      success: false,
      message,
      ...(error && { error }),
    };
  }
}
