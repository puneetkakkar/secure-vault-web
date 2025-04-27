import {
  bearerTokenInterceptor,
  refreshTokenInterceptor,
} from "@/shared/interceptors";
import {
  ActionResult,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptorWithRetryContext,
  ServerActionResponse,
} from "@/shared/types";
import { createApiAction } from "./server-action-handler";

type CreateClientActionOptions<TPayload, TData> = {
  requestInterceptors?: RequestInterceptor<TPayload, TData>[];
  responseInterceptors?: ResponseInterceptorWithRetryContext<TData | null>[];
  skipRequestInterceptors?: RequestInterceptor<TPayload, TData>[];
  skipResponseInterceptors?: ResponseInterceptorWithRetryContext<TData | null>[];
};

/**
 * Wraps a server action with request/response interceptors
 * for client-side consumption.
 */
export function createClientAction<TPayload = void, TData = unknown>(
  serverAction: (
    payload: TPayload,
    config: RequestConfig
  ) => Promise<ServerActionResponse<TData>>,
  {
    requestInterceptors = [],
    responseInterceptors = [],
    skipRequestInterceptors = [],
    skipResponseInterceptors = [],
  }: CreateClientActionOptions<TPayload, TData> = {}
): (
  payload?: TPayload,
  config?: RequestConfig
) => Promise<ActionResult<TData | null>> {
  return async (
    payload?: TPayload,
    config: RequestConfig = {}
  ): Promise<ActionResult<TData | null>> => {
    let args: [TPayload] = [payload ?? ({} as TPayload)];

    // Inject global interceptors and remove those that are skipped
    const mergedRequestInterceptors = [
      bearerTokenInterceptor,
      ...requestInterceptors,
    ].filter((interceptor) => !skipRequestInterceptors.includes(interceptor));

    const mergedResponseInterceptors = [
      ...responseInterceptors,
      refreshTokenInterceptor,
    ].filter((interceptor) => !skipResponseInterceptors.includes(interceptor));

    // Call server action with the config appended
    const callServerAction = async (): Promise<ActionResult<TData | null>> => {
      // Run request interceptors
      for (const interceptor of mergedRequestInterceptors) {
        const result = await interceptor({ args, config });
        args = result.args;
        config = result.config ?? config;
      }

      const serverActionWithHandling = createApiAction(serverAction);
      return serverActionWithHandling(...args, config);
    };

    let result = await callServerAction();

    // Run response interceptors
    for (const interceptor of mergedResponseInterceptors) {
      result = await interceptor(result, {
        retry: callServerAction,
        metadata: config.metadata,
      });
    }

    return result;
  };
}
