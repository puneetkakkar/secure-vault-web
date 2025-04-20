"use client";

import { refreshTokenApiAction } from "@/modules/auth";
import { SessionStorageKey } from "@/shared/enums";
import ClientServiceFactory from "@/shared/services/client-service-factory";
import { ActionResult } from "@/shared/types/action";
import { ResponseInterceptorWithRetryContext } from "@/shared/types/interceptor";

export const refreshTokenInterceptor: ResponseInterceptorWithRetryContext<
  any
> = async (response, retryContext): Promise<ActionResult<any>> => {
  if (response.success || response.status !== 401 || !retryContext) {
    return response;
  }

  if (retryContext?.name === "_refreshTokenAction") {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return {
      success: false,
      status: 401,
      message: "Unauthorized. Redirected to login.",
      code: "AUTH_REQUIRED",
      errors: {},
    };
  }

  if (!response.success && response.status === 401) {
    try {
      const clientService = ClientServiceFactory.getInstance();
      const sessionStorageService = clientService.getSessionStorageService();

      if (!sessionStorageService) {
        throw new Error("Session storage service not found");
      }

      const result = await refreshTokenApiAction(undefined);

      if (result.success) {
        const token = result.data?.token;
        sessionStorageService.set(SessionStorageKey.ACCESS_TOKEN, token);
      } else {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      return await retryContext?.retry();
    } catch (error) {
      console.error("[Refresh Token Interceptor] Token refresh failed", error);

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return {
        success: false,
        status: 500,
        message: "Failed to refresh token",
        code: "TOKEN_REFRESH_FAILED",
        errors: {},
      };
    }
  }

  return response;
};
