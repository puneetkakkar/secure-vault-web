import { z } from "zod";

export const FinishRegistrationFormSchema = (t: (key: string) => string) =>
  z
    .object({
      masterPassword: z
        .string()
        .min(8, t("validations.masterPasswordMinLength"))
        .max(32, t("validations.masterPasswordMaxLength"))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          t("validations.masterPasswordComplexity")
        )
        .nonempty(t("validations.masterPasswordRequired")),
      confirmMasterPassword: z
        .string()
        .nonempty(t("validations.confirmPasswordRequired")),
      masterPasswordHint: z
        .string()
        .min(5, t("validations.passwordHintMinLength"))
        .nonempty(t("validations.passwordHintRequired")),
    })
    .refine((val) => val.masterPassword === val.confirmMasterPassword, {
      message: t("validations.passwordMismatch"),
      path: ["confirmMasterPassword"],
    });

export type FinishRegistrationFormData = z.infer<
  ReturnType<typeof FinishRegistrationFormSchema>
>;
