"use client";

import UserOnboardImage from "@/../assets/user-onboard.svg";
import TextInput from "@/components/text-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { LoginFormSchema } from "./form-schema";

interface IFormInput {
  email: string;
  masterPassword: string;
}

export default function Login() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col sm:flex-row justify-between gap-4 py-8 md:py-10">
      <div className="flex-1 relative px-14 py-10 mr-24 border rounded-3xl border-primary-100 max-h-96">
        <h2 className="absolute flex -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-background px-4 text-3xl font-semibold uppercase">
            Log In
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
            name="masterPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Master Password"
                type="password"
                labelPlacement="inside"
                errorMessage={errors.masterPassword?.message}
                aria-invalid={errors.masterPassword ? "true" : "false"}
                customStyles={{ base: "mr-4" }}
                {...field}
              />
            )}
          />

          <Checkbox color="primary" className="mt-4">
            Keep me logged in
          </Checkbox>

          <div className="flex flex-col items-start justify-center my-4">
            <Button type="submit" color="primary" className="w-6/12">
              Log in
            </Button>
          </div>

          <div className="mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary font-medium">
              Sign Up
            </a>
          </div>
        </form>
      </div>
      <div className="flex">
        <Image src={UserOnboardImage} alt="user onboarding" priority />
      </div>
    </section>
  );
}
