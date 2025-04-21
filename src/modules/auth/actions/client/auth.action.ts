import { createClientAction } from "@/core/action-utils/client-action-handler";
import { bearerTokenInterceptor } from "@/shared/interceptors";
import { _logoutAction, _refreshTokenAction } from "../server/auth.action";

export type RefreshTokenResponse = {
  token: string;
};

export const refreshTokenApiAction = createClientAction<
  void,
  RefreshTokenResponse
>(_refreshTokenAction, { skipRequestInterceptors: [bearerTokenInterceptor] });

export const logoutApiAction = createClientAction<void, void>(_logoutAction);
