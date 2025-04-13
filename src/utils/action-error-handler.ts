import { ApiError, ApiErrorResponse } from "@/types/api";
import { UnhandledError } from "@/types/unhandled-error";
import { isDevelopment } from "./env";

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

// Define the standard return type for actions
export type ActionResult<TData = void> =
  | {
      success: true;
      status: number;
      data: TData;
      message?: string;
    }
  | {
      success: false;
      status: number;
      message: string;
      code: string;
      errors: Record<string, unknown>;
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
async function executeHandledAction<TArgs extends any[], TData>(
  actionFn: (...args: TArgs) => Promise<Partial<ActionResult<TData>>>,
  args: TArgs
): Promise<ActionResult<TData>> {
  try {
    if (isDevelopment) {
      console.log(
        `${colors.blue}${colors.bright}[API Request]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
        args
      );
    }

    const successResult = await actionFn(...args);

    if (isDevelopment) {
      console.log(
        `${colors.green}${colors.bright}[API Response]${colors.reset} ${colors.dim}${actionFn.name}${colors.reset}`,
        successResult
      );
    }

    return {
      success: true,
      status: 200,
      ...successResult,
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
            status,
            message: error.message,
            code: error.code,
            errors: error.errors,
          }
        );
      }

      return {
        success: false,
        status,
        message: error.message || "An application error occurred.",
        code: error.code || "UNKNOWN_ERROR",
        errors: "errors" in error && error.errors ? error.errors : {},
      };
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
      };
    }
  }
}

/** Action creator */
export function createApiAction<TArgs extends any[], TData>(
  actionLogic: (...args: TArgs) => Promise<Partial<ActionResult<TData>>>
): (...args: TArgs) => Promise<ActionResult<TData>> {
  return async (...args: TArgs): Promise<ActionResult<TData>> => {
    return executeHandledAction(actionLogic, args);
  };
}
