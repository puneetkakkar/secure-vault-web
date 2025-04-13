"use client";

import ClientServiceFactory from "@/services/client-service-factory";
import { useMemo } from "react";

export function useClientServiceFactory() {
  return useMemo(() => ClientServiceFactory.getInstance(), []);
}
