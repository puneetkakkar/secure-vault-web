import { createClientAction } from "@/utils/actions/client-action-handler";
import { _refreshTokenAction } from "../server/auth.action";

export type RefreshTokenResponse = {
  token: string;
};

export const refreshTokenApiAction = createClientAction<
  void,
  RefreshTokenResponse
>(_refreshTokenAction);
