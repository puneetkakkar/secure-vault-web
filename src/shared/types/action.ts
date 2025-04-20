import { ApiResponse } from "./api";

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

export type RequestConfig = {
  /**
   * Optional headers to be sent with the request
   */
  headers?: Record<string, string>;

  /**
   * Optional timeout for the action
   */
  timeout?: number;
};

// type ServerActionError = ApiError ;
// type ServerActionSuccess<T> = ApiSuccessResponse<T>;

type ServerActionResponse<T = {}> = ApiResponse<T>;

export type { ServerActionResponse };
