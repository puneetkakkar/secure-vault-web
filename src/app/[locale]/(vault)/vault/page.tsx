"use client";

import { serviceFactory } from "@/services/service-factory";
import { useEffect } from "react";

export default function Vault() {
  const vaultService = serviceFactory.getVaultService();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await vaultService.getUserInfo();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <div>Vault</div>;
}
