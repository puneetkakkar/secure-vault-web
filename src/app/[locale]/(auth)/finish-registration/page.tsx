"use client";

import { useRouter } from "@/core/i18n";
import {
	FinishRegistrationFormData,
	FinishRegistrationFormSchema,
} from "@/modules/auth/schemas";
import { serviceFactory } from "@/shared/services/service-factory";
import { TextInput } from "@/shared/components";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/shared/components/icons";
import { SessionStorageKey } from "@/shared/enums";
import { useClientServiceFactory } from "@/shared/hooks/use-client-service";
import { addToast, Button, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import { Controller, useForm } from "react-hook-form";
import UserOnboardImage from "../../../../../assets/user-onboard.svg";

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 12) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
  return strength;
};

const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 25) return "danger";
  if (strength < 50) return "warning";
  if (strength < 75) return "primary";
  return "success";
};

export default function FinishRegistration() {
  const t = useTranslations("FinishRegistration");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPageLoading, setPageLoading] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isRegistrationPending, startRegistrationTransition] = useTransition();
  const authService = serviceFactory.getAuthService();
  const clientServiceFactory = useClientServiceFactory();
  const storageService = clientServiceFactory.getSessionStorageService();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FinishRegistrationFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      masterPassword: "",
      confirmMasterPassword: "",
      masterPasswordHint: "",
    },
    resolver: zodResolver(FinishRegistrationFormSchema(t)),
  });

  const verifyEmail = useCallback(async () => {
    try {
      const response = await authService.verifyEmail({
        token: token!,
        email: email!,
      });

      addToast({
        variant: "flat",
        color: "secondary",
        title: response?.message,
      });
      setPageLoading(false);
    } catch (error: any) {
      addToast({
        variant: "flat",
        color: "danger",
        title: error.message,
      });
      setPageLoading(false);
    }
  }, [authService, token, email, setPageLoading]);

  useEffect(() => {
    if (!email || !token) {
      // Handle the case where email or token is not provided
      router.replace("/");
    }

    verifyEmail();
  }, [token, email, router, verifyEmail]);

  const masterPassword = watch("masterPassword");

  const passwordStrengthColor = useMemo(() => {
    const strength = calculatePasswordStrength(masterPassword);
    setPasswordStrength(strength);
    return getPasswordStrengthColor(strength);
  }, [masterPassword]);

  const loginUser = async (data: FinishRegistrationFormData) => {
    try {
      const response = await authService.login({
        email: email!,
        masterPassword: data.masterPassword,
        rememberMe: false,
      });

      const responseData = response.data;

      if (storageService && responseData) {
        storageService.set(SessionStorageKey.ACCESS_TOKEN, responseData.token);
        router.replace("/vault");
      }

      setPageLoading(false);
    } catch (error: any) {
      router.replace("/login");
      addToast({
        variant: "flat",
        color: "danger",
        title: error.message,
      });
      setPageLoading(false);
    }
  };

  const onSubmit = async (data: FinishRegistrationFormData) => {
    if (!email) {
      addToast({
        title: t("emailRequired"),
        variant: "flat",
        color: "danger",
      });
      return;
    }

    startRegistrationTransition(async () => {
      try {
        const response = await authService?.finishRegistration?.({
          email,
          masterPassword: data.masterPassword,
          masterPasswordHint: data.masterPasswordHint,
          hint: data.masterPasswordHint,
        });

        addToast({
          title: response?.message,
          variant: "flat",
          color: "success",
        });

        reset();
        setPageLoading(true);
        await loginUser(data);
      } catch (error: any) {
        addToast({
          title: error.message,
          variant: "flat",
          color: "danger",
        });
      }
    });
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center mt-16 mx-6 py-4 px-1 sm:px-6 lg:px-8 h-[80vh]">
        <Spinner
          classNames={{ wrapper: "w-24 h-24" }}
          variant="dots"
          color="primary"
        />
      </div>
    );
  }

  return (
    <section className="flex flex-col mt-16 mx-6 lg:flex-row items-center lg:items-start justify-between gap-4 sm:py-8 md:py-10">
      <div className="flex-1 relative px-4 py-4 mb-4 sm:px-14 sm:py-10 lg:mr-24 border rounded-3xl border-primary-500/30 dark:border-secondary-500/30 w-full md:w-8/12 lg:w-6/12 transition-all duration-50 ease-quick-in-out">
        <h2 className="absolute flex -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-background px-4 text-lg sm:text-2xl font-semibold uppercase whitespace-nowrap">
            {t("title")}
          </span>
        </h2>

        <p className="text-center text-warning-700 text-sm mb-6 animate-fade-in bg-warning-50 border border-warning-200 rounded-lg p-3 font-medium">
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
                <p className={`text-xs text-${passwordStrengthColor} mt-1`}>
                  {`Password Strength: ${passwordStrength}%`}{" "}
                </p>
              </div>
            )}
          />

          <Controller
            name="confirmMasterPassword"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <div className="animate-slide-in-up delay-100">
                <TextInput
                  label={t("confirmMasterPassword")}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  labelPlacement="inside"
                  errorMessage={errors.confirmMasterPassword?.message}
                  aria-invalid={errors.confirmMasterPassword ? "true" : "false"}
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  endContent={
                    <Button
                      isIconOnly
                      className="bg-transparent dark:bg-transparent focus:outline-none"
                      onPress={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeSlashFilledIcon className="text-primary-400 dark:text-primary-300 pointer-events-none size-6" />
                      ) : (
                        <EyeFilledIcon className="text-primary-400 dark:text-primary-300 pointer-events-none size-6" />
                      )}
                    </Button>
                  }
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
                  customStyles={{
                    base: "mr-4",
                    inputWrapper: "bg-primary-500/20 dark:bg-primary-100/20",
                  }}
                  {...field}
                />
              </div>
            )}
          />

          <div className="flex flex-col items-start justify-center my-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-base font-semibold dark:text-secondary mt-4 animate-slide-in-up delay-600 transition-all duration-50 ease-quick-in-out hover:scale-[1.02] active:scale-[0.98]"
              variant="solid"
              isLoading={isRegistrationPending}
            >
              {t("submit")}
            </Button>
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
