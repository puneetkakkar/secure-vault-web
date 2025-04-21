import { siteConfig } from "@/core/config";
import { Button } from "@heroui/button";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { Logo } from "./icons";
import { ThemeSwitch } from "./theme-switch";

export default function Navbar({
  showAuthButtons = true,
  showNavLinks = true,
}: {
  showAuthButtons?: boolean;
  showNavLinks?: boolean;
}) {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <span className="font-josefin mt-2 font-bold md:mt-1">
              SECURE&nbsp;
              <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text">
                VAULT
              </span>
            </span>
          </NextLink>
        </NavbarBrand>
        {showNavLinks && (
          <ul className="hidden sm:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium font-josefin"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        )}
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
                className="font-josefinfont-semibold text-primary dark:text-primary dark:bg-secondary-600/30"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={NextLink}
                href="/register"
                color="primary"
                className="font-josefin font-semibold dark:text-secondary bg-primary"
                variant="shadow"
              >
                Register
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
}
