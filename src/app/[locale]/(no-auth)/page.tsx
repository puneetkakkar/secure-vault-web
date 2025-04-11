"use client";

import { Button, Link } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HackerImage from "../../../../assets/homepage-hacker.svg";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative overflow-hidden min-h-[90vh] flex items-center"
      >
        {/* Background gradients and design elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Accent circles */}
          <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 relative z-10 order-2 lg:order-1 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100/70 dark:bg-primary-900/50 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50 mb-3 animate-fade-in shadow-sm">
              <p className="text-xs font-medium text-primary dark:text-primary">
                {t("secureVaultBadge")}
              </p>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold animate-fade-in">
              <span className="font-josefin mt-2 font-bold md:mt-1">
                {t("heroTitle1")}&nbsp;
                <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text">
                  {t("heroTitle2")}
                </span>
              </span>
              <span className="font-josefin block mt-4 text-[2.7rem] text-secondary-600 dark:text-secondary-400">
                {t("heroTitleRest")}
              </span>
            </h1>

            <p className="text-base md:text-lg text-primary dark:text-secondary-500 max-w-xl animate-slide-in-up delay-100">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-slide-in-up delay-200 pt-3">
              <Button
                as={Link}
                href="/register"
                color="primary"
                variant="shadow"
                size="md"
                className="w-full py-6 sm:py-0 sm:w-auto px-6 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <span className="relative z-10">{t("getStarted")}</span>
              </Button>
              <Button
                as={Link}
                href="/login"
                color="primary"
                variant="flat"
                size="md"
                className="w-full my-3 sm:my-0 py-6 sm:py-0 sm:w-auto px-6 font-medium text-primary transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("signIn")}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 flex items-center space-x-2 text-xs text-default-500 dark:text-default animate-fade-in delay-600">
              <span className="flex items-center">
                <span className="text-green-500 mr-1 font-josefin">✓</span>{" "}
                {t("trustIndicators.endToEndEncrypted")}
              </span>
              <span className="flex items-center">
                <span className="text-green-500 mr-1 font-josefin">✓</span>{" "}
                {t("trustIndicators.zeroKnowledge")}
              </span>
              <span className="flex items-center">
                <span className="text-green-500 mr-1 font-josefin">✓</span>
                {t("trustIndicators.openSource")}
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative z-10 order-1 lg:order-2 group">
            <div className="relative mx-auto max-w-sm lg:max-w-lg aspect-square">
              <Image
                src={HackerImage}
                alt="Secure Vault Protection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                // blurDataURL={blurDataURL}
                className="object-contain filter drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                // placeholder="blur"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute hidden lg:flex bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce-slow">
          <button
            onClick={() => {
              const featuresSection = document.querySelector(
                'section[data-section="features"]'
              );
              featuresSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-primary-500 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-default-500 dark:text-default-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t("scrollIndicator")}
            </span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-section="features"
        className="py-28 px-8 relative overflow-hidden"
      >
        {/* Subtle design elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              {t("featuresTitle")}&nbsp;
              <span className="font-josefin mt-2 font-bold md:mt-1">
                {t("featuresTitleLogo1")}&nbsp;
                <span className="font-josefin bg-gradient-to-tl from-[#8C52FF] to-[#5E17EB] text-transparent bg-clip-text py-2">
                  {t("featuresTitleLogo2")}
                </span>
              </span>
              {t("featuresTitleQuestionMark")}
            </h2>
            <p className="mt-4 text-primary dark:text-secondary-500 max-w-2xl mx-auto text-lg">
              {t("featuresDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Feature 1: End-to-End Encryption */}
            <div className="animate-slide-in-up delay-100 group">
              <div className="relative bg-[#fafafa] dark:bg-[#9333ea08] backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 border border-white/40 dark:border-gray-800/60 hover:scale-[1.02] active:scale-[0.98] hover:border-primary-100/50 dark:hover:border-primary-800/50 h-full overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900/50 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-secondary-900/50 border border-primary-100 dark:border-secondary-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary-600 dark:text-primary-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-black dark:text-secondary">
                    {t("feature1Title")}
                  </h3>

                  <p className="text-secondary dark:text-secondary-400 mb-6 flex-grow">
                    {t("feature1Description")}
                  </p>

                  <div className="mt-auto flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    <span className="text-xs font-medium text-primary-500 dark:text-primary-500">
                      Highest Security Standard
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Cross-Platform Sync */}
            <div className="animate-slide-in-up delay-200 group">
              <div className="relative bg-[#fafafa] dark:bg-[#9333ea08] backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 border border-white/40 dark:border-gray-800/60 hover:scale-[1.02] active:scale-[0.98] hover:border-primary-100/50 dark:hover:border-primary-800/50 h-full overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-purple-50 dark:bg-purple-900/50 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 dark:bg-secondary-900/50 border border-purple-100 dark:border-secondary-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-purple-600 dark:text-purple-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-black dark:text-secondary">
                    {t("feature2Title")}
                  </h3>

                  <p className="text-secondary dark:text-secondary-400 mb-6 flex-grow">
                    {t("feature2Description")}
                  </p>

                  <div className="mt-auto flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-medium text-purple-500 dark:text-purple-500">
                      Universal Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Password Generator */}
            <div className="animate-slide-in-up delay-300 group">
              <div className="relative bg-[#fafafa] dark:bg-[#9333ea08] backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 border border-white/40 dark:border-gray-800/60 hover:scale-[1.02] active:scale-[0.98] hover:border-primary-100/50 dark:hover:border-primary-800/50 h-full overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-secondary-900/50 border border-blue-100 dark:border-secondary-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-black dark:text-secondary">
                    {t("feature3Title")}
                  </h3>

                  <p className="text-secondary dark:text-secondary-400 mb-6 flex-grow">
                    {t("feature3Description")}
                  </p>

                  <div className="mt-auto flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium text-blue-500 dark:text-blue-500">
                      Advanced Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        data-section="how-it-works"
        className="py-28 px-8 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          {/* <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full border border-primary-100/20 dark:border-primary-800/20" /> */}
          <div className="absolute bottom-[0%] -right-[10%] w-48 h-48 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              {t("howItWorksTitle")}
            </h2>
            <p className="mt-4 text-secondary dark:text-secondary-400 max-w-2xl mx-auto text-lg">
              {t("howItWorksDescription")}
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-700 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center animate-slide-in-up delay-100 group">
                <div className="w-20 h-20 mb-6 bg-secondary-50 dark:bg-secondary-900/50 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-500 relative overflow-hidden shadow-md border border-secondary-100 dark:border-secondary-800">
                  <span className="text-3xl text-secondary-600 dark:text-secondary-400 font-bold relative z-10">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black dark:text-secondary group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                  {t("step1Title")}
                </h3>
                <p className="text-secondary dark:text-secondary-400 max-w-xs mx-auto">
                  {t("step1Description")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center animate-slide-in-up delay-200 group">
                <div className="w-20 h-20 mb-6 bg-secondary-50 dark:bg-secondary-900/50 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-500 relative overflow-hidden shadow-md border border-secondary-100 dark:border-secondary-800">
                  <span className="text-3xl text-secondary-600 dark:text-secondary-400 font-bold relative z-10">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black dark:text-secondary group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                  {t("step2Title")}
                </h3>
                <p className="text-secondary dark:text-secondary-400 max-w-xs mx-auto">
                  {t("step2Description")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center animate-slide-in-up delay-300 group">
                <div className="w-20 h-20 mb-6 bg-secondary-50 dark:bg-secondary-900/50 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-500 relative overflow-hidden shadow-md border border-secondary-100 dark:border-secondary-800">
                  <span className="text-3xl text-secondary-600 dark:text-secondary-400 font-bold relative z-10">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black dark:text-secondary group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                  {t("step3Title")}
                </h3>
                <p className="text-secondary dark:text-secondary-400 max-w-xs mx-auto">
                  {t("step3Description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-section="cta"
        className="py-24 px-8 relative overflow-hidden"
      >
        {/* Background design elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-[1%] -left-[5%] w-48 h-48 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
          <div className="absolute -bottom-[1%] -right-[5%] w-48 h-48 rounded-full border border-primary-100/20 dark:border-primary-800/20" />
        </div>

        <div className="max-w-4xl mx-auto bg-[#fafafa] dark:bg-[#9333ea08] rounded-3xl border border-primary-100/50 dark:border-primary-800/50 backdrop-blur-md px-6 py-12 lg:px-12 relative overflow-hidden transition-transform duration-300">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              {t("ctaTitle")}
            </h2>
            <p className="text-base lg:text-lg text-secondary dark:text-secondary-400 mb-6 max-w-2xl mx-auto animate-slide-in-up">
              {t("ctaDescription")}
            </p>

            {/* Product Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center space-x-3 bg-secondary-50/70 dark:bg-secondary-900/50 px-4 py-2 rounded-lg border border-secondary-100/50 dark:border-secondary-800/50 hover:scale-[1.02] transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary-600 dark:text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                  Zero-Knowledge Encryption
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-secondary-50/70 dark:bg-secondary-900/50 px-4 py-2 rounded-lg border border-secondary-100/50 dark:border-secondary-800/50 hover:scale-[1.02] transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary-600 dark:text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                  Military-Grade Security
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-secondary-50/70 dark:bg-secondary-900/50 px-4 py-2 rounded-lg border border-secondary-100/50 dark:border-secondary-800/50 hover:scale-[1.02] transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary-600 dark:text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                  Cross-Platform Sync
                </span>
              </div>
            </div>

            {/* Get started button */}
            <div className="mt-16 text-center">
              <Button
                as={Link}
                href="/register"
                color="primary"
                variant="shadow"
                size="lg"
                className="px-8 py-6 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] relative overflow-hidden group"
              >
                <span className="relative hover:scale-[1.02] active:scale-[0.98]">
                  {t("getStartedNow")}
                </span>
                {/* <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span> */}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
