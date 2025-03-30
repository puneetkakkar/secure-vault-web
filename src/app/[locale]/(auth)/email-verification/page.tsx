"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import Image from "next/image";
import EmailVerificationImage from "../../../../../assets/email-verification.svg";

const EmailVerification = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerificationLink = () => {
    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      alert("Verification email has been resent!");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center py-4 px-1 sm:px-6 lg:px-8">
      <div className="max-w-md lg:max-w-xl w-full">
        <div className="p-8 rounded-lg border border-primary-100">
          <div className="text-center flex flex-col items-center">
            <h2 className="font-josefin text-3xl font-bold text-foreground">
              Verify your email
            </h2>
            <Image
              src={EmailVerificationImage}
              alt="email verification image"
              width={350}
              className="my-4 md:my-8"
            />
            <p className="font-josefin mt-2 text-lg text-default-600">
              Almost there! We’ve sent a verification email to link to your
              p*****1@g***.com. You need to verify your email address to log
              into Secure Vault.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-6">
            <Button
              variant={"flat"}
              color={"primary"}
              className="font-josefin text-sm text-primary"
              onPress={handleResendVerificationLink}
              isLoading={isResending}
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
