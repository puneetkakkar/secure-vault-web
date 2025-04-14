"use server";

import { serviceFactory } from "@/services/service-factory";
import { ServerActionResponse } from "@/types/action";
import { UserInfo } from "../_types/user.type";

export async function _getUserInfoAction(
  payload: {},
  config: Partial<RequestInit>
): Promise<ServerActionResponse<UserInfo>> {
  const vaultApiService = serviceFactory.getVaultApiService();
  return await vaultApiService.getUserInfo(config);
}
