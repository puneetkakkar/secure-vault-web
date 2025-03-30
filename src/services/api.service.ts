import { env } from "@/lib/env/env";

export interface ApiServiceConfig {
  baseUrl: string;
  headers?: HeadersInit;
}

export class ApiService {
  private readonly baseUrl?: string;
  private readonly headers?: HeadersInit;

  constructor(config: ApiServiceConfig) {
    this.baseUrl = config.baseUrl ?? env.API_BASE_URL;
    this.headers = config.headers ?? {};
  }

  private async request<T>(
    endpoint: string | undefined,
    options: RequestInit,
  ): Promise<T> {
    if (!endpoint) {
      throw new Error("Endpoint is required but was not provided.");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `API request failed: ${error.message || "Unknown error"}`,
      );
    }

    return (await response.json()) as T;
  }

  public get<T>(
    endpoint: string | undefined,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params)}`
      : endpoint;
    return this.request<T>(url, {
      method: "GET",
      headers: this.headers,
    });
  }

  public post<T, R>(endpoint: string | undefined, data: T): Promise<R> {
    return this.request<R>(endpoint, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public put<T, R>(endpoint: string | undefined, data: T): Promise<R> {
    return this.request<R>(endpoint, {
      method: "PUT",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public delete<T>(endpoint: string | undefined): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
