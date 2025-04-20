"use client";

import { Link, useRouter } from "@/core/i18n";
import { LoginFormData, LoginFormSchema } from "@/modules/auth/schemas";
import { serviceFactory } from "@/shared/services/service-factory";
import { TextInput } from "@/shared/components";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/shared/components/icons";
import { SessionStorageKey } from "@/shared/enums";
import { useClientServiceFactory } from "@/shared/hooks/use-client-service";
import { addToast, Button, Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import UserOnboardImage from "../../../../../assets/user-onboard.svg";

export default function Login() {
  const t = useTranslations("Login");
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginPending, startLoginTransition] = useTransition();
  const clientServiceFactory = useClientServiceFactory();
  const authService = serviceFactory.getAuthService();
  const storageService = clientServiceFactory.getSessionStorageService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      masterPassword: "",
      rememberMe: false,
    },
    resolver: zodResolver(LoginFormSchema(t)),
  });

  const onSubmit = async (data: LoginFormData) => {
    startLoginTransition(async () => {
      try {
        const response = await authService.login({
          email: data.email,
          masterPassword: data.masterPassword,
          rememberMe: data.rememberMe,
        });

        const responseData = response.data;

        if (storageService && responseData) {
          storageService.set(
            SessionStorageKey.ACCESS_TOKEN,
            responseData.token
          );

          router.replace("/home");
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
            render={({ field }) => (
              <div className="animate-slide-in-up">
                <TextInput
                  label={t("email")}
                  type="text"
                  variant="flat"
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
            name="masterPassword"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up delay-100">
                <TextInput
                  label={t("masterPassword")}
                  type={isPasswordVisible ? "text" : "password"}
                  labelPlacement="inside"
                  errorMessage={errors.masterPassword?.message}
                  aria-invalid={errors.masterPassword ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  endContent={
                    <Button
                      isIconOnly
                      className="bg-transparent dark:bg-transparent focus:outline-none"
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-primary-400 dark:text-primary-300 pointer-events-none size-6" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-primary-400 dark:text-primary-300 pointer-events-none size-6" />
                      )}
                    </Button>
                  }
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="rememberMe"
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
                    {t("rememberMe")}
                  </span>
                </Checkbox>
              </div>
            )}
          />

          <div className="flex flex-col items-start justify-center my-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-base font-semibold dark:text-secondary animate-slide-in-up delay-600 transition-all duration-50 ease-quick-in-out hover:scale-[1.02] active:scale-[0.98]"
              variant="solid"
              isLoading={isLoginPending}
            >
              {t("submit")}
            </Button>
            <div className="mt-4 text-sm sm:text-[1rem] animate-fade-in text-center dark:text-primary-200">
              {t("registerPrompt")}{" "}
              <Link
                href={"/register"}
                className="text-primary dark:text-primary font-medium"
              >
                {t("registerLink")}
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
