export interface AuthenticatedAppLayoutContainerProps {
  children: React.ReactNode;
}

export interface AuthenticatedAppLayoutShellProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  user?: UserProfile;
  vaults?: Vault[];
  navItems?: { icon: React.ReactNode; label: string; active: boolean }[];
  isSidebarPinned: boolean;
  onToggleSidebarPin: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export interface UserProfile {
  name: string;
  plan: string;
  avatarUrl?: string;
  email?: string;
}

export interface Vault {
  id: string | number;
  name: string;
  icon?: React.ReactNode;
}
