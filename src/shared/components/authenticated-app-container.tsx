"use client";

import { serviceFactory } from "@/shared/services/service-factory";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SessionStorageKey } from "../enums";
import { useClientServiceFactory } from "../hooks";
import { AuthenticatedAppLayoutContainerProps } from "../types";
import AuthenticatedAppLayoutShell from "./authenticated-app-layout-shell";
import { LockIcon, SettingsIcon, VaultIcon } from "./icons";
import { LoadingPageSpinner } from "./loading-page-spinner";

export default function AuthenticatedAppLayoutContainer({
  children,
}: AuthenticatedAppLayoutContainerProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const clientServiceFactory = useClientServiceFactory();
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isLogoutPending, startLogoutTransition] = useTransition();

  const authService = serviceFactory.getAuthService();
  const storageService = clientServiceFactory.getSessionStorageService();

  const toggleSidebarPin = () => {
    setIsSidebarPinned((prev) => !prev);
  };

  const vaults = [
    { id: 1, name: "Personal", icon: <LockIcon /> },
    { id: 2, name: "Work", icon: <LockIcon /> },
    { id: 3, name: "Finance", icon: <LockIcon /> },
  ];

  // Mock user and vaults data for now
  const user = {
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    plan: "Free",
  };

  const navItems = [
    { icon: <VaultIcon />, label: "Vaults", active: true },
    { icon: <SettingsIcon />, label: "Settings", active: false },
  ];

  const handleOnLogout = async () => {
    startLogoutTransition(async () => {
      try {
        const response = await authService.logout();

        if (response.success) {
          if (storageService) {
            storageService.remove(SessionStorageKey.ACCESS_TOKEN);
          } else {
            console.error("Storage service not found");
          }

          router.replace("/login");
        }
      } catch (error: any) {
        addToast({
          variant: "flat",
          color: "danger",
          title: error.message,
        });
      }
    });
  };

  if (isLogoutPending) {
    return <LoadingPageSpinner />;
  }

  return (
    <AuthenticatedAppLayoutShell
      sidebarRef={sidebarRef}
      user={user}
      vaults={vaults}
      navItems={navItems}
      onLogout={handleOnLogout}
      isSidebarPinned={isSidebarPinned}
      onToggleSidebarPin={toggleSidebarPin}
    >
      {children}
    </AuthenticatedAppLayoutShell>
  );
}
