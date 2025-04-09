export interface ApiSuccessResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiErrorResponse {
  status: number;
  code: string;
  message: string;
  timestamp: string;
  errors?: Record<string, unknown>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public timestamp: string,
    public code: string,
    public errors: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}
