"use client";

import { refreshTokenApiAction } from "@/modules/auth";
import { SessionStorageKey } from "@/shared/enums";
import ClientServiceFactory from "@/shared/services/client-service-factory";
import { ActionResult } from "@/shared/types/action";
import { ResponseInterceptorWithRetryContext } from "@/shared/types/interceptor";
import { serviceFactory } from "../services";

export const refreshTokenInterceptor: ResponseInterceptorWithRetryContext<
  any
> = async (response, retryContext): Promise<ActionResult<any>> => {
  if (response.success || response.status !== 401 || !retryContext) {
    return response;
  }

  const clientService = ClientServiceFactory.getInstance();
  const sessionStorageService = clientService.getSessionStorageService();
  const authService = serviceFactory.getAuthService();

  if (retryContext.metadata?.isRefreshTokenRequest) {
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
      const result = await refreshTokenApiAction(undefined, {
        metadata: { isRefreshTokenRequest: true },
      });

      if (!sessionStorageService) {
        throw new Error("Session storage service not found");
      }

      if (result.success) {
        const token = result.data?.token ?? "";
        sessionStorageService.set(SessionStorageKey.ACCESS_TOKEN, token);

        return await retryContext?.retry();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      await authService.logout();

      return {
        success: false,
        status: 500,
        message: error.message,
        code: "TOKEN_REFRESH_FAILED",
        errors: {},
      };
    }
  }

  return response;
};
