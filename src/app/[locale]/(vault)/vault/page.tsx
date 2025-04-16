"use client";

import { serviceFactory } from "@/services/service-factory";
import { useCallback, useEffect } from "react";

export default function Vault() {
  const vaultService = serviceFactory.getVaultService();

  const fetchUserInfo = useCallback(async () => {
    try {
      const userInfo = await vaultService.getUserInfo();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  }, [vaultService]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return <div>Vault</div>;
}
