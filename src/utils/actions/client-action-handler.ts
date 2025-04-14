import { refreshTokenInterceptor } from "@/interceptors/refresh-token.interceptor";
import { bearerTokenInterceptor } from "@/interceptors/token.interceptor";
import {
  ActionResult,
  RequestConfig,
  ServerActionResponse,
} from "@/types/action";
import {
  RequestInterceptor,
  ResponseInterceptorWithRetryContext,
} from "@/types/interceptor";
import { createApiAction } from "@/utils/actions/server-action-handler";

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

    // Run request interceptors
    for (const interceptor of mergedRequestInterceptors) {
      const result = await interceptor({ args, config });
      args = result.args;
      config = result.config ?? config;
    }

    // Call server action with the config appended
    const callServerAction = async (): Promise<ActionResult<TData | null>> => {
      const serverActionWithHandling = createApiAction(serverAction);
      return serverActionWithHandling(...args, config);
    };

    let result = await callServerAction();

    // Run response interceptors
    for (const interceptor of mergedResponseInterceptors) {
      result = await interceptor(result, {
        retry: callServerAction,
        name: serverAction.name,
      });
    }

    return result;
  };
}
