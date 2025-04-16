import { ActionResult, RequestConfig } from "./action";

export type RequestInterceptor<TPayload, TData> = (params: {
  args: [TPayload];
  config: RequestConfig;
}) => Promise<{
  args: [TPayload];
  config?: RequestConfig;
}>;

export type ResponseInterceptor<TData> = (
  response: ActionResult<TData>
) => Promise<ActionResult<TData>>;

export type ResponseInterceptorWithRetryContext<TData> = (
  response: ActionResult<TData>,
  retryContext?: {
    retry: () => Promise<ActionResult<TData>>;
    name: string;
  }
) => Promise<ActionResult<TData>>;
