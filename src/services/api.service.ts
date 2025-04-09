import { env } from "@/lib/env/env";
import { ApiConfig, ApiError, ApiResponse } from "@/types/api";

export class ApiService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly timeout: number;
  private readonly withCredentials: boolean;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? env.API_BASE_URL;
    this.headers = config.headers ?? {};
    this.timeout = config.timeout ?? 30000;
    this.withCredentials = config.withCredentials ?? true;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    if (!endpoint) {
      throw new ApiError(
        "Endpoint is required but was not provided.",
        500,
        new Date().toISOString(),
        "INVALID_ENDPOINT",
        {}
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        credentials: this.withCredentials ? "include" : "omit",
        signal: controller.signal,
      });

      let responseData: any;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new ApiError(
          `Failed to parse JSON response`,
          response.status,
          new Date().toISOString(),
          "JSON_PARSE_ERROR",
          {}
        );
      }

      if (!response.ok) {
        throw new ApiError(
          responseData.message || "An unexpected error occurred",
          response.status,
          new Date().toISOString(),
          responseData.code,
          responseData.errors || {}
        );
      }

      return {
        data: responseData.data as T,
        status: response.status,
        message: responseData.message,
      } as ApiResponse<T>;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(
          "Request timeout",
          408,
          new Date().toISOString(),
          "TIMEOUT",
          {}
        );
      }

      throw new ApiError(
        error instanceof Error
          ? error.message
          : "An unexpected network or setup error occurred",
        500,
        new Date().toISOString(),
        "NETWORK_OR_SETUP_ERROR",
        {}
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params)}`
      : endpoint;
    return this.request<T>(url, {
      method: "GET",
    });
  }

  public async post<T, R>(endpoint: string, data: T): Promise<ApiResponse<R>> {
    return this.request<R>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async put<T, R>(endpoint: string, data: T): Promise<ApiResponse<R>> {
    return this.request<R>(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}
