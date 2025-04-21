"use client";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Tooltip,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AuthenticatedAppLayoutShellProps } from "../types";
import { Logo, LogoutIcon, SidebarCloseIcon, SidebarLockIcon } from "./icons";
import SidebarNavItem from "./sidebar-nav-item";

const AuthenticatedAppLayoutShell: React.FC<
  AuthenticatedAppLayoutShellProps
> = ({
  sidebarRef,
  user,
  vaults = [],
  navItems = [],
  isSidebarPinned,
  onToggleSidebarPin,
  onLogout,
  children,
}) => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{ width: isSidebarPinned ? 208 : 64 }}
        transition={{
          duration: 0.1,
        }}
        className={`group/sidebar h-full flex flex-col overflow-x-hidden bg-gradient-to-b from-black/20 to-black/20 border-r border-violet-800/20 z-30 transition-all duration-200 ${isSidebarPinned ? "w-64 min-w-[13rem]" : "w-16 min-w-[4rem]"}`}
      >
        {/* Logo & Title Section */}
        <div className="sticky top-0 z-20 w-full backdrop-blur-md bg-black/80 flex items-center justify-between px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -2 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.2,
                delay: 0.1,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              x: -10,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            className="flex items-center justify-center font-josefin font-bold text-md"
          >
            {!isSidebarPinned && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
                className="flex items-center justify-center w-8 h-8"
              >
                <Logo size={28} />
              </motion.div>
            )}

            {isSidebarPinned && (
              <motion.div
                initial={{ opacity: 0, x: -2 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -2 }}
                transition={{ duration: 0.2, delay: 0.1, ease: "easeIn" }}
                className="w-full flex items-center justify-center h-8"
              >
                <div className="font-josefin font-bold mt-2 md:mt-1 text-lg">
                  SECURE&nbsp;
                  <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text">
                    VAULT
                  </span>
                </div>
              </motion.div>
            )}

            {isSidebarPinned && (
              <Tooltip content="Unpin Sidebar" placement="right">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
                  onClick={onToggleSidebarPin}
                  className="ml-4 mt-1 md:mt-0 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  {isSidebarPinned ? (
                    <SidebarLockIcon width={20} height={20} />
                  ) : (
                    <SidebarCloseIcon width={20} height={20} />
                  )}
                </motion.button>
              </Tooltip>
            )}
          </motion.div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <SidebarNavItem
                key={index}
                icon={item.icon}
                label={item.label}
                expanded={isSidebarPinned}
                active={item.active}
                onClick={() => console.log(`Clicked ${item.label}`)}
              />
            ))}
          </nav>

          {/* Vaults Section */}
          <AnimatePresence>
            {isSidebarPinned && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 5,
                  transition: { duration: 0.2, delay: 0, ease: "easeInOut" },
                }}
                transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
              >
                <div className="mt-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-900/90 to-transparent mb-4"></div>
                  <div className="text-[0.7rem] uppercase text-gray-400 tracking-wider pb-2">
                    Your Vaults
                  </div>
                  <Accordion
                    variant="splitted"
                    isCompact
                    itemClasses={{
                      base: "bg-transparent px-2",
                      title: "text-sm",
                    }}
                    className="px-0"
                  >
                    {vaults.map((vault) => (
                      <AccordionItem
                        key={vault.id}
                        aria-label={vault.name}
                        startContent={vault.icon}
                        title={vault.name}
                        classNames={{
                          content: "bg-gray-800/40 px-4 rounded-lg text-sm",
                        }}
                      >
                        {vault.name}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pin Button */}
        {!isSidebarPinned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
            onClick={onToggleSidebarPin}
            className="flex items-center justify-center py-1"
          >
            <Tooltip content="Open Sidebar" placement="right">
              <Button
                aria-label="Open Sidebar"
                variant="light"
                isIconOnly
                onPress={onToggleSidebarPin}
              >
                {isSidebarPinned ? (
                  <SidebarLockIcon width={20} height={20} />
                ) : (
                  <SidebarCloseIcon width={20} height={20} />
                )}
              </Button>
            </Tooltip>
          </motion.div>
        )}

        {/* Logout Button */}
        {!isSidebarPinned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center py-1"
          >
            <Tooltip content="Logout" placement="right">
              <Button
                aria-label="Logout"
                className="rounded-full text-gray-400 hover:text-white hover:bg-gray-600/30 transition-colors"
                onPress={onLogout}
                variant="light"
                isIconOnly
              >
                <LogoutIcon width={22} height={22} className="text-danger" />
              </Button>
            </Tooltip>
          </motion.div>
        )}

        {/* User Profile Section */}
        <div className="bg-gray-950/80 backdrop-blur-md p-3 flex items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1, delay: 0.2, ease: "easeIn" }}
            className="flex items-center justify-center"
          >
            <Avatar
              size="md"
              src={user?.avatarUrl}
              showFallback
              isBordered
              color="default"
            />
          </motion.div>

          {isSidebarPinned && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut" }}
                className="flex flex-col justify-center ml-3 overflow-hidden w-2/3 "
              >
                <span className="font-medium text-sm truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  Premium User
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut" }}
                className="ml-auto flex gap-1"
              >
                <Tooltip content="Logout" placement="right">
                  <Button
                    aria-label="Logout"
                    className="rounded-full text-gray-400 hover:text-white hover:bg-gray-600/30 transition-colors"
                    onPress={onLogout}
                    variant="light"
                    isIconOnly
                  >
                    <LogoutIcon
                      width={22}
                      height={22}
                      className="text-danger"
                    />
                  </Button>
                </Tooltip>
              </motion.div>
            </>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 bg-gradient-to-b from-black/80 to-black/80">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedAppLayoutShell;
