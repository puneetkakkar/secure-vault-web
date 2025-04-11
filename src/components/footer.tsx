"use client";

import { Link } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Logo } from "./icons";
import NextLink from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-50 dark:bg-black py-16 px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <Logo />
                <span className="font-josefin mt-2 font-bold md:mt-1">
                  {t("companyName1")}&nbsp;
                  <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text">
                    {t("companyName2")}
                  </span>
                </span>
              </NextLink>
            </div>
            <p className="text-secondary-600 dark:text-primary mb-6 max-w-md">
              {t("footerDescription")}
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-sm bg-white dark:bg-secondary-500/20 rounded-lg p-4 shadow-sm">
              <h4 className="text-sm font-semibold mb-3 text-secondary-800 dark:text-primary">
                {t("stayUpdated")}
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("enterYourEmail")}
                  className="flex-grow px-3 py-2 text-sm border border-secondary-200/10 dark:border-secondary-200/10 rounded-l-md bg-secondary-400/10 dark:bg-primary-200/10 focus:outline-none"
                />
                <button className="px-4 py-2 bg-primary dark:bg-primary text-primary-foreground dark:text-secondary-400 text-sm rounded-r-md dark:hover:bg-primary/90 transition-colors">
                  {t("subscribe")}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary-900 dark:text-primary">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary-900 dark:text-primary">
              {t("resources")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("security")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary-900 dark:text-primary">
              {t("legal")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {t("compliance")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-secondary-200 dark:border-primary-100/50 my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-secondary-600 dark:text-primary-300 mb-4 md:mb-0">
            {t("copyright", { year: currentYear })}
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {t("socialLinks.twitter")}
            </Link>
            <Link
              href="#"
              className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {t("socialLinks.linkedin")}
            </Link>
            <Link
              href="#"
              className="text-secondary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {t("socialLinks.github")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
