"use client";

import UserOnboardImage from "../../../../../assets/user-onboard.svg";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import TextInput from "@/components/text-input";

export default function FinishRegistration() {
  const t = useTranslations("FinishRegistration");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const MasterPasswordSchema = z
    .object({
      masterPassword: z.string().min(12, t("passwordLengthError")),
      confirmPassword: z.string(),
      masterPasswordHint: z.string().optional(),
    })
    .refine((data) => data.masterPassword === data.confirmPassword, {
      message: t("passwordMismatchError"),
      path: ["confirmPassword"],
    });

  type MasterPasswordFormData = z.infer<typeof MasterPasswordSchema>;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MasterPasswordFormData>({
    resolver: zodResolver(MasterPasswordSchema),
    defaultValues: {
      masterPassword: "",
      confirmPassword: "",
      masterPasswordHint: "",
    },
  });

  const masterPassword = watch("masterPassword");

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (masterPassword.length >= 12) strength += 25;
    if (/[A-Z]/.test(masterPassword)) strength += 25;
    if (/[0-9]/.test(masterPassword)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(masterPassword)) strength += 25;

    setPasswordStrength(strength);
  }, [masterPassword]);

  const passwordStrengthColor = useMemo(() => {
    if (passwordStrength < 25) return "danger";
    if (passwordStrength < 50) return "warning";
    if (passwordStrength < 75) return "primary";
    return "success";
  }, [passwordStrength]);

  const onSubmit = async (data: MasterPasswordFormData) => {
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Master password set", data);
      // TODO: Implement actual password submission logic
    } catch (error) {
      console.error("Password submission failed", error);
    }
  };

  return (
    <section className="flex flex-col mt-16 mx-6 lg:flex-row items-center lg:items-start justify-between gap-4 sm:py-8 md:py-10">
      <div className="flex-1 relative px-4 py-4 mb-4 sm:px-14 sm:py-10 lg:mr-24 border rounded-3xl border-primary-100 w-full md:w-8/12 lg:w-6/12 transition-all duration-50 ease-quick-in-out">
        <h2 className="absolute flex -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-background px-4 text-lg sm:text-2xl font-semibold uppercase whitespace-nowrap">
            {t("title")}
          </span>
        </h2>

        <p className="text-center text-default-600 text-sm mb-6 animate-fade-in bg-warning-50 border border-warning-200 rounded-lg p-3 text-warning-700 font-medium">
          {t("description")}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-6 space-y-4 transition-all duration-300"
        >
          <Controller
            name="masterPassword"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up">
                <TextInput
                  label={t("masterPassword")}
                  type={isPasswordVisible ? "text" : "password"}
                  labelPlacement="inside"
                  errorMessage={errors.masterPassword?.message}
                  aria-invalid={errors.masterPassword ? "true" : "false"}
                  customStyles={{ base: "mr-4" }}
                  {...field}
                />
                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength === 100
                        ? "bg-green-500 w-full"
                        : passwordStrength >= 75
                          ? "bg-green-400 w-3/4"
                          : passwordStrength >= 50
                            ? "bg-yellow-500 w-1/2"
                            : passwordStrength >= 25
                              ? "bg-orange-500 w-1/4"
                              : "bg-red-500 w-0"
                    }`}
                  />
                </div>
                <p className="text-xs text-default-500 mt-1">
                  {`Password Strength: ${passwordStrength}%`}
                </p>
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up delay-100">
                <TextInput
                  label={t("confirmPassword")}
                  type={isPasswordVisible ? "text" : "password"}
                  labelPlacement="inside"
                  errorMessage={errors.confirmPassword?.message}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  customStyles={{ base: "mr-4" }}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="masterPasswordHint"
            control={control}
            render={({ field }) => (
              <div className="animate-slide-in-up delay-200">
                <TextInput
                  label={t("masterPasswordHint")}
                  type="text"
                  labelPlacement="inside"
                  customStyles={{ base: "mr-4" }}
                  {...field}
                />
              </div>
            )}
          />

          <Button
            type="submit"
            color="primary"
            className="w-full py-3 text-base font-semibold mt-4 animate-slide-in-up delay-600 transition-all duration-50 ease-quick-in-out hover:scale-[1.02] active:scale-[0.98]"
            variant="solid"
            isLoading={isSubmitting}
          >
            {t("submit")}
          </Button>
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
