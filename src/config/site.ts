export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Secret Vault - The only key is you",
  description:
    "A privacy-focused application designed to safeguard your passwords, documents, and other confidential information",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  nonAuthNavMenuItems: [
    {
      label: "Join us",
      href: "/register",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  // navMenuItems: [
  //   {
  //     label: "Profile",
  //     href: "/profile",
  //   },
  //   {
  //     label: "Dashboard",
  //     href: "/dashboard",
  //   },
  //   {
  //     label: "Projects",
  //     href: "/projects",
  //   },
  //   {
  //     label: "Team",
  //     href: "/team",
  //   },
  //   {
  //     label: "Calendar",
  //     href: "/calendar",
  //   },
  //   {
  //     label: "Settings",
  //     href: "/settings",
  //   },
  //   {
  //     label: "Help & Feedback",
  //     href: "/help-feedback",
  //   },
  //   {
  //     label: "Logout",
  //     href: "/logout",
  //   },
  // ],
  // links: {
  //   github: "https://github.com/nextui-org/nextui",
  //   twitter: "https://twitter.com/getnextui",
  //   docs: "https://nextui.org",
  //   discord: "https://discord.gg/9b6yyZKmH4",
  //   sponsor: "https://patreon.com/jrgarciadev",
  // },
};
