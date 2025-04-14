"use server";

import { serviceFactory } from "@/services/service-factory";
import { EncryptedString } from "@/types";
import { RequestConfig, ServerActionResponse } from "@/types/action";
import { createApiAction } from "@/utils/actions/server-action-handler";
import { LoginResponse } from "../../_types/auth.type";
import { RefreshTokenResponse } from "../client/auth.action";

async function _sendVerificationEmailAction(
  payload: {
    email: string;
    name: string;
  },
  config?: RequestConfig
): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.sendVerificationEmail(payload, config);
}

export const sendVerificationEmailApiAction = createApiAction(
  _sendVerificationEmailAction
);

async function _verifyEmailAction(
  payload: {
    token: string;
    email: string;
  },
  config?: RequestConfig
): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.verifyEmail(payload, config);
}

export const verifyEmailApiAction = createApiAction(_verifyEmailAction);

async function _finishRegistrationAction(
  payload: {
    email: string;
    masterPasswordHash: string | null;
    userKey: EncryptedString | undefined;
    pbkdf2Iterations: number;
    masterPasswordHint: string;
  },
  config?: RequestConfig
): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.finishRegistration(payload, config);
}

export const finishRegistrationApiAction = createApiAction(
  _finishRegistrationAction
);

async function _loginAction(
  payload: {
    email: string;
    masterPasswordHash: string;
    rememberMe: boolean;
  },
  config?: RequestConfig
): Promise<ServerActionResponse<LoginResponse>> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.login(payload, config);
}

export const loginApiAction = createApiAction(_loginAction);

export async function _refreshTokenAction(
  payload: void,
  config?: RequestConfig
): Promise<ServerActionResponse<RefreshTokenResponse>> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.refreshToken(config);
}
