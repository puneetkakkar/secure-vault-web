import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { Logo } from "./icons";

export const Navbar = ({
  showAuthButtons = true,
}: {
  showAuthButtons?: boolean;
}) => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <span className="font-josefin mt-2 font-bold md:mt-1">
              SECRET&nbsp;
              <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text">
                VAULT
              </span>
            </span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium font-josefin",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {showAuthButtons ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Button
                as={NextLink}
                href="/login"
                color="primary"
                variant="flat"
                className="font-normal font-josefin text-primary"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={NextLink}
                href="/signup"
                className="font-josefin font-normal text-primary-foreground bg-primary"
                variant="flat"
              >
                Sign up
              </Button>
            </NavbarItem>
          </>
        ) : null}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.nonAuthNavMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                color={index === 0 ? "primary" : "foreground"}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
