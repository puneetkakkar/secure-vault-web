import {
  ActionResult,
  RequestConfig,
  ServerActionResponse,
} from "@/types/action";
import { executeHandledAction } from "./action-handler";

/** Action creator */
export function createApiAction<TPayload = void, TData = unknown>(
  actionLogic: (
    payload: TPayload,
    config: RequestConfig
  ) => Promise<ServerActionResponse<TData>>
): (
  payload?: TPayload,
  config?: RequestConfig
) => Promise<ActionResult<TData | null>> {
  return async (
    payload?: TPayload,
    config: RequestConfig = {}
  ): Promise<ActionResult<TData | null>> => {
    // let requestConfig: RequestConfig = {};

    // if (
    //   args.length > 0 &&
    //   typeof args[args.length - 1] === "object" &&
    //   ("headers" in args[args.length - 1] || "timeout" in args[args.length - 1])
    // ) {
    //   requestConfig = args[args.length - 1] as RequestConfig;
    // }

    // return executeHandledAction(actionLogic, [...args, requestConfig]);

    return executeHandledAction(actionLogic, [
      payload ?? ({} as TPayload),
      config,
    ]);
  };
}
