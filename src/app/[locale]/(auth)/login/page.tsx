"use client";

import TextInput from "@/components/text-input";
import { Link } from "@/i18n/navigation";
import { Button, Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import UserOnboardImage from "../../../../../assets/user-onboard.svg";
import { LoginFormData, LoginFormSchema } from "../_schemas/login-form.schema";

export default function Login() {
  const t = useTranslations("Login");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // TODO: Implement login logic
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
                  labelPlacement="inside"
                  errorMessage={errors.email?.message}
                  aria-invalid={errors.email ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  {...field}
                  variant="flat"
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
                  type="password"
                  labelPlacement="inside"
                  errorMessage={errors.masterPassword?.message}
                  aria-invalid={errors.masterPassword ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  {...field}
                />
              </div>
            )}
          />

          <Checkbox
            color="primary"
            classNames={{ icon: "dark:text-secondary" }}
          >
            <span className="text-sm sm:text-[1rem]">Keep me logged in</span>
          </Checkbox>

          <div className="flex flex-col items-start justify-center my-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-base font-semibold dark:text-secondary animate-slide-in-up delay-600 transition-all duration-50 ease-quick-in-out hover:scale-[1.02] active:scale-[0.98]"
              variant="solid"
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
