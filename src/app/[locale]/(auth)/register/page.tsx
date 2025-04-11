"use client";

import UserOnboardImage from "../../../../../assets/user-onboard.svg";
import { Button, Checkbox, addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/i18n/navigation";
import TextInput from "@/components/text-input";
import { serviceFactory } from "@/services/service-factory";
import { useRouter } from "@/i18n/navigation";
import {
  InitialRegistrationFormSchema,
  InitialRegistrationFormData,
} from "@/app/[locale]/(auth)/_schemas/signup-form.schema";
import { useTransition } from "react";

export default function Register() {
  const t = useTranslations("Register");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const authService = serviceFactory.getAuthService();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InitialRegistrationFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      fullName: "",
      isAgreed: false,
    },
    resolver: zodResolver(InitialRegistrationFormSchema),
  });

  const onSubmit = async (data: InitialRegistrationFormData) => {
    startTransition(async () => {
      try {
        // const response = await authService.initiateRegistration({
        //   email: data.email,
        //   name: data.fullName,
        // });

        // addToast({
        //   variant: "flat",
        //   color: "success",
        //   title: t("registrationSuccess"),
        //   description: response?.message,
        // });

        reset();

        router.push({
          pathname: "/email-verification",
          query: { email: data.email, name: data.fullName },
        });
      } catch (error: any) {
        addToast({
          variant: "flat",
          color: "danger",
          title: t("registrationError"),
          description: error.message,
        });
      }
    });
  };

  return (
    <section className="flex flex-col mt-16 mx-6 lg:flex-row items-center lg:items-start justify-between gap-4 sm:py-8 md:py-10">
      <div className="flex-1 relative px-4 py-4 mb-4 sm:px-14 sm:py-10 lg:mr-24 border rounded-3xl border-primary-500/30 dark:border-secondary-500/30 w-full md:w-8/12 lg:w-6/12 transition-all duration-50 ease-quick-in-out">
        <h2 className="absolute flex -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-background px-4 text-lg sm:text-2xl font-semibold uppercase whitespace-nowrap">
            {t("title")}
          </span>
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-6 space-y-4 transition-all duration-300"
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up">
                <TextInput
                  label={t("email")}
                  type="text"
                  labelPlacement="inside"
                  errorMessage={errors.email?.message}
                  aria-invalid={errors.email ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up delay-100">
                <TextInput
                  label={t("fullName")}
                  type="text"
                  labelPlacement="inside"
                  errorMessage={errors.fullName?.message}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="isAgreed"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="animate-slide-in-up delay-500 pt-2">
                <Checkbox
                  color="primary"
                  classNames={{ icon: "dark:text-secondary" }}
                  onChange={onChange}
                  isSelected={value}
                >
                  <span className="text-sm sm:text-[1rem]">
                    {t("agreeTerms")}
                  </span>
                </Checkbox>
                {errors.isAgreed?.message && (
                  <p className="text-danger text-xs mt-1">
                    {errors.isAgreed.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex flex-col items-start justify-center my-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-base font-semibold dark:text-secondary mt-4 animate-slide-in-up delay-600 transition-all duration-50 ease-quick-in-out hover:scale-[1.02] active:scale-[0.98]"
              variant="solid"
              isLoading={isPending}
            >
              {t("submit")}
            </Button>

            <div className="mt-4 text-sm sm:text-[1rem] dark:text-primary-200 animate-fade-in text-center">
              {t("loginPrompt")}{" "}
              <Link href={"/login"} className="text-primary dark:text-primary font-medium">
                {t("loginLink")}
              </Link>
            </div>
          </div>
        </form>
      </div>

      <div className="flex md:w-8/12 lg:w-6/12 animate-fade-in-right">
        <Image
          src={UserOnboardImage}
          alt="user onboarding"
          height={0}
          width={0}
          className="w-full h-auto transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
    </section>
  );
}
