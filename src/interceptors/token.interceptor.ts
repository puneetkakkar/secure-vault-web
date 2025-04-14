"use client";

import { SessionStorageKey } from "@/enums/storage.enum";
import ClientServiceFactory from "@/services/client-service-factory";
import { RequestInterceptor } from "@/types/interceptor";

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
