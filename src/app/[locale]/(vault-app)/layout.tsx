import DashboardLayout from "@/shared/components/dashboard-layout";
import { setRequestLocale } from "next-intl/server";
import React from "react";

export default async function VaultLayout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Mock user and vaults data for now
  const user = {
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    plan: "Free",
  };
  // const vaults = [
  //   { id: "1", name: "Personal Vault", },
  //   { id: "2", name: "Work Vault" },
  //   { id: "3", name: "Shared Vault" },
  // ];

  // These handlers can be replaced with real logic later
  const onLogout = () => {};
  const onSelectVault = (id: string) => {};
  const onCreateVault = () => {};

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
