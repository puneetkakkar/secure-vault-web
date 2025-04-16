"use client";

import ClientServiceFactory from "@/shared/services/client-service-factory";
import { SessionStorageKey } from "@/shared/enums";

import { RequestInterceptor } from "@/shared/types/interceptor";

export const bearerTokenInterceptor: RequestInterceptor<any, any> = async ({
  args,
  config,
}) => {
  const clientService = ClientServiceFactory.getInstance();
  const sessionStorageService = clientService.getSessionStorageService();

  const token = sessionStorageService?.get(SessionStorageKey.ACCESS_TOKEN);

  return {
    args,
    config: {
      ...config,
      headers: {
        ...config.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  };
};
