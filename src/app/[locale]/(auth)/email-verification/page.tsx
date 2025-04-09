"use client";

import { useRouter } from "@/i18n/navigation";
import { serviceFactory } from "@/services/service-factory";
import { Button } from "@heroui/button";
import { addToast, Spinner } from "@heroui/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import EmailVerificationImage from "../../../../../assets/email-verification.svg";

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPageLoading, setPageLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const authService = serviceFactory.getAuthService();

  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  useEffect(() => {
    if (!email || !name) {
      // Handle the case where email or name is not provided
      router.replace("/");
    }

    setPageLoading(false);
  }, []);

  const handleResendVerificationLink = () => {
    startTransition(async () => {
      try {
        const response = await authService.initiateSignup({
          email,
          name,
        });

        addToast({
          variant: "flat",
          color: "secondary",
          title: response?.message,
        });
      } catch (error: any) {
        addToast({
          variant: "flat",
          color: "danger",
          title: "Error",
          description: error?.message ?? "Something went wrong",
        });
      }
    });
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner classNames={{ wrapper: "w-24 h-24" }} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-16 mx-6 py-4 px-1 sm:px-6 lg:px-8">
      <div className="max-w-md md:max-w-2xl w-full">
        <div className="p-8 rounded-lg border border-primary-100">
          <div className="text-center flex flex-col items-center">
            <h2 className="font-josefin text-3xl font-bold text-foreground">
              Verify your email
            </h2>
            <Image
              src={EmailVerificationImage}
              alt="email verification image"
              width={200}
              className="my-4 md:my-8"
            />
            <p className="font-josefin mt-2 text-lg text-default-600">
              Almost there! We’ve sent a verification email to link to your{" "}
              <strong>{email}</strong>. You need to verify your email address to
              log into Secure Vault.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-6">
            <Button
              variant={"flat"}
              color={"primary"}
              className="font-josefin text-sm text-primary"
              onPress={handleResendVerificationLink}
              isLoading={isPending}
            >
              <span className="font-josefin font-medium">Resend Email</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
