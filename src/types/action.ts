import { ApiError, ApiErrorResponse, ApiSuccessResponse } from "./api";

type ServerActionError = ApiError | ApiErrorResponse;
type ServerActionSuccess<T> = ApiSuccessResponse<T>;

type ServerActionResponse<T = {}> = ServerActionSuccess<T> | ServerActionError;

export type { ServerActionResponse };
