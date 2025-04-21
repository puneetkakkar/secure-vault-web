"use server";

import { isDevelopment } from "@/core/env/env.utils";
import {
  ActionResult,
  ApiError,
  ApiErrorResponse,
  ServerActionResponse,
  UnhandledError,
} from "@/shared/types";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";
// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
};

// Helper type guard for ApiError-like objects
function isApiError(error: any): error is ApiError | ApiErrorResponse {
  if (error instanceof ApiError) {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      (typeof error.status === "number" ||
        typeof error.status === "undefined") &&
      (typeof error.code === "string" || typeof error.code === "undefined") &&
      (!("errors" in error) ||
        typeof error.errors === "object" ||
        error.errors === null)
    );
  }

  return false;
}

/** Internal execution logic */
export async function executeHandledAction<TArgs extends any[], TData>(
  actionFn: (...args: TArgs) => Promise<ServerActionResponse<TData>>,
  args: TArgs
): Promise<ActionResult<TData>> {
  try {
    if (isDevelopment) {
      console.log(
        `${colors.blue}${colors.bright}[API Request]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
        args
      );
    }

    const cookieStore = await cookies();

    const newArgs = [...args] as TArgs;
    newArgs[1] = {
      ...args[1],
      headers: {
        ...args[1].headers,
        Cookie: cookieStore.toString(),
      },
    } as TArgs[1];

    const serverActionResponse = await actionFn(...newArgs);

    const rawSetCookies = serverActionResponse.headers?.getSetCookie?.();

    if (rawSetCookies) {
      const parsedCookies = setCookieParser.parse(rawSetCookies, {
        map: false,
      });

      parsedCookies.forEach((cookie) => {
        const cookiePayload: Parameters<typeof cookieStore.set>[0] = {
          name: cookie.name,
          value: cookie.value,
        };

        if (cookie.path) cookiePayload.path = cookie.path;
        if (cookie.expires) cookiePayload.expires = cookie.expires;
        if (cookie.httpOnly !== undefined)
          cookiePayload.httpOnly = cookie.httpOnly;
        if (cookie.sameSite)
          cookiePayload.sameSite = cookie.sameSite as "lax" | "strict" | "none";
        if (cookie.secure !== undefined) cookiePayload.secure = cookie.secure;
        if (cookie.maxAge !== undefined) cookiePayload.maxAge = cookie.maxAge;
        if (cookie.domain) cookiePayload.domain = cookie.domain;

        cookieStore.set(cookiePayload);
      });
    }

    let serverActionResponseData: any;
    try {
      serverActionResponseData = await serverActionResponse.json();
    } catch (jsonError) {
      throw new Error(`Failed to parse JSON response`);
    }

    if (!serverActionResponse.ok) {
      throw new ApiError(
        serverActionResponseData.message,
        serverActionResponse.status,
        new Date().toISOString(),
        serverActionResponseData.code,
        serverActionResponseData?.errors ?? null,
        serverActionResponseData.nextAction
      );
    }

    if (isDevelopment) {
      console.log(
        `${colors.green}${colors.bright}[API Response]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
        {
          ...serverActionResponseData,
          status: serverActionResponse.status,
        }
      );
    }

    return {
      success: true,
      ...serverActionResponseData,
      status: 200,
      data: (serverActionResponseData.data ?? null) as TData,
    } as ActionResult<TData>;
  } catch (error) {
    if (isApiError(error)) {
      const status = error.status ?? 500;

      // Log all errors in development, only 500s in production
      if (isDevelopment || status >= 500) {
        const color = status >= 500 ? colors.red : colors.yellow;
        console.error(
          `${color}${colors.bright}[API Error]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
          {
            ...error,
            status,
          }
        );
      }

      return {
        ...error,
        success: false,
        status,
        message: error.message || "An application error occurred.",
        code: error.code || "UNKNOWN_ERROR",
        errors: "errors" in error && error.errors ? error.errors : {},
      } as ActionResult<TData>;
    } else {
      // Always log unexpected errors
      const unexpectedErrorLogContext: UnhandledError = {
        name: "UnhandledError",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        status: 500,
        timestamp: new Date().toISOString(),
        code: "UNEXPECTED_RUNTIME_ERROR",
      };

      console.error(
        `${colors.red}${colors.bright}[API Unexpected Error]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
        unexpectedErrorLogContext
      );

      return {
        success: false,
        status: 500,
        message: "An unexpected error occurred.",
        code: "UNEXPECTED_RUNTIME_ERROR",
        errors: {},
        nextAction: undefined,
      } as ActionResult<TData>;
    }
  }
}
