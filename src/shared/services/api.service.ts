import { env } from "@/core/env";
import { ApiConfig, ApiError, ApiResponse } from "@/shared/types/api";
import { UnhandledError } from "@/shared/types/unhandled-error";

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
      throw new Error("Endpoint is required but was not provided.");
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

      return response as ApiResponse<T>;
    } catch (error: any) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(
          "Request has been aborted due to timeout",
          408,
          new Date().toISOString(),
          "TIMEOUT",
          {}
        );
      }

      throw new UnhandledError(
        error instanceof Error ? error.message : "An unexpected error occurred",
        500,
        new Date().toISOString(),
        "UNHANDLED_ERROR"
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    config?: Partial<RequestInit>
  ): Promise<ApiResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params)}`
      : endpoint;
    return this.request<T>(url, {
      method: "GET",
      ...config,
    });
  }

  public async post<T, R>(
    endpoint: string,
    data: T,
    config?: Partial<RequestInit>
  ): Promise<ApiResponse<R>> {
    return this.request<R>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...config?.headers,
      },
      body: JSON.stringify(data),
      ...config,
    });
  }

  public async put<T, R>(
    endpoint: string,
    data: T,
    config?: Partial<RequestInit>
  ): Promise<ApiResponse<R>> {
    return this.request<R>(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...config?.headers,
      },
      body: JSON.stringify(data),
      ...config,
    });
  }

  public async delete<T>(
    endpoint: string,
    config?: Partial<RequestInit>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...config,
    });
  }
}
