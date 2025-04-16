import { z } from "zod";

export const LoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("validations.invalidEmail")),
    masterPassword: z
      .string()
      .min(8, t("validations.passwordMinLength"))
      .nonempty(t("validations.passwordRequired")),
    rememberMe: z.boolean().default(false),
  });

export type LoginFormData = z.infer<ReturnType<typeof LoginFormSchema>>;
