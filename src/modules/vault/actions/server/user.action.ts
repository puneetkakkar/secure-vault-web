"use server";

import { serviceFactory } from "@/shared/services/service-factory";
import { ServerActionResponse } from "@/shared/types/action";
import { UserInfo } from "../../types/user.type";

export async function _getUserInfoAction(
  payload: {},
  config: Partial<RequestInit>
): Promise<ServerActionResponse<UserInfo>> {
  const vaultApiService = serviceFactory.getVaultApiService();
  return await vaultApiService.getUserInfo(config);
}
