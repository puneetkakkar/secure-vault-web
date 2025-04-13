"use server";

import { serviceFactory } from "@/services/service-factory";
import { EncryptedString } from "@/types";
import { ServerActionResponse } from "@/types/action";
import { createApiAction } from "@/utils/action-error-handler";
import { LoginResponse } from "../../_types/auth.type";

async function _sendVerificationEmailAction(payload: {
  email: string;
  name: string;
}): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.sendVerificationEmail(payload);
}

export const sendVerificationEmailApiAction = createApiAction(
  _sendVerificationEmailAction
);

async function _verifyEmailAction(payload: {
  token: string;
  email: string;
}): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.verifyEmail(payload);
}

export const verifyEmailApiAction = createApiAction(_verifyEmailAction);

async function _finishRegistrationAction(payload: {
  email: string;
  masterPasswordHash: string | null;
  userKey: EncryptedString | undefined;
  pbkdf2Iterations: number;
  masterPasswordHint: string;
}): Promise<ServerActionResponse> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.finishRegistration(payload);
}

export const finishRegistrationApiAction = createApiAction(
  _finishRegistrationAction
);

async function _loginAction(payload: {
  email: string;
  masterPasswordHash: string;
  rememberMe: boolean;
}): Promise<ServerActionResponse<LoginResponse>> {
  const authApiService = serviceFactory.getAuthApiService();
  return await authApiService.login(payload);
}

export const loginApiAction = createApiAction(_loginAction);
