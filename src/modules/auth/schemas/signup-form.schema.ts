import { z } from "zod";

export const InitialRegistrationFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("validations.invalidEmail")),
    fullName: z
      .string()
      .min(2, t("validations.nameMinLength"))
      .max(50, t("validations.nameMaxLength")),
    isAgreed: z
      .boolean()
      .refine((val) => val, { message: t("validations.termsAgreement") }),
  });

export type InitialRegistrationFormData = z.infer<
  ReturnType<typeof InitialRegistrationFormSchema>
>;
