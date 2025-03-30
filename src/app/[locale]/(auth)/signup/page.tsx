"use client";

import UserOnboardImage from "../../../../../assets/user-onboard.svg";
import TextInput from "@/components/text-input";
import { addToast, Button, Checkbox } from "@heroui/react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { SignUpFormSchema } from "@/app/[locale]/(auth)/_schemas/signup-form.schema";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

interface IFormInput {
  email: string;
  fullName: string;
  // masterPassword: string;
  // confirmMasterPassword: string;
  // masterPasswordHint: string;
  isAgreed: boolean;
}

export default function Signup() {
  const [isPending, startTransition] = useTransition();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      fullName: "",
      // masterPassword: "",
      // confirmMasterPassword: "",
      // masterPasswordHint: "",
      isAgreed: false,
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const router = useRouter();

  const onSubmit = async ({
    email,
    fullName,
    // masterPassword,
    // masterPasswordHint,
    ...rest
  }: IFormInput) => {
    try {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // const signupService = new SignupService();
        // await signupService.signupUser(
        //   email,
        //   masterPassword,
        //   fullName,
        //   masterPasswordHint,
        // );

        addToast({
          variant: "flat",
          color: "secondary",
          title: "Account created successfully.",
        });

        reset();

        router.push("/email-verification");
      });
    } catch (ex: any) {
      addToast({
        variant: "flat",
        color: "danger",
        title: "Error",
        description: ex?.message ?? "Something went wrong",
      });
      return;
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:py-8 md:py-10">
      <div className="flex-1 relative px-4 py-4 mb-4 sm:px-14 sm:py-10 lg:mr-24 border rounded-3xl border-primary-100 w-full md:w-8/12 lg:w-6/12">
        <h2 className="absolute flex -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-background px-4 text-lg sm:text-3xl font-semibold uppercase">
            Sign Up
          </span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="my-6">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { invalid } }) => (
              <TextInput
                label="Email"
                type="text"
                labelPlacement="inside"
                errorMessage={errors.email?.message}
                aria-invalid={errors.email ? "true" : "false"}
                {...field}
              />
            )}
          />
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Full Name"
                type="text"
                labelPlacement="inside"
                errorMessage={errors.fullName?.message}
                aria-invalid={errors.fullName ? "true" : "false"}
                {...field}
              />
            )}
          />
          {/*<div className="flex flex-row justify-between w-">*/}
          {/*  <Controller*/}
          {/*    name="masterPassword"*/}
          {/*    control={control}*/}
          {/*    render={({ field }) => (*/}
          {/*      <TextInput*/}
          {/*        label="Master Password"*/}
          {/*        type="password"*/}
          {/*        labelPlacement="inside"*/}
          {/*        errorMessage={errors.masterPassword?.message}*/}
          {/*        aria-invalid={errors.masterPassword ? "true" : "false"}*/}
          {/*        customStyles={{ base: "mr-4" }}*/}
          {/*        {...field}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*  <Controller*/}
          {/*    name="confirmMasterPassword"*/}
          {/*    control={control}*/}
          {/*    render={({ field }) => (*/}
          {/*      <TextInput*/}
          {/*        label="Confirm Password"*/}
          {/*        type="password"*/}
          {/*        labelPlacement="inside"*/}
          {/*        errorMessage={errors.confirmMasterPassword?.message}*/}
          {/*        aria-invalid={errors.confirmMasterPassword ? "true" : "false"}*/}
          {/*        customStyles={{ base: "" }}*/}
          {/*        {...field}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<Controller*/}
          {/*  name="masterPasswordHint"*/}
          {/*  control={control}*/}
          {/*  render={({ field }) => (*/}
          {/*    <TextInput*/}
          {/*      label="Master Password Hint"*/}
          {/*      type="text"*/}
          {/*      labelPlacement="inside"*/}
          {/*      errorMessage={errors.masterPasswordHint?.message}*/}
          {/*      aria-invalid={errors.masterPasswordHint ? "true" : "false"}*/}
          {/*      {...field}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}
          <Controller
            name="isAgreed"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox color="primary" onChange={onChange} isSelected={value}>
                <span className="text-sm sm:text-[1rem]">
                  I agree to the terms and conditions.
                </span>
              </Checkbox>
            )}
          />
          {errors.isAgreed?.message && (
            <p className="text-danger text-xs">{errors.isAgreed.message}</p>
          )}
          <div className="flex flex-col items-start justify-center my-4">
            <Button
              isLoading={isPending}
              type="submit"
              color="primary"
              className="w-6/12 h-10 sm:h-11 text-sm sm:text-md"
            >
              {isPending ? "" : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4 text-sm sm:text-[1rem]">
            Already have an account?{" "}
            <Link href={"/login"} className="text-primary font-medium">
              Log In
            </Link>
          </div>
        </form>
      </div>
      <div className="flex md:w-8/12 lg:w-6/12">
        <Image
          src={UserOnboardImage}
          alt="user onboarding"
          height={0}
          width={0}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
