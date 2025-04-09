"use server";

import { serviceFactory } from "@/services/service-factory";
import { ServerActionResponse } from "@/types/action";
import { createApiAction } from "@/utils/action-error-handler";

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
